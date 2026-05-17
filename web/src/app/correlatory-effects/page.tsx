import PageShell from "../components/PageShell";
import CorrelationCharts from "./CorrelationCharts";

export default function CorrelatoryEffectsPage() {
  return (
    <PageShell
      chapter="Cross-dimensional analysis"
      title="Correlatory effects"
      subtitle="How the continuous annotation dimensions relate to one another across the corpus, using bivariate OLS models and correlation summaries."
      pillBg="#0057b7"
      pillText="#fff"
    >
      <CorrelationCharts />
    </PageShell>
  );
}
