import PageShell from "../components/PageShell";

const WipBanner = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "12px 18px" }}>
    <span style={{ fontSize: "1.1rem" }}>🚧</span>
    <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)", letterSpacing: "0.05em" }}>
      Full chapter is still <span style={{ color: "var(--accent)", fontWeight: 500 }}>work in progress</span>
    </p>
  </div>
);

export default function AestheticizationPage() {
  return (
    <PageShell
      chapter="Chapter 05"
      title="🚧 Aestheticization"
      subtitle="How stylistic polish, symbolic design, and visual mood make war appear persuasive, memorable, or ideologically coherent."
      pillBg="#ffdd00" pillText="#111"
    >
      <WipBanner />
      <section style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "28px" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "16px" }}>
          Current direction
        </p>
        <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          This chapter remains in development. The report already shows that
          aestheticization is tightly linked to narrative framing, especially in
          propaganda memes, composite imagery, and highly produced visual
          material. The final chapter will examine how formal polish and
          ideological messaging work together to shape the meaning of war.
        </p>
      </section>
    </PageShell>
  );
}
