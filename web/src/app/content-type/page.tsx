import PageShell from "../components/PageShell";
import ContentHeatmaps from "./ContentHeatmaps";

export default function ContentTypePage() {
  return (
    <PageShell
      kicker="Chapter One"
      title="What the channels chose to show"
      standfirst="The mix of imagery shifts steadily across ten Russian and Ukrainian Telegram channels, and the direction of that drift says as much as any single picture."
      meta={["24,000+ sampled images", "10 channels", "Feb 2022 to Feb 2026"]}
    >
      <div className="prose dropcap">
        <p>
          Russian channels lean further into political commentary as the war
          goes on. Ukrainian channels rooted in occupied territory stay fixed on
          what is in front of them: ruined buildings, the aftermath of strikes,
          and the people caught underneath. The two feeds use a similar visual
          vocabulary, but they point it at different things.
        </p>
        <p>
          The sampling is deliberately proportional. Up to fifty posts per
          channel per month makes it possible to compare the composition of a
          feed over time, though not its absolute reach or posting volume. Read
          the heatmaps below for proportion and trend, not for headcount.
        </p>
      </div>

      <ContentHeatmaps />
    </PageShell>
  );
}
