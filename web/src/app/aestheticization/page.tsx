import PageShell from "../components/PageShell";

export default function AestheticizationPage() {
  return (
    <PageShell
      chapter="Chapter 05"
      title="Aestheticization"
      subtitle="How the war is turned into a visual style, mood or brand across feeds and formats."
      accentColor="bg-[#ffefad]"
    >
      <section style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "28px" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "16px" }}>
          Overview
        </p>
        <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          Use this page to examine colour palettes, filters, typography and
          editing conventions that aestheticize conflict. You might map tensions
          between stylistic polish and the gravity of events.
        </p>
      </section>
    </PageShell>
  );
}
