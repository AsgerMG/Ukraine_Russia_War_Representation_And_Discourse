import Link from "next/link";

export default function ImpliedViolencePage() {
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
              Frontline violence
            </span>
          </div>
          <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "20px" }} className="space-y-3">
            <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)" }}>
              Chapter 02
            </p>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.2, color: "var(--accent)" }}>
              Frontline violence
            </h1>
            <p style={{ maxWidth: "620px", fontSize: "1rem", lineHeight: 1.75, color: "var(--text-dim)" }}>
              How violence is suggested, obscured or made visible through language,
              imagery and platform constraints across ten Russian-language Telegram
              channels — February 2022 to December 2025.
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
              Overview
            </h2>
          </div>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
            Use this page to unpack how violence appears directly versus being
            hinted at or kept off-screen. You might compare different outlet
            policies, content warnings and visual strategies, supported by
            annotated examples.
          </p>
        </section>

        {/* ── violence analysis embed ── */}
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-3">
              <span style={{ display: "flex", width: "28px", height: "28px", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "#ffdd00", fontSize: "12px", fontWeight: 700, color: "#111" }}>
                2
              </span>
              <div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)" }}>
                  Violence on the front
                </h2>
                <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-muted)" }}>
                  Interactive D3 analysis of violence imagery across the corpus
                </p>
              </div>
            </div>
            <a
              href="/violence.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", border: "1px solid var(--accent-dim)", padding: "6px 16px", borderRadius: "99px", whiteSpace: "nowrap" }}
            >
              Open full view ↗
            </a>
          </div>

          <div className="relative overflow-hidden" style={{ height: "600px", borderRadius: "14px", border: "1px solid var(--border)" }}>
            <iframe
              src="/violence.html"
              className="absolute inset-0 h-full w-full"
              title="Frontline violence — Telegram War Imagery Analysis"
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
