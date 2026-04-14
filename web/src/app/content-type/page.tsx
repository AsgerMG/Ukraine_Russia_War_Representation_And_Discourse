import Link from "next/link";

export default function ContentTypePage() {
  return (
    <div className="min-h-screen" style={{ color: "var(--text)" }}>
      <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

        {/* ── page header ── */}
        <header className="space-y-5">
          <div className="flex items-center gap-3">
            <Link href="/" style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)", textDecoration: "none", letterSpacing: "0.05em" }}>
              ← Overview
            </Link>
            <span style={{ color: "var(--border)" }}>/</span>
            <span className="rounded-full px-3 py-1 text-xs font-semibold italic" style={{ background: "#0057b7", color: "#fff" }}>
              Channel Content
            </span>
          </div>
          <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "20px" }} className="space-y-3">
            <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)" }}>
              Chapter 01
            </p>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.2, color: "var(--accent)" }}>
              Channel Content
            </h1>
            <p style={{ maxWidth: "620px", fontSize: "1rem", lineHeight: 1.75, color: "var(--text-dim)" }}>
              How the distribution of content categories changes across ten Russian and Ukrainian Telegram channels, revealing how political commentary, destruction, propaganda, and combat imagery rise or recede over time.
            </p>
          </div>
        </header>

        {/* ── overview ── */}
        <section style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "28px" }}>
          <div className="flex items-center gap-3" style={{ marginBottom: "16px" }}>
            <span style={{ display: "flex", width: "28px", height: "28px", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "#0057b7", fontSize: "12px", fontWeight: 700, color: "#fff" }}>
              1
            </span>
            <h2 style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-dim)" }}>
              Report finding
            </h2>
          </div>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
            The channel content analysis shows a structural divergence between
            Russian and Ukrainian channels. Russian channels increasingly orient
            towards political commentary, with wargonzo the clearest example of
            sustained ideological concentration, while Ukrainian channels rooted
            in occupied territories remain dominated by destruction, aftermath,
            and civilian harm. Read proportionally rather than in absolute
            volume, the heatmaps below show how each channel's editorial profile
            shifts over time.
          </p>
        </section>

        {/* ── heatmaps embed ── */}
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-3">
              <span style={{ display: "flex", width: "28px", height: "28px", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "#ffdd00", fontSize: "12px", fontWeight: 700, color: "#111" }}>
                2
              </span>
              <div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)" }}>
                  Channel Content heatmaps
                </h2>
                <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-muted)" }}>
                  Interactive companion to the report's channel content analysis
                </p>
              </div>
            </div>
            <a
              href="/content-analysis-heatmaps.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", border: "1px solid var(--accent-dim)", padding: "6px 16px", borderRadius: "99px", whiteSpace: "nowrap", textDecoration: "none" }}
            >
              Open full view ↗
            </a>
          </div>

          <div className="relative overflow-hidden" style={{ height: "640px", borderRadius: "14px", border: "1px solid var(--border)" }}>
            <iframe
              src="/content-analysis-heatmaps.html"
              className="absolute inset-0 h-full w-full"
              title="Channel Content heatmaps"
              loading="lazy"
            />
          </div>
        </section>

        <footer style={{ borderTop: "1px solid var(--border)", paddingTop: "24px", fontFamily: "var(--mono)", fontSize: "11px" }}>
          <Link href="/" style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
            ← Back to overview
          </Link>
        </footer>

      </main>
    </div>
  );
}
