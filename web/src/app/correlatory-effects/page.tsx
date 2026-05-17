import PageShell from "../components/PageShell";
import CorrelationCharts from "./CorrelationCharts";

export default function CorrelatoryEffectsPage() {
  return (
    <PageShell
      kicker="Cross-dimensional analysis"
      title="How the dimensions move together"
      standfirst="Gamification, dehumanisation, aestheticisation and violence do not vary independently. Read against one another through bivariate regression, they trace a connected visual logic."
      meta={["24,000+ images", "Bivariate OLS models", "Pearson correlations"]}
    >
      <CorrelationCharts />
    </PageShell>
  );
}
