from openai import OpenAI
import base64
import os
import json
from pathlib import Path

# --- CONFIGURATION ---
IMAGE_FOLDER = "/Users/palomalier/Library/CloudStorage/GoogleDrive-palomalier@gmail.com/.shortcut-targets-by-id/1HRuMlxpn_7eCZnFpBO6uQFRqy-BXiHkz/Investigating With AI (Group Project)/Data Collection/Data /Media/All Images"
OUTPUT_FILE = "result_gpt5nano.json"

# Model options (uncomment the one you want):
#MODEL = "gpt-5-nano"
MODEL = "gpt-5.4-nano-2026-03-17"   # newer, better, same price range

# --- FEW-SHOT EXAMPLES (drawn from your existing annotations) ---
FEW_SHOT_EXAMPLES = """
EXAMPLE 1:
Image: A formal portrait of a man in a Russian military uniform with medals, with flames overlaid at the bottom and a prohibition symbol in the corner. Watermark "@_shtirlitz".
Output:
{
  "description": "A formal portrait-style image of a man in a black military uniform with insignia and medals. The uniform displays Russian text reading 'ВООРУЖЕННЫЕ СИЛЫ РОССИИ'. The image has been edited with flames overlaid at the bottom. A watermark '@_shtirlitz' appears on the left. In the upper right corner is a medal design featuring a prohibition symbol over military imagery.",
  "content_type": "propaganda meme",
  "implied_violence": {
    "score": 6,
    "justification": "No explicit violence, but flames and prohibition symbol imply targeting or elimination of the depicted individual. Military symbolism combined with graphic effects communicates a narrative of conflict and marking."
  },
  "gamification": {
    "score": 3,
    "justification": "The prohibition badge resembles a gaming achievement indicator. Flame effects are stylized. But core composition is a formal portrait without FPS elements like crosshairs or HUD overlays."
  },
  "dehumanization": {
    "score": 5,
    "justification": "The subject is identifiable but the graphic treatment (flames, prohibition symbol) reduces him to a symbolic target. The formal military framing emphasizes role over individual humanity."
  },
  "aestheticization": {
    "score": 7,
    "justification": "Professional base photograph with deliberate digital editing: dramatic flame effects, cleanly designed prohibition badge, intentional color choices. High production value for a propaganda composite."
  },
  "narrative_framing": {
    "score": 8,
    "justification": "Triumphalist framing presenting opposition to this Russian military figure as legitimate or celebrated. The elimination symbols suggest desired or achieved defeat. Designed for oppositional propaganda sharing."
  },
  "frame": "professional production"
}

EXAMPLE 2:
Image: Nighttime photograph across water showing a large explosion with orange/red flames rising into a dark sky, reflected in the water.
Output:
{
  "description": "A nighttime photograph taken across a body of water showing a large explosion creating a tall column of reddish-orange flame and smoke rising into a dark sky. The water in the foreground reflects light. Some lights are visible on the water, possibly from boats.",
  "content_type": "explosion",
  "implied_violence": {
    "score": 7,
    "justification": "The image explicitly depicts a large explosion, inherently suggesting destruction and potential harm. The scale and nighttime context imply a significant violent event with likely casualties, though distance creates some detachment."
  },
  "gamification": {
    "score": 2,
    "justification": "Minimal game aesthetics. A civilian photograph from a static position with no HUD elements, crosshairs, or interface overlays. The distant observation of an explosion has a slight spectator-game quality but is clearly documentary."
  },
  "dehumanization": {
    "score": 5,
    "justification": "No human subjects visible. The image reduces a potentially tragic event to a visual spectacle observed from safe distance across water. Dehumanization is structural through absence and distance rather than explicit targeting."
  },
  "aestheticization": {
    "score": 6,
    "justification": "Visually striking composition: orange flames against dark sky with water reflection. Dramatic natural contrast. Appears raw photography without heavy post-processing but the subject's inherent drama creates aesthetic impact."
  },
  "narrative_framing": {
    "score": 5,
    "justification": "Ambiguous, observational framing. Neither glorifying nor explicitly mourning. No text or symbols to contextualize the event. Documentary middle ground between celebration and lamentation."
  },
  "frame": "civilian recording"
}

EXAMPLE 3:
Image: Multi-panel composite showing drone surveillance footage with colored bounding boxes, trajectory lines, telemetry data, and satellite imagery of agricultural terrain.
Output:
{
  "description": "A composite of three panels showing drone surveillance footage and satellite imagery. Top-left panel shows an aerial fisheye view with colored bounding boxes (red, blue, green, orange) and yellow trajectory lines, with text overlay 'ESCADRONE' and telemetry data. Top-right shows nighttime surveillance with tracking boxes. Bottom panel shows 3D satellite terrain with trajectory lines marking the same locations.",
  "content_type": "drone strike",
  "implied_violence": {
    "score": 8,
    "justification": "Multiple tracking boxes, trajectory lines, and telemetry data are characteristic of military targeting systems. Multi-angle documentation (live drone, satellite, night vision) suggests operational military surveillance or post-strike assessment."
  },
  "gamification": {
    "score": 9,
    "justification": "Heavily resembles real-time strategy games: colored targeting boxes create HUD-like interface, fisheye drone view with telemetry mimics military simulation games, 3D terrain view resembles strategy game maps, multi-panel command-and-control layout is highly gamified."
  },
  "dehumanization": {
    "score": 9,
    "justification": "Human subjects completely abstracted into colored geometric boxes and coordinate data. Individuals reduced to trackable objects without any human features visible. Clinical technical framing treats landscape occupants as data points in a targeting system."
  },
  "aestheticization": {
    "score": 6,
    "justification": "Organized multi-panel composition with clean presentation. Colored bounding boxes and trajectory lines create visual clarity. Functional and informational rather than dramatically stylized, though professional layout elevates it above raw footage."
  },
  "narrative_framing": {
    "score": 7,
    "justification": "Presents military targeting capability as technical mastery. Clinical, data-driven framing removes emotional context. Implicitly triumphalist through demonstration of surveillance and strike precision."
  },
  "frame": "drone POV"
}
"""

# --- SYSTEM PROMPT ---
SYSTEM_PROMPT = f"""You are an expert analyst of war imagery from social media, specializing in the visual communication of the conflict in Ukraine. You annotate images according to a structured codebook.

For each image, return a JSON object with EXACTLY these fields:

- "description": detailed factual description of what is visible (2-4 sentences)
- "content_type": one of: "combat footage", "drone strike", "explosion", "destruction", "aftermath", "weapon system", "soldier POV", "propaganda meme", "casualty", "political", "civilian", "other"
- "implied_violence": object with:
    - "score": integer 0-10 (0=no violence implied, 10=extreme violence clearly implied)
    - "justification": 2-3 sentence explanation of score
- "gamification": object with:
    - "score": integer 0-10 (0=no game aesthetics, 10=strongly resembles video game interface)
    - "justification": 2-3 sentence explanation
- "dehumanization": object with:
    - "score": integer 0-10 (0=full human dignity preserved, 10=humans completely reduced to objects/targets)
    - "justification": 2-3 sentence explanation
- "aestheticization": object with:
    - "score": integer 0-10 (0=raw unedited footage, 10=highly stylized/cinematic/edited)
    - "justification": 2-3 sentence explanation
- "narrative_framing": object with:
    - "score": integer 0-10 (0=neutral/documentary, 10=strongly triumphalist or propagandistic)
    - "justification": 2-3 sentence explanation
- "frame": one of: "drone POV", "soldier POV", "civilian recording", "professional production", "screenshot", "composite/meme", "other"

Here are annotated examples to calibrate your scoring:

{FEW_SHOT_EXAMPLES}

Respond ONLY with the JSON object. No preamble, no explanation, no markdown code fences."""

# --- SETUP ---
client = OpenAI()  # picks up OPENAI_API_KEY from environment

def encode_image(image_path):
    ext = Path(image_path).suffix.lower()
    media_types = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".webp": "image/webp"
    }
    media_type = media_types.get(ext, "image/jpeg")
    with open(image_path, "rb") as f:
        image_data = base64.b64encode(f.read()).decode("utf-8")
    return image_data, media_type

def analyze_image(image_path):
    image_data, media_type = encode_image(image_path)
    response = client.chat.completions.create(
        model=MODEL,
        max_completion_tokens=1000,
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:{media_type};base64,{image_data}"
                        }
                    },
                    {
                        "type": "text",
                        "text": "Annotate this image according to the codebook."
                    }
                ]
            }
        ]
    )
    raw_text = response.choices[0].message.content.strip()
    if raw_text.startswith("```"):
        raw_text = raw_text.split("```")[1]
        if raw_text.startswith("json"):
            raw_text = raw_text[4:]
        raw_text = raw_text.strip()
    try:
        return json.loads(raw_text)
    except Exception:
        return {"raw_response": raw_text}

# --- LOAD EXISTING RESULTS (skip already annotated images) ---
if os.path.exists(OUTPUT_FILE):
    with open(OUTPUT_FILE, "r") as f:
        results = json.load(f)
    print(f"Loaded {len(results)} existing results. Will skip already annotated images.\n")
else:
    results = {}

# --- MAIN LOOP ---
supported_formats = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
image_files = [
    f for f in Path(IMAGE_FOLDER).iterdir()
    if f.suffix.lower() in supported_formats
]

to_process = [
    f for f in image_files
    if f.name not in results or "error" in results[f.name] or "raw_response" in results[f.name]
]

print(f"Found {len(image_files)} images. {len(to_process)} to annotate.\n")

image_files = image_files[:5]

for i, image_path in enumerate(to_process, 1):
    print(f"[{i}/{len(to_process)}] {image_path.name}")
    try:
        analysis = analyze_image(str(image_path))
        results[image_path.name] = analysis
        with open(OUTPUT_FILE, "w") as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        content_type = analysis.get("content_type", "?")
        iv_score = analysis.get("implied_violence", {}).get("score", "?")
        print(f"  ✓ {content_type} | violence: {iv_score}\n")
    except Exception as e:
        print(f"  ✗ Error: {e}\n")
        results[image_path.name] = {"error": str(e)}
        with open(OUTPUT_FILE, "w") as f:
            json.dump(results, f, indent=2, ensure_ascii=False)

print(f"Done! Results saved to {OUTPUT_FILE}")

