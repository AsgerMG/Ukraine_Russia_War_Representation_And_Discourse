import PageShell from "../components/PageShell";

export default function NarrativeFramingPage() {
  return (
    <PageShell
      chapter="Chapter 06"
      title="Narrative framing"
      subtitle="How story structures, protagonists and moral logics shape the meaning of events."
      accentColor="bg-[#ffe680]"
    >
      <section style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "28px" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "16px" }}>
          Overview
        </p>
        <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          Use this page to compare dominant narrative frames across channels —
          liberation vs. invasion, heroes vs. enemies, tragedy vs. triumph.
          Anchor observations with specific textual and visual examples.
        </p>
      </section>
    </PageShell>
  );
}
