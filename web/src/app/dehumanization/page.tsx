import PageShell from "../components/PageShell";

export default function DehumanizationPage() {
  return (
    <PageShell
      chapter="Chapter 04"
      title="Dehumanization"
      subtitle="How language and imagery reduce people to categories, abstractions or targets instead of individuals."
      pillBg="#ffdd00" pillText="#111"
    >
      <section style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "28px" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "16px" }}>
          Overview
        </p>
        <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          Use this page to document explicit and subtle forms of dehumanization,
          from metaphors and labels to visual tropes. You can contrast examples
          across outlets or platforms and indicate where counter-discourses appear.
        </p>
      </section>
    </PageShell>
  );
}
