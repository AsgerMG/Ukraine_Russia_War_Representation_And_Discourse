import PageShell from "../components/PageShell";

export default function GamificationPage() {
  return (
    <PageShell
      chapter="Chapter 03"
      title="Gamification"
      subtitle="Where game-like mechanics, aesthetics or metaphors are used to frame the war and its participants."
      pillBg="#0057b7" pillText="#fff"
    >
      <section style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "28px" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "16px" }}>
          Overview
        </p>
        <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          Use this page to analyse scoreboards, challenges, streaks, visual
          overlays and other mechanics that borrow from games. Highlight both
          playful and troubling examples, and discuss implications for how
          audiences relate to the conflict.
        </p>
      </section>
    </PageShell>
  );
}
