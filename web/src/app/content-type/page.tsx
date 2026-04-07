import PageShell from "../components/PageShell";

export default function ContentTypePage() {
  return (
    <PageShell
      chapter="Chapter 01"
      title="Content type"
      subtitle="How different formats, genres and platform-native features shape how the Ukraine war appears in feeds and interfaces."
      accentColor="bg-[#e3f0ff]"
    >
      <section style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "28px" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "16px" }}>
          Overview
        </p>
        <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          Use this page to present your main findings on content types
          (e.g. short-form video, livestreams, memes, infographics, long-form
          explainers). You can structure the analysis as 3–5 short sections,
          each combining a key observation with one or two illustrative
          examples or visuals.
        </p>
      </section>
    </PageShell>
  );
}
