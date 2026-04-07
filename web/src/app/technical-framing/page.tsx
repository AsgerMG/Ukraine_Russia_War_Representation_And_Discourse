import Link from "next/link";
import VisualAnalysis from "./VisualAnalysis";

export default function TechnicalFramingPage() {
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
            <span className="rounded-full bg-[#ffe789] px-3 py-1 text-xs font-semibold italic text-zinc-900">
              Technical framing
            </span>
          </div>
          <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "20px" }} className="space-y-3">
            <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)" }}>
              Chapter 07
            </p>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.2, color: "var(--accent)" }}>
              Technical framing
            </h1>
            <p style={{ maxWidth: "620px", fontSize: "1rem", lineHeight: 1.75, color: "var(--text-dim)" }}>
              How image-production modes — drone POV, soldier POV, civilian recording,
              professional production, composite/meme and screenshot — shift across ten
              Russian-language Telegram channels between February 2022 and December 2025.
            </p>
            <div className="flex flex-wrap gap-4" style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-muted)" }}>
              <span>n = 24,559 images</span>
              <span style={{ color: "var(--border)" }}>·</span>
              <span>10 Telegram channels</span>
              <span style={{ color: "var(--border)" }}>·</span>
              <span>Feb 2022 – Dec 2025</span>
            </div>
          </div>
        </header>

        {/* ── stat summary ── */}
        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Drone POV peak", value: "12%", sub: "H1 2024 — up from 3.4% in 2022" },
            { label: "Gamification score", value: "×2.2", sub: "0.84 → 1.83 over the study period" },
            { label: "Drone dehumanisation", value: "5.04", sub: "vs corpus-wide 2.06 in H2 2025" },
          ].map(s => (
            <div key={s.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "20px" }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "6px" }}>
                {s.label}
              </p>
              <p style={{ fontFamily: "var(--serif)", fontSize: "2.4rem", fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>
                {s.value}
              </p>
              <p style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--text-muted)", marginTop: "6px" }}>
                {s.sub}
              </p>
            </div>
          ))}
        </section>

        {/* ── interactive charts ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span style={{ display: "flex", width: "28px", height: "28px", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "var(--accent)", fontSize: "12px", fontWeight: 700, color: "var(--bg)" }}>
              1
            </span>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)" }}>
              Frame type analysis
            </h2>
          </div>
          <VisualAnalysis />
        </section>

        {/* ── interpretation ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span style={{ display: "flex", width: "28px", height: "28px", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "var(--red)", fontSize: "12px", fontWeight: 700, color: "#fff" }}>
              2
            </span>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)" }}>
              Interpretation
            </h2>
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "28px" }} className="space-y-4">
            <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
              The data reveal a structural shift in how the war is technically
              framed over time. The early dominance of civilian recording — raw,
              ground-level, often chaotic footage — gives way to a more
              mediated set of production modes. Drone POV tripled across the
              corpus and became the defining visual register for a subset of
              militarily-oriented channels, while screenshot and professional
              production grew in the commentary-aggregator channels.
            </p>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
              This divergence is not merely aesthetic. The annotation scores
              show that drone footage consistently scores higher on gamification
              and dehumanisation than any other frame type. By H2 2025, drone
              POV images score 6.04 on gamification (out of 7) compared to a
              corpus-wide average of ~1.7 — suggesting that the drone aesthetic
              imports the visual grammar of first-person games into the
              representation of lethal force.
            </p>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
              The plateau of scores in 2025 may reflect content normalisation:
              audiences — and producers — become accustomed to the register,
              reducing its marked quality, even as its prevalence remains high.
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
