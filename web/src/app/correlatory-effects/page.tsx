import Link from "next/link";

const dashboards = [
  {
    id: "gamification",
    title: "Gamification × Implied violence",
    subtitle: "Regression dashboard",
    src: "/gamification-violence-dashboard.html",
    badge: 1,
  },
  {
    id: "dehumanization",
    title: "Dehumanization × Implied violence",
    subtitle: "Regression dashboard",
    src: "/dehumanization-violence-dashboard.html",
    badge: 2,
  },
  {
    id: "aestheticization",
    title: "Aestheticization × Narrative framing",
    subtitle: "Regression dashboard",
    src: "/aestheticization-framing-dashboard.html",
    badge: 3,
  },
];

export default function CorrelatoryEffectsPage() {
  return (
    <div className="min-h-screen" style={{ color: "var(--text)" }}>
      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

        {/* ── header ── */}
        <header className="space-y-5">
          <div className="flex items-center gap-3">
            <Link href="/" style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)", textDecoration: "none", letterSpacing: "0.05em" }}>
              ← Overview
            </Link>
            <span style={{ color: "var(--border)" }}>/</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold italic" style={{ background: "#0057b7", color: "#fff" }}>
              Correlatory effects
            </span>
          </div>
          <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "20px" }} className="space-y-3">
            <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)" }}>
              Cross-dimensional analysis
            </p>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.2, color: "var(--accent)" }}>
              Correlatory effects
            </h1>
            <p style={{ maxWidth: "620px", fontSize: "1rem", lineHeight: 1.75, color: "var(--text-dim)" }}>
              How the five continuous annotation dimensions relate to one
              another across the corpus, using bivariate OLS models and
              correlation summaries as an interactive companion to the report.
            </p>
          </div>
        </header>

        {/* ── dashboards ── */}
        {dashboards.map(({ id, title, subtitle, src, badge }) => (
          <section key={id} className="space-y-4">
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-3">
                <span style={{
                  display: "flex", width: "28px", height: "28px",
                  alignItems: "center", justifyContent: "center",
                  borderRadius: "50%",
                  background: badge % 2 !== 0 ? "#0057b7" : "#ffdd00",
                  fontSize: "12px", fontWeight: 700,
                  color: badge % 2 !== 0 ? "#fff" : "#111",
                }}>
                  {badge}
                </span>
                <div>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", fontWeight: 700, color: "var(--accent)" }}>
                    {title}
                  </h2>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-muted)" }}>
                    {subtitle}
                  </p>
                </div>
              </div>
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", border: "1px solid var(--accent-dim)", padding: "6px 16px", borderRadius: "99px", whiteSpace: "nowrap", textDecoration: "none" }}
              >
                Open full view ↗
              </a>
            </div>

            <div className="relative overflow-hidden" style={{ height: "620px", borderRadius: "14px", border: "1px solid var(--border)" }}>
              <iframe
                src={src}
                className="absolute inset-0 h-full w-full"
                title={title}
                loading="lazy"
              />
            </div>
          </section>
        ))}

        <footer style={{ borderTop: "1px solid var(--border)", paddingTop: "24px", fontFamily: "var(--mono)", fontSize: "11px" }}>
          <Link href="/" style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
            ← Back to overview
          </Link>
        </footer>

      </main>
    </div>
  );
}
