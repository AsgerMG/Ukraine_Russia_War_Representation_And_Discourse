type SectionConfig = {
  href: string;
  title: string;
  bgColor: string;
  iconBgColor: string;
  textColor: string;
  Icon: () => JSX.Element;
};

const BLUE  = "#0057b7";
const BLUE2 = "#004fa8"; // slightly darker for icon bg on blue tiles
const YELL  = "#ffdd00";
const YELL2 = "#f5d000"; // slightly darker for icon bg on yellow tiles

const sections: SectionConfig[] = [
  {
    href: "/content-type",
    title: "Channel Content",
    bgColor: BLUE, iconBgColor: BLUE2, textColor: "#fff",
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl text-lg" style={{ background: BLUE2 }}>🎯</span>
    ),
  },
  {
    href: "/implied-violence",
    title: "Frontline violence",
    bgColor: BLUE, iconBgColor: BLUE2, textColor: "#fff",
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl text-lg" style={{ background: BLUE2 }}>⚠️</span>
    ),
  },
  {
    href: "/gamification",
    title: "Gamification",
    bgColor: BLUE, iconBgColor: BLUE2, textColor: "#fff",
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl text-lg" style={{ background: BLUE2 }}>🎮</span>
    ),
  },
  {
    href: "/dehumanization",
    title: "Dehumanization",
    bgColor: BLUE, iconBgColor: BLUE2, textColor: "#fff",
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl text-lg" style={{ background: BLUE2 }}>🧱</span>
    ),
  },
  {
    href: "/aestheticization",
    title: "Aestheticization",
    bgColor: YELL, iconBgColor: YELL2, textColor: "#111",
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl text-lg" style={{ background: YELL2 }}>✨</span>
    ),
  },
  {
    href: "/narrative-framing",
    title: "Narrative framing",
    bgColor: YELL, iconBgColor: YELL2, textColor: "#111",
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl text-lg" style={{ background: YELL2 }}>📣</span>
    ),
  },
  {
    href: "/technical-framing",
    title: "Technical means",
    bgColor: YELL, iconBgColor: YELL2, textColor: "#111",
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl text-lg" style={{ background: YELL2 }}>🛠️</span>
    ),
  },
  {
    href: "/methodology",
    title: "Methodology",
    bgColor: YELL, iconBgColor: YELL2, textColor: "#111",
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl text-lg" style={{ background: YELL2 }}>📊</span>
    ),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ color: "var(--text)" }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">

        {/* ── hero ── */}
        <header className="flex flex-col gap-4 sm:max-w-3xl">
          <p style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)" }}>
            Research report
          </p>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700, lineHeight: 1.15, color: "var(--accent)" }}>
            Representation and discourse of the Ukraine war
          </h1>
          <p style={{ color: "var(--text-dim)", fontSize: "1.05rem", lineHeight: 1.75 }}>
            A visual and analytical exploration of how the Ukraine war is
            represented across digital platforms, with a focus on channel content,
            violence on the front, gamification, dehumanization, aestheticization and
            narrative framing.
          </p>
        </header>

        {/* ── 2D Visual Map ── */}
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-dim)" }}>
                Corpus explorer
              </p>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", fontWeight: 700, color: "var(--accent)" }}>
                2D visual map
              </h2>
              <p style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>
                CLIP embeddings of the 400-image sample projected into 2D via t-SNE. Drag to pan, scroll to zoom.
              </p>
            </div>
            <a
              href="/visual-map.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", border: "1px solid var(--accent-dim)", padding: "6px 16px", borderRadius: "99px", whiteSpace: "nowrap", transition: "background 0.2s" }}
            >
              Open full map ↗
            </a>
          </div>
          <div className="relative overflow-hidden" style={{ height: "480px", borderRadius: "16px", border: "1px solid var(--border)" }}>
            <iframe
              src="/visual-map.html"
              className="absolute inset-0 h-full w-full"
              title="2D visual embedding map"
              loading="lazy"
            />
          </div>
        </section>

        {/* ── Analytical section tiles ── */}
        <section>
          <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "20px" }}>
            Analytical chapters
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map(({ href, title, Icon, bgColor, textColor }) => (
              <a
                key={href}
                href={href}
                className="group flex flex-col justify-between transition section-tile"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "18px", textDecoration: "none" }}
              >
                <div className="mb-4 inline-flex items-center gap-3 rounded-xl p-2" style={{ background: bgColor }}>
                  <Icon />
                  <div className="inline-flex rounded-full px-3 py-1 text-sm font-semibold italic" style={{ background: bgColor, color: textColor }}>
                    {title}
                  </div>
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--mono)" }}>
                  Open chapter →
                </p>
              </a>
            ))}
          </div>

        </section>

        {/* ── Correlatory effects ── */}
        <section style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>

          {/* connector line + label */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, transparent, var(--accent))" }} />
            <p style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--accent-dim)" }}>
              cross-dimensional
            </p>
            <div style={{ width: "1px", height: "24px", background: "linear-gradient(to bottom, var(--accent), var(--accent))" }} />
          </div>

          {/* tile */}
          <a
            href="/correlatory-effects"
            className="transition section-tile"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", background: "var(--surface)", border: "1px solid var(--accent-dim)", borderRadius: "16px", padding: "24px 40px", textDecoration: "none", minWidth: "280px" }}
          >
            <div className="inline-flex items-center gap-3 rounded-xl p-2" style={{ background: "var(--accent)" }}>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl text-lg" style={{ background: "var(--accent-dim)" }}>📈</span>
              <div className="inline-flex rounded-full px-3 py-1 text-sm font-semibold italic" style={{ background: "var(--accent)", color: "var(--bg)" }}>
                Correlatory effects
              </div>
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--mono)", textAlign: "center", lineHeight: 1.6 }}>
              Gamification × violence · Dehumanization × violence<br />Aestheticization × narrative framing
            </p>
            <p style={{ fontSize: "0.75rem", color: "var(--accent-dim)", fontFamily: "var(--mono)" }}>
              Open chapter →
            </p>
          </a>
        </section>

        {/* ── How to read this ── */}
        <section style={{ maxWidth: "680px", borderTop: "1px solid var(--border)", paddingTop: "32px" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "12px" }}>
            How to read this
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--text-dim)", lineHeight: 1.8 }}>
            Start anywhere: each chapter can be read on its own, but together
            they sketch a broader picture of how the war is framed and made
            visible. For readers interested in the research design, the{" "}
            <a href="/methodology" style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              Methodology
            </a>{" "}
            page details data sources, coding and limitations.
          </p>
        </section>

      </div>
    </div>
  );
}
