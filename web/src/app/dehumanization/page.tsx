import PageShell from "../components/PageShell";

const WipBanner = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "12px 18px" }}>
    <span style={{ fontSize: "1.1rem" }}>🚧</span>
    <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)", letterSpacing: "0.05em" }}>
      Full chapter is still <span style={{ color: "var(--accent)", fontWeight: 500 }}>work in progress</span>
    </p>
  </div>
);

export default function DehumanizationPage() {
  return (
    <PageShell
      chapter="Chapter 04"
      title="🚧 Dehumanization"
      subtitle="How visual representation strips opponents of individuality, turning people into categories, symbols, or targets."
      pillBg="#ffdd00" pillText="#111"
    >
      <WipBanner />
      <section style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "28px" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "16px" }}>
          Current direction
        </p>
        <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          This chapter remains in development. The report already indicates that
          dehumanization is the strongest predictor of implied violence and a
          central node in the wider score network. The final chapter will trace
          how this logic operates through drone imagery, composite memes, and
          enemy-targeting visual conventions across channels.
        </p>
      </section>
    </PageShell>
  );
}
