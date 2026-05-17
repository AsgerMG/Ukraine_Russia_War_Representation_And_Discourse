import type { ReactNode } from "react";

const russianChannels = [
  { handle: "@wargonzo", description: "Senior milblogger. Political content runs at 40 to 67 per cent, the most ideologically oriented channel in the corpus." },
  { handle: "@RVvoenkor", description: "War correspondent, drifting steadily from kinetic footage toward political commentary." },
  { handle: "@ZA_FROHT", description: "Front-line channel. Drone POV reached 29 to 31 per cent at its peak, among the highest anywhere in the corpus." },
  { handle: "@voenacher", description: "Military blogger with heavy drone content and combat-proximate reporting." },
  { handle: "@rusich_army", description: "Paramilitary-linked, with elevated dehumanisation and aestheticisation scores throughout." },
];

const ukrainianChannels = [
  { handle: "@a_shtirlitz", description: "A high political share alongside exceptional propaganda-meme volumes, openly an information-warfare account." },
  { handle: "@donbassrealii", description: "Donbas-based. The highest mean violence score in the corpus, 4.73, documenting occupation as lived reality." },
  { handle: "@kherson_non_fake", description: "Kherson-based, second-highest violence score at 4.59, local documentation under sustained bombardment." },
  { handle: "@hyevuy_dnepr", description: "Dnipro regional channel, dominated by destruction and civilian content." },
  { handle: "@voenkorKotenok", description: "Correspondent account with event-responsive coverage across the major phases of the war." },
];

const dimensions = [
  { label: "Content type", desc: "the primary subject: combatants, equipment, territory, casualties and so on" },
  { label: "Implied violence", desc: "the degree to which content suggests or depicts harm, scored 0 to 10" },
  { label: "Gamification", desc: "visual or rhetorical elements that frame warfare in ludic or competitive terms, 0 to 10" },
  { label: "Dehumanisation", desc: "representations that strip enemy actors of human attributes, 0 to 10" },
  { label: "Aestheticisation", desc: "the degree to which violence or destruction is rendered visually appealing, 0 to 10" },
  { label: "Narrative framing", desc: "the broader discursive register: victorious, defensive, martyrological and so on, 0 to 10" },
  { label: "Camera frame / POV", desc: "the compositional and perspectival choices that shape viewer identification" },
];

const aiStages = [
  {
    label: "Concept and design",
    desc: "Anthropic Claude Opus and Sonnet for technical-feasibility review, scoping and formalising the approach, used through a voice model and the AskUserQuestion tool",
  },
  {
    label: "Data collection",
    desc: "Claude Opus for sampling strategy and architecture, the Cursor IDE for the Python scraping scripts, CLIP (ViT-B-32) for the pre-annotation 2D map, and GPT-5 Nano with the Claude Vision API for automated annotation",
  },
  {
    label: "Data analysis",
    desc: "Claude Opus prompted to generate interactive HTML diagnostic sites for the violence, gamification, dehumanisation, narrative-framing and content-analysis dimensions, used to interrogate the output critically; comparative and correlative passes on violence and reach, drone POV against gamification and dehumanisation, and channel-alignment differences",
  },
  {
    label: "Presentation",
    desc: "the Cursor IDE for the Next.js site that hosts these findings, and primarily frontier models, Claude Opus 4.7 and ChatGPT 5.5, for drafting the long-form report",
  },
];

function ChannelList({ channels, side }: { channels: typeof russianChannels; side: string }) {
  return (
    <div>
      <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
        {side}
      </p>
      <dl className="index-list mt-3">
        {channels.map((ch) => (
          <div
            key={ch.handle}
            className="flex flex-col gap-1 border-b border-[color:var(--rule)] py-3.5 sm:flex-row sm:gap-6"
          >
            <dt className="shrink-0 font-mono text-[0.82rem] text-[color:var(--accent)] sm:w-44">
              {ch.handle}
            </dt>
            <dd className="text-[0.98rem] leading-7 text-[color:var(--text-dim)]">
              {ch.description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Section({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-[color:var(--rule)] pt-10">
      <p className="kicker">{label}</p>
      <h2 className="mt-3">{title}</h2>
      <div className="prose mt-5">{children}</div>
    </section>
  );
}

export default function DataCollectionAccordion() {
  return (
    <div className="flex flex-col gap-12">
      <Section label="Section 0" title="A note on AI-assisted research practice">
        <p>
          The methodology below was carried out with extensive AI assistance at
          every stage. The tooling is set out plainly here so that readers can
          weigh each finding against the instruments that produced it.
        </p>
        <ol className="mt-6 flex list-none flex-col gap-3 pl-0">
          {aiStages.map((s, i) => (
            <li key={s.label} className="flex gap-4">
              <span className="shrink-0 font-mono text-[0.8rem] text-[color:var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[1.02rem] leading-7">
                <strong className="text-[color:var(--text)]">{s.label}</strong>
                <span className="text-[color:var(--text-dim)]">: {s.desc}.</span>
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="Section I" title="Data collection">
        <p>
          The corpus was assembled with a custom Python script built on{" "}
          <span className="font-mono text-[0.92em] text-[color:var(--text)]">Telethon</span>,
          which talks to the Telegram API and pulls message metadata
          programmatically. The sampling strategy and the script architecture
          were scoped with Claude Opus, and the script itself was authored and
          executed inside the Cursor IDE. The pipeline collected media-bearing
          posts, photographs, video thumbnails and documents, published between
          24 February 2022 and 24 February 2026. For each message it recorded
          the channel, publication date, media type, file size, view count,
          forward count, reply count and reactions.
        </p>
        <p>
          To keep the data volume manageable while staying temporally
          representative, the script took up to fifty evenly spaced media posts
          per channel per month. That yields roughly 24,000 sampled
          observations. Every cross-channel and cross-time comparison is
          therefore proportional rather than absolute. The trade-off is
          deliberate: it rules out any claim about raw publication volume but
          makes the composition of a feed comparable over four years.
        </p>
        <div className="mt-7 flex flex-col gap-8">
          <ChannelList channels={russianChannels} side="Five Russian channels" />
          <ChannelList channels={ukrainianChannels} side="Five Ukrainian channels" />
        </div>
      </Section>

      <Section label="Section II" title="Content annotation pipeline">
        <p>
          A structured codebook coded each item across seven dimensions at once,
          capturing both descriptive and interpretive features. Every image
          received a score on all seven in a single API call that returned a
          structured JSON object.
        </p>
        <ol className="mt-6 flex list-none flex-col gap-3 pl-0">
          {dimensions.map((d, i) => (
            <li key={d.label} className="flex gap-4">
              <span className="shrink-0 font-mono text-[0.8rem] text-[color:var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[1.02rem] leading-7">
                <strong className="text-[color:var(--text)]">{d.label}</strong>
                <span className="text-[color:var(--text-dim)]">: {d.desc}.</span>
              </span>
            </li>
          ))}
        </ol>
        <p>
          The pipeline came together in three stages. A first batch was run
          through the{" "}
          <span className="text-[color:var(--text)]">Claude Vision API</span> as
          a gold-standard reference. The team then hand-coded fifty images and
          fed them back to the model as few-shot demonstrations to transfer the
          codebook logic. Annotation at scale was finally carried out on{" "}
          <span className="text-[color:var(--text)]">GPT-5 Nano</span>. The
          recurring obstacle was the model&apos;s reluctance to code violent
          content under its safety constraints. Prompting it to take the role of
          an academic researcher in conflict studies produced consistent
          annotations across the full dataset.
        </p>
      </Section>

      <Section label="Section III" title="The two-dimensional visual map">
        <p>
          Before annotation, four hundred manually selected images were passed
          through{" "}
          <span className="text-[color:var(--text)]">CLIP (ViT-B-32)</span>, a
          vision-language model that produces high-dimensional semantic
          embeddings. The selection was balanced across channels and content
          types.
        </p>
        <p>
          Embeddings were computed with{" "}
          <span className="font-mono text-[0.92em] text-[color:var(--text)]">sentence-transformers</span>,
          and t-SNE in scikit-learn reduced them to two dimensions for a scatter
          plot. The pipeline ran in Python on Google Colab. The resulting map
          informed the codebook categories and surfaced the main visual clusters
          before large-scale annotation began.
        </p>
      </Section>

      <Section label="Section IV" title="Channel content analysis">
        <p>
          The content analysis tracks how communication strategies shift per
          channel across the four-year window. Normalising the data into
          percentages lets the relative weight of each content type, combat,
          civilian victims, propaganda, political commentary, drone strikes, be
          compared across channels and over time without posting frequency
          getting in the way.
        </p>
        <p>
          Results are drawn as interactive heatmaps on a shared 0 to 80 per cent
          scale, capped to absorb extreme category dominance in a few channels
          while keeping gradient resolution across the common 0 to 40 per cent
          range. Two views are offered: a category view, one heatmap per content
          type for cross-channel comparison, and a channel view, one heatmap per
          channel for a holistic read of each editorial profile.
        </p>
      </Section>

      <Section label="Section V" title="Violence analysis">
        <p>
          Of the seven dimensions, implied violence was singled out for
          dedicated treatment. It is the dimension most constitutive of wartime
          visual communication, present across every content type, channel and
          period. It is also the richest: alongside the numeric score, each
          annotation carries a justification describing the specific visual cues
          behind the rating, which makes qualitative analysis possible at scale.
        </p>
        <p>
          The analysis runs in two stages. The quantitative stage examines the
          overall distribution of scores, their evolution over four years, their
          variation across channels and between the two national groups, and
          their relationship to view counts. The qualitative stage builds an
          inductive typology by reading the annotation descriptions and grouping
          images by shared visual logic, rather than leaning on the model&apos;s
          content-type labels. That process identified eight distinct genres of
          violent representation, from direct casualty imagery to the
          aestheticised memorial memes of the Груз 200 genre.
        </p>
      </Section>

      <Section label="Section VI" title="Technical means analysis">
        <p>
          To follow shifts in technical mode, images were binned into half-year
          periods from the first half of 2022 through the second half of 2025,
          giving eight time bins. The partial 2026 period was excluded to avoid
          truncation bias. The dependent variable is frame type, a seven-way
          classification of how an image was produced: drone POV, soldier POV,
          civilian recording, professional production, composite or meme,
          screenshot, and other.
        </p>
        <p>
          Proportional shares were computed both corpus-wide and per channel.
          The two-level view matters because an aggregate shift can be driven by
          a handful of high-volume channels rather than uniform change. As a
          secondary lens, mean scores for the five continuous dimensions were
          cross-tabulated by frame type, to test whether a changing frame mix
          tracks a qualitative change in how violence is shown.
        </p>
      </Section>

      <Section label="Section VII" title="Correlatory effects">
        <p>
          To probe relationships across the five continuous dimensions, a series
          of bivariate ordinary least squares models was fitted on the full
          annotated corpus. For each model one score was the independent
          variable and a theoretically related score the dependent one, drawing
          on prior work on visual propaganda and conflict media.
        </p>
        <p>
          Pearson coefficients, slopes, intercepts and R² values were computed,
          with significance assessed through p-values from the t-distribution on
          the slope. Three targeted models were built: gamification on implied
          violence, dehumanisation on implied violence, and aestheticisation on
          narrative framing. To contextualise each relationship, mean scores per
          discrete score level were computed with 95 per cent confidence
          intervals and disaggregated by content type, frame type and channel. A
          full five-by-five correlation heatmap then exposed the second-order
          relationships across the network.
        </p>
      </Section>
    </div>
  );
}
