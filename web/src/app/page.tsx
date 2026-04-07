type SectionConfig = {
  href: string;
  title: string;
  bg: string;
  Icon: () => JSX.Element;
};

const sections: SectionConfig[] = [
  {
    href: "/content-type",
    title: "Content type",
    bg: "bg-[#e3f0ff]", // light Ukrainian blue
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c5e0ff] text-lg">
        🎯
      </span>
    ),
  },
  {
    href: "/implied-violence",
    title: "Implied violence",
    bg: "bg-[#c5e0ff]", // medium Ukrainian blue
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a7d0ff] text-lg">
        ⚠️
      </span>
    ),
  },
  {
    href: "/gamification",
    title: "Gamification",
    bg: "bg-[#a7d0ff]", // stronger Ukrainian blue
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#89c0ff] text-lg">
        🎮
      </span>
    ),
  },
  {
    href: "/dehumanization",
    title: "Dehumanization",
    bg: "bg-[#89c0ff]", // deepest Ukrainian blue in row
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#72b3ff] text-lg">
        🧱
      </span>
    ),
  },
  {
    href: "/aestheticization",
    title: "Aestheticization",
    bg: "bg-[#fff7d1]", // light Ukrainian yellow
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffefad] text-lg">
        ✨
      </span>
    ),
  },
  {
    href: "/narrative-framing",
    title: "Narrative framing",
    bg: "bg-[#ffefad]", // medium Ukrainian yellow
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffe789] text-lg">
        📣
      </span>
    ),
  },
  {
    href: "/technical-framing",
    title: "Technical framing",
    bg: "bg-[#ffe789]", // stronger Ukrainian yellow
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffdf65] text-lg">
        🛠️
      </span>
    ),
  },
  {
    href: "/methodology",
    title: "Methodology",
    bg: "bg-[#ffdf65]", // deepest Ukrainian yellow in row
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7d34f] text-lg">
        📊
      </span>
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
            represented across digital platforms, with a focus on content type,
            violence, gamification, dehumanization, aestheticization and
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
            {sections.map(({ href, title, Icon, bg }) => (
              <a
                key={href}
                href={href}
                className="group flex flex-col justify-between transition section-tile"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "18px", textDecoration: "none" }}
              >
                <div className={`mb-4 inline-flex items-center gap-3 rounded-xl p-2 ${bg}`}>
                  <Icon />
                  <div className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold italic text-zinc-900 ${bg}`}>
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
