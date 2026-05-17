import PageShell from "../components/PageShell";
import DataCollectionAccordion from "./DataCollectionAccordion";

export default function MethodologyPage() {
  return (
    <PageShell
      kicker="Methods"
      title="How the study was built"
      standfirst="One shared foundation sits under everything here: a corpus of roughly 24,000 annotated media items, scored across seven dimensions, then read through five complementary lenses."
      meta={["24,000+ items", "7 annotation dimensions", "5 analytical lenses"]}
    >
      <div className="prose dropcap">
        <p>
          The sections below set out each stage of the work, from how the
          corpus was scraped to how the regression models were specified. They
          are written to be checked. Where a choice constrains the findings, the
          constraint is stated rather than smoothed over.
        </p>
      </div>

      <DataCollectionAccordion />
    </PageShell>
  );
}
