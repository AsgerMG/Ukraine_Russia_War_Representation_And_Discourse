import PageShell from "../components/PageShell";
import ContentHeatmaps from "./ContentHeatmaps";

export default function ContentTypePage() {
  return (
    <PageShell
      chapter="Chapter 01"
      title="Channel content"
      subtitle="How content categories change across ten Russian and Ukrainian Telegram channels, revealing how political commentary, destruction, propaganda and combat imagery rise or recede over time."
      pillBg="#0057b7"
      pillText="#fff"
    >
      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Structural divergence", "Russian channels increasingly orient toward political commentary, while Ukrainian occupied-territory channels remain anchored in destruction, aftermath and civilian harm."],
          ["Proportional reading", "The sampling design supports comparison of content composition over time, not absolute posting volume or total platform reach."],
          ["Heatmap logic", "The original category and channel heatmap modes are now rendered natively in React, with filters that keep the dense monthly data readable on phones."],
        ].map(([title, text]) => (
          <article className="stat-card" key={title}>
            <h2 className="font-serif text-xl font-bold text-[color:var(--text)]">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-dim)]">{text}</p>
          </article>
        ))}
      </section>

      <ContentHeatmaps />
    </PageShell>
  );
}
