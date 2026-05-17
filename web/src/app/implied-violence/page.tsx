import PageShell from "../components/PageShell";
import ViolenceCharts from "./ViolenceCharts";

export default function ImpliedViolencePage() {
  return (
    <PageShell
      chapter="Chapter 02"
      title="Frontline violence"
      subtitle="How violence is depicted, implied and normalised across ten Russian and Ukrainian Telegram channels."
      pillBg="#0057b7"
      pillText="#fff"
    >
      <ViolenceCharts />
    </PageShell>
  );
}
