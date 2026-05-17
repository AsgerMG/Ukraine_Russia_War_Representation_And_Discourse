import PageShell from "../components/PageShell";
import VisualAnalysis from "./VisualAnalysis";

const figures = [
  { value: "12%", label: "Drone POV at its peak in the first half of 2024, up from 3.4% in 2022" },
  { value: "2.2×", label: "Gamification score over the study period, from 0.84 to 1.83" },
  { value: "5.04", label: "Dehumanisation in drone footage by late 2025, against a corpus mean of 2.06" },
];

export default function TechnicalFramingPage() {
  return (
    <PageShell
      kicker="Chapter Three"
      title="Technical means"
      standfirst="How the way an image is made, by drone, by soldier, by civilian phone or by a studio, changes what the war looks like."
      meta={["24,000+ images", "10 channels", "H1 2022 to H2 2025"]}
    >
      <div className="prose dropcap">
        <p>
          Early in the war the footage is raw and close to the ground. A
          civilian films a street; a soldier films a trench. Over four years
          that ground-level register gives way to more mediated production. Drone
          POV roughly triples across the corpus and becomes the defining look of
          the more militarily oriented channels, while screenshots and
          studio-grade production take over the commentary aggregators. The
          partial 2026 period is left out here to avoid truncation bias.
        </p>
      </div>

      <section aria-label="Key figures">
        <p className="kicker">Key figures</p>
        <dl className="index-list mt-5">
          {figures.map((f) => (
            <div
              key={f.value}
              className="flex flex-col gap-1 border-b border-[color:var(--rule)] py-5 sm:flex-row sm:items-baseline sm:gap-7"
            >
              <dt className="stat-figure shrink-0 text-[2rem] sm:w-32 sm:text-[2.2rem]">
                {f.value}
              </dt>
              <dd className="text-[1rem] leading-7 text-[color:var(--text-dim)]">
                {f.label}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-label="Interactive companion">
        <p className="kicker">Interactive companion</p>
        <h2 className="mt-4">Production modes over time</h2>
        <div className="mt-7">
          <VisualAnalysis />
        </div>
      </section>

      <section aria-label="Interpretation">
        <p className="kicker">Interpretation</p>
        <h2 className="mt-4">Why the shift matters</h2>
        <div className="prose mt-5">
          <p>
            The change is not only aesthetic. Drone footage scores consistently
            higher on gamification and dehumanisation than any other frame type.
            By the second half of 2025 drone POV images score 6.04 on
            gamification out of ten, against a corpus-wide average near 1.7. The
            drone aesthetic imports the visual grammar of first-person games into
            the representation of lethal force.
          </p>
          <p>
            Scores then plateau through 2025. The likeliest reading is
            normalisation: producers and audiences grow used to the register, so
            its marked quality fades even as its prevalence stays high.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
