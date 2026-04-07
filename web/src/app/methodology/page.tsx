import Link from "next/link";
import DataCollectionAccordion from "./DataCollectionAccordion";

export default function MethodologyPage() {
  return (
    <div className="min-h-screen" style={{ color: "var(--text)" }}>
      <main className="mx-auto flex max-w-4xl flex-col gap-12 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

        <header className="space-y-5">
          <div className="flex items-center gap-3">
            <Link href="/" style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)", textDecoration: "none", letterSpacing: "0.05em" }}>
              ← Overview
            </Link>
            <span style={{ color: "var(--border)" }}>/</span>
            <span className="rounded-full bg-[#e3f0ff] px-3 py-1 text-xs font-semibold italic text-zinc-900">
              Methodology
            </span>
          </div>
          <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "20px" }} className="space-y-3">
            <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)" }}>
              Methods
            </p>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.2, color: "var(--accent)" }}>
              Methodology
            </h1>
            <p style={{ maxWidth: "620px", fontSize: "1rem", lineHeight: 1.75, color: "var(--text-dim)" }}>
              A transparent account of the corpus, coding scheme, analytical choices and limitations behind this report.
            </p>
          </div>
        </header>

        {/* ── Data collection ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span style={{ display: "flex", width: "28px", height: "28px", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "var(--accent)", fontSize: "12px", fontWeight: 700, color: "var(--bg)" }}>
              1
            </span>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)" }}>
              Data collection
            </h2>
          </div>
          <DataCollectionAccordion />
        </section>

        {/* ── Analytical framework ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span style={{ display: "flex", width: "28px", height: "28px", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "var(--red)", fontSize: "12px", fontWeight: 700, color: "#fff" }}>
              2
            </span>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)" }}>
              Analytical framework
            </h2>
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "28px" }} className="space-y-3">
            <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
              Here you can outline your discourse or media analysis framework,
              the categories used (content type, implied violence, gamification,
              dehumanization, aestheticization, narrative framing, technical
              framing) and how they were operationalised.
            </p>
          </div>
        </section>

        {/* ── Procedures, reliability and limitations ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span style={{ display: "flex", width: "28px", height: "28px", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "var(--blue)", fontSize: "12px", fontWeight: 700, color: "#fff" }}>
              3
            </span>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)" }}>
              Procedures, reliability and limitations
            </h2>
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "28px" }} className="space-y-3">
            <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
              Use this part for coder training, intercoder reliability (if
              applicable), tools and software, and a short reflection on ethical
              considerations and constraints.
            </p>
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
