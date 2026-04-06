

# ============================================================
# 2D IMAGE EMBEDDING MAP — Google Colab + Google Drive
# No CSV required — works from images alone
# ============================================================
# SETUP: Run in Google Colab. Put your images in a Google Drive
# folder and set IMAGES_DIR below.
# ============================================================

# ── 0. Install dependencies ──────────────────────────────────
import subprocess, sys
subprocess.run([sys.executable, "-m", "pip", "install", "-q",
                "sentence-transformers", "Pillow", "scikit-learn", "numpy"], check=True)

# ── 1. Mount Google Drive ────────────────────────────────────
from google.colab import drive
drive.mount('/content/drive')

# ============================================================
# CONFIGURATION — only these two lines need editing
# ============================================================
IMAGES_DIR  = "/content/drive/MyDrive/400 samples"
OUTPUT_HTML = "/content/drive/MyDrive/Investigating With AI (Group Project)/Data Collection/Data /Media/400 SAMPLES.html"
CACHE_PATH  = "/content/drive/MyDrive/features_cache.pkl"
# ============================================================

import os, math, pickle, base64, json, warnings
from io import BytesIO
from pathlib import Path

import numpy as np
from PIL import Image
from sklearn.manifold import TSNE
from sentence_transformers import SentenceTransformer

warnings.filterwarnings("ignore")

# ── 2. Discover images ───────────────────────────────────────
VALID_EXT = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".gif"}

image_paths = [
    p for p in sorted(Path(IMAGES_DIR).iterdir())
    if p.suffix.lower() in VALID_EXT
]
print(f"Found {len(image_paths)} images in '{IMAGES_DIR}'")
if not image_paths:
    raise FileNotFoundError(f"No images found in {IMAGES_DIR} — check the path and folder name.")

# ── 3. Extract CLIP visual features ──────────────────────────
ids = [p.stem for p in image_paths]

if os.path.exists(CACHE_PATH):
    print("Loading cached features …")
    with open(CACHE_PATH, "rb") as f:
        cache = pickle.load(f)
    # Only use cached entries whose files still exist
    cached_ids = cache["ids"]
    cached_feats = cache["features"]
    id_to_feat = {i: cached_feats[k] for k, i in enumerate(cached_ids)}
    missing = [p for p in image_paths if p.stem not in id_to_feat]
    if missing:
        print(f"  {len(missing)} new images not in cache — encoding them …")
        model = SentenceTransformer("clip-ViT-B-32")
        new_imgs = [Image.open(p).convert("RGB") for p in missing]
        new_feats = model.encode(new_imgs, batch_size=32, show_progress_bar=True, convert_to_numpy=True)
        for p, feat in zip(missing, new_feats):
            id_to_feat[p.stem] = feat
        # Update cache
        all_ids = list(id_to_feat.keys())
        all_feats = np.stack([id_to_feat[i] for i in all_ids])
        with open(CACHE_PATH, "wb") as f:
            pickle.dump({"features": all_feats, "ids": all_ids}, f)
    image_paths = [p for p in image_paths if p.stem in id_to_feat]
    ids = [p.stem for p in image_paths]
    features = np.stack([id_to_feat[i] for i in ids])
    print(f"  Using {len(features)} feature vectors")
else:
    print("Encoding images with CLIP (this may take a few minutes) …")
    model = SentenceTransformer("clip-ViT-B-32")
    valid_paths, valid_ids = [], []
    imgs = []
    for p in image_paths:
        try:
            img = Image.open(p).convert("RGB")
            imgs.append(img)
            valid_paths.append(p)
            valid_ids.append(p.stem)
        except Exception as e:
            print(f"  ⚠  Could not open {p.name}: {e}")

    features = model.encode(imgs, batch_size=32, show_progress_bar=True, convert_to_numpy=True)
    norms = np.linalg.norm(features, axis=1, keepdims=True)
    features = features / np.where(norms == 0, 1, norms)

    with open(CACHE_PATH, "wb") as f:
        pickle.dump({"features": features, "ids": valid_ids}, f)
    print(f"  Cached {len(features)} vectors to {CACHE_PATH}")
    image_paths, ids = valid_paths, valid_ids

N = len(image_paths)
print(f"Total items for map: {N}")

# ── 4. t-SNE → 2D ────────────────────────────────────────────
perplexity = min(30, max(5, N // 4))
print(f"Running t-SNE (perplexity={perplexity}) …")
tsne = TSNE(n_components=2, metric="cosine", perplexity=perplexity,
            random_state=42, init="random", n_iter=1000)
coords_2d = tsne.fit_transform(features)

mn, mx = coords_2d.min(axis=0), coords_2d.max(axis=0)
coords_norm = (coords_2d - mn) / (mx - mn + 1e-9)

# ── 5. Grid snapping ─────────────────────────────────────────
S = math.ceil(math.sqrt(N) * 1.3)
grid = {}

def spiral(cx, cy):
    yield (cx, cy)
    for radius in range(1, S * 2):
        for dr in range(-radius, radius + 1):
            for dc in [-radius, radius]:
                yield (cx + dr, cy + dc)
        for dc in range(-radius + 1, radius):
            for dr in [-radius, radius]:
                yield (cx + dr, cy + dc)

grid_cols = np.zeros(N, dtype=int)
grid_rows = np.zeros(N, dtype=int)
centre = np.array([0.5, 0.5])
order = np.argsort(np.linalg.norm(coords_norm - centre, axis=1))

for i in order:
    cx = int(round(coords_norm[i, 0] * (S - 1)))
    cy = int(round(coords_norm[i, 1] * (S - 1)))
    cx = max(0, min(S - 1, cx))
    cy = max(0, min(S - 1, cy))
    for r, c in spiral(cy, cx):
        if 0 <= r < S and 0 <= c < S and (r, c) not in grid:
            grid[(r, c)] = i
            grid_rows[i] = r
            grid_cols[i] = c
            break

print(f"Grid: {S}×{S}")

# ── 6. Encode thumbnails ──────────────────────────────────────
THUMB_W, THUMB_H     = 60, 90
PREVIEW_W, PREVIEW_H = 180, 270

def img_to_b64(path, w, h):
    try:
        img = Image.open(path).convert("RGB")
        img.thumbnail((w, h), Image.LANCZOS)
        buf = BytesIO()
        img.save(buf, format="JPEG", quality=75)
        return base64.b64encode(buf.getvalue()).decode()
    except Exception:
        return ""

print("Encoding thumbnails …")
thumbs   = [img_to_b64(p, THUMB_W, THUMB_H)     for p in image_paths]
previews = [img_to_b64(p, PREVIEW_W, PREVIEW_H) for p in image_paths]

# ── 7. Build item data for JS ─────────────────────────────────
items = []
for i, (img_id, path) in enumerate(zip(ids, image_paths)):
    items.append({
        "id":      img_id,
        "label":   path.name,          # full filename as label
        "col":     int(grid_cols[i]),
        "row":     int(grid_rows[i]),
        "thumb":   thumbs[i],
        "preview": previews[i],
    })

items_json = json.dumps(items)
S_val = S
CELL  = 72

# ── 8. Generate HTML ──────────────────────────────────────────
html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Visual Map — 200 Samples</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Space+Grotesk:wght@300;500;700&display=swap');

  :root {{
    --bg:      #0a0a0f;
    --surface: #13131a;
    --border:  #2a2a3a;
    --accent:  #7b6cff;
    --accent2: #ff6c9d;
    --text:    #e8e6f0;
    --muted:   #6b6880;
    --cell:    {CELL}px;
  }}
  *, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{
    background: var(--bg); color: var(--text);
    font-family: 'Space Grotesk', sans-serif;
    overflow: hidden; height: 100vh; width: 100vw;
  }}

  #header {{
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    height: 52px;
    background: rgba(10,10,15,0.85); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 16px; padding: 0 20px;
  }}
  #title {{
    font-family: 'IBM Plex Mono', monospace; font-size: 13px; font-weight: 500;
    color: var(--accent); letter-spacing: 0.08em; white-space: nowrap;
  }}
  #count {{ font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--muted); }}

  #search-wrap {{ margin-left: auto; position: relative; width: 260px; }}
  #search {{
    width: 100%; background: var(--surface);
    border: 1px solid var(--border); border-radius: 6px;
    color: var(--text); font-family: 'Space Grotesk', sans-serif;
    font-size: 13px; padding: 6px 12px; outline: none; transition: border-color .2s;
  }}
  #search:focus {{ border-color: var(--accent); }}
  #suggestions {{
    position: absolute; top: calc(100% + 4px); left: 0; right: 0;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 6px; max-height: 220px; overflow-y: auto;
    z-index: 200; display: none;
  }}
  .sug-item {{ padding: 8px 12px; font-size: 13px; cursor: pointer; transition: background .15s; }}
  .sug-item:hover {{ background: var(--border); }}

  #stage {{
    position: fixed; top: 52px; left: 0; right: 0; bottom: 0;
    overflow: hidden; cursor: grab;
  }}
  #stage.panning {{ cursor: grabbing; }}
  #world {{ position: absolute; transform-origin: 0 0; will-change: transform; }}

  .tile {{
    position: absolute; width: var(--cell); height: var(--cell);
    display: flex; align-items: center; justify-content: center; cursor: pointer;
  }}
  .tile img {{
    max-width: calc(var(--cell) - 6px); max-height: calc(var(--cell) - 6px);
    border-radius: 3px; border: 1px solid transparent;
    transition: border-color .15s, transform .15s, box-shadow .15s; display: block;
  }}
  .tile:hover img {{
    border-color: var(--accent); transform: scale(1.12);
    box-shadow: 0 0 16px rgba(123,108,255,0.45); z-index: 10;
  }}
  .tile.highlighted img {{
    border-color: var(--accent2) !important;
    box-shadow: 0 0 20px rgba(255,108,157,0.6) !important;
  }}

  #tooltip {{
    position: fixed; z-index: 300; background: var(--surface);
    border: 1px solid var(--border); border-radius: 10px;
    padding: 12px 14px; pointer-events: none; display: none;
    max-width: 220px; box-shadow: 0 8px 32px rgba(0,0,0,0.6);
  }}
  #tooltip img {{ width: 100%; border-radius: 6px; display: block; margin-bottom: 8px; }}
  #tooltip .filename {{
    font-family: 'IBM Plex Mono', monospace; font-size: 11px;
    color: var(--muted); word-break: break-all; line-height: 1.5;
  }}

  #hint {{
    position: fixed; bottom: 18px; left: 50%; transform: translateX(-50%);
    font-family: 'IBM Plex Mono', monospace; font-size: 11px;
    color: var(--muted); pointer-events: none; opacity: 1; transition: opacity 1s;
  }}
  #hint.hidden {{ opacity: 0; }}
</style>
</head>
<body>

<div id="header">
  <span id="title">VISUAL MAP</span>
  <span id="count"></span>
  <div id="search-wrap">
    <input id="search" type="text" placeholder="Search filename …" autocomplete="off">
    <div id="suggestions"></div>
  </div>
</div>

<div id="stage"><div id="world"></div></div>
<div id="tooltip"></div>
<div id="hint">scroll to zoom · drag to pan · hover for details</div>

<script>
const ITEMS = {items_json};
const S = {S_val};
const CELL = {CELL};

const world = document.getElementById('world');
world.style.width  = (S * CELL) + 'px';
world.style.height = (S * CELL) + 'px';

const tileMap = {{}};

ITEMS.forEach(item => {{
  const tile = document.createElement('div');
  tile.className = 'tile';
  tile.style.left = (item.col * CELL) + 'px';
  tile.style.top  = (item.row * CELL) + 'px';
  tile.dataset.id = item.id;

  if (item.thumb) {{
    const img = document.createElement('img');
    img.src = 'data:image/jpeg;base64,' + item.thumb;
    img.alt = item.label;
    tile.appendChild(img);
  }} else {{
    tile.style.background = '#1a1a2e';
    tile.style.borderRadius = '3px';
    tile.style.fontSize = '9px';
    tile.style.color = '#6b6880';
    tile.style.padding = '4px';
    tile.style.textAlign = 'center';
    tile.textContent = item.label.substring(0, 12);
  }}

  tile.addEventListener('mouseenter', e => showTooltip(item, e));
  tile.addEventListener('mouseleave', () => {{ document.getElementById('tooltip').style.display = 'none'; }});
  world.appendChild(tile);
  tileMap[item.id] = tile;
}});

document.getElementById('count').textContent = ITEMS.length + ' images';

// ── Pan & Zoom ───────────────────────────────────────────────
const stage = document.getElementById('stage');
let tx = 40, ty = 60, scale = 1;

function clamp(x, y) {{
  const sw = stage.clientWidth, sh = stage.clientHeight;
  const ww = S * CELL * scale, wh = S * CELL * scale;
  return [
    Math.max(Math.min(40, sw - ww - 40), Math.min(40, x)),
    Math.max(Math.min(60, sh - wh - 40), Math.min(60, y))
  ];
}}

function applyTransform() {{
  world.style.transform = `translate(${{tx}}px,${{ty}}px) scale(${{scale}})`;
}}

window.addEventListener('load', () => {{
  const sw = stage.clientWidth, sh = stage.clientHeight;
  scale = Math.min(1, (sw - 80) / (S * CELL), (sh - 80) / (S * CELL));
  tx = (sw - S * CELL * scale) / 2;
  ty = (sh - S * CELL * scale) / 2;
  applyTransform();
}});

stage.addEventListener('wheel', e => {{
  e.preventDefault();
  const rect = stage.getBoundingClientRect();
  const mx = e.clientX - rect.left, my = e.clientY - rect.top;
  const delta = e.deltaY < 0 ? 1.1 : 0.9;
  const ns = Math.max(0.1, Math.min(8, scale * delta));
  tx = mx - (mx - tx) * (ns / scale);
  ty = my - (my - ty) * (ns / scale);
  scale = ns;
  [tx, ty] = clamp(tx, ty);
  applyTransform();
}}, {{ passive: false }});

let dragging = false, lx = 0, ly = 0;
stage.addEventListener('mousedown', e => {{
  if (e.target.closest('.tile')) return;
  dragging = true; lx = e.clientX; ly = e.clientY;
  stage.classList.add('panning');
}});
window.addEventListener('mousemove', e => {{
  if (!dragging) return;
  tx += e.clientX - lx; ty += e.clientY - ly;
  lx = e.clientX; ly = e.clientY;
  [tx, ty] = clamp(tx, ty);
  applyTransform();
}});
window.addEventListener('mouseup', () => {{ dragging = false; stage.classList.remove('panning'); }});

// ── Tooltip ──────────────────────────────────────────────────
const tooltip = document.getElementById('tooltip');

function showTooltip(item, e) {{
  let html = '';
  if (item.preview) html += `<img src="data:image/jpeg;base64,${{item.preview}}" alt="">`;
  html += `<div class="filename">${{item.label}}</div>`;
  tooltip.innerHTML = html;
  tooltip.style.display = 'block';
  moveTooltip(e.clientX, e.clientY);
}}

document.addEventListener('mousemove', e => {{
  if (tooltip.style.display === 'block') moveTooltip(e.clientX, e.clientY);
}});

function moveTooltip(x, y) {{
  const tw = 234, th = 300;
  let left = x + 16, top = y + 16;
  if (left + tw > window.innerWidth)  left = x - tw - 8;
  if (top  + th > window.innerHeight) top  = y - th - 8;
  tooltip.style.left = left + 'px';
  tooltip.style.top  = top  + 'px';
}}

// ── Search ───────────────────────────────────────────────────
const searchEl = document.getElementById('search');
const sugEl    = document.getElementById('suggestions');

searchEl.addEventListener('input', () => {{
  const q = searchEl.value.trim().toLowerCase();
  if (!q) {{ sugEl.style.display = 'none'; return; }}
  const matches = ITEMS.filter(it => it.label.toLowerCase().includes(q)).slice(0, 12);
  if (!matches.length) {{ sugEl.style.display = 'none'; return; }}
  sugEl.innerHTML = matches.map(it =>
    `<div class="sug-item" data-id="${{it.id}}">${{it.label}}</div>`
  ).join('');
  sugEl.style.display = 'block';
}});

sugEl.addEventListener('click', e => {{
  const el = e.target.closest('.sug-item');
  if (!el) return;
  flyTo(el.dataset.id);
  sugEl.style.display = 'none';
  searchEl.value = '';
}});

document.addEventListener('click', e => {{
  if (!e.target.closest('#search-wrap')) sugEl.style.display = 'none';
}});

function flyTo(id) {{
  const item = ITEMS.find(it => it.id === id);
  if (!item) return;
  document.querySelectorAll('.tile.highlighted').forEach(t => t.classList.remove('highlighted'));
  const tile = tileMap[id];
  if (tile) tile.classList.add('highlighted');
  const sw = stage.clientWidth, sh = stage.clientHeight;
  tx = sw / 2 - (item.col * CELL + CELL / 2) * scale;
  ty = sh / 2 - (item.row * CELL + CELL / 2) * scale;
  [tx, ty] = clamp(tx, ty);
  world.style.transition = 'transform .5s cubic-bezier(.4,0,.2,1)';
  applyTransform();
  setTimeout(() => {{ world.style.transition = ''; }}, 520);
}}

setTimeout(() => document.getElementById('hint').classList.add('hidden'), 5000);
</script>
</body>
</html>"""

with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
    f.write(html)

print(f"\n✅ Done! Map saved to: {OUTPUT_HTML}")
print(f"   Download it from Drive and open in any browser.")
