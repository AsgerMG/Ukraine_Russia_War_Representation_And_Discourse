import PageShell from "../components/PageShell";

const WipBanner = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "12px 18px" }}>
    <span style={{ fontSize: "1.1rem" }}>🚧</span>
    <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)", letterSpacing: "0.05em" }}>
      Full chapter is still <span style={{ color: "var(--accent)", fontWeight: 500 }}>work in progress</span>
    </p>
  </div>
);

export default function NarrativeFramingPage() {
  return (
    <PageShell
      chapter="Chapter 06"
      title="🚧 Narrative framing"
      subtitle="How visual material organises events into moral narratives of victory, sacrifice, defence, and enemy construction."
      pillBg="#ffdd00" pillText="#111"
    >
      <WipBanner />
      <section style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "28px" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "16px" }}>
          Current direction
        </p>
        <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          This chapter remains in development. The report already suggests that
          narrative framing clusters strongly with aestheticization and
          dehumanization, particularly in meme-based and highly produced content.
          The final chapter will analyse how victory, martyrdom, defence, and
          enemy construction are visualised across the corpus.
        </p>
      </section>
    </PageShell>
  );
}
