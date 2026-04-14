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
            <span className="rounded-full px-3 py-1 text-xs font-semibold italic" style={{ background: "#0057b7", color: "#fff" }}>
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
              The study&apos;s analytical architecture rests on a single shared foundation: a corpus of approximately 24.000+ annotated media items scored across seven dimensions. From this corpus, five complementary lenses are applied, each designed to address a distinct research sub-question.
            </p>
          </div>
        </header>

        {/* ── Data collection ── */}
        <section className="space-y-4">
          <DataCollectionAccordion />
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
