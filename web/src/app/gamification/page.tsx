import PageShell from "../components/PageShell";

const WipBanner = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "12px 18px" }}>
    <span style={{ fontSize: "1.1rem" }}>🚧</span>
    <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)", letterSpacing: "0.05em" }}>
      Full chapter is still <span style={{ color: "var(--accent)", fontWeight: 500 }}>work in progress</span>
    </p>
  </div>
);

export default function GamificationPage() {
  return (
    <PageShell
      chapter="Chapter 03"
      title="🚧 Gamification"
      subtitle="How game-like visual logic enters the representation of war, especially through drone imagery, targeting interfaces, and score-like framings."
      pillBg="#0057b7" pillText="#fff"
    >
      <WipBanner />
      <section style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "28px" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "16px" }}>
          Current direction
        </p>
        <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          This chapter remains in development. The report already shows that
          gamification rises most sharply in drone footage, where HUD overlays,
          targeting reticles, and operator perspectives import the visual grammar
          of first-person games into representations of lethal force. The final
          chapter will extend that finding into a fuller typology of channels,
          frames, and visual conventions.
        </p>
      </section>
    </PageShell>
  );
}
