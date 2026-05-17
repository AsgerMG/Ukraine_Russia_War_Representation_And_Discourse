import PageShell from "../components/PageShell";
import ViolenceCharts from "./ViolenceCharts";

export default function ImpliedViolencePage() {
  return (
    <PageShell
      kicker="Chapter Two"
      title="Frontline violence"
      standfirst="How violence is shown, implied and gradually normalised across ten Russian and Ukrainian Telegram channels over four years of war."
      meta={["24,000+ images", "10 channels", "Feb 2022 to Feb 2026"]}
    >
      <ViolenceCharts />
    </PageShell>
  );
}
