"use client";

import { useState } from "react";

type Panel = { id: string; label: string; content: React.ReactNode };

function Chevron({ open }: { open: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
      style={{ width: "16px", height: "16px", flexShrink: 0, color: "var(--text-muted)", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
      <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
  );
}

const russianChannels = [
  { handle: "@wargonzo",       description: "Senior milblogger. 40–67% political content — the most ideologically oriented channel in the corpus." },
  { handle: "@RVvoenkor",      description: "War correspondent. Growing orientation toward political commentary over kinetic content." },
  { handle: "@ZA_FROHT",      description: "Front-line channel. Drone POV reached 29–31% at peak — one of the highest in the corpus." },
  { handle: "@voenacher",      description: "Military blogger. High drone content, combat-proximate reporting." },
  { handle: "@rusich_army",    description: "Paramilitary-linked. Elevated dehumanization and aestheticization scores throughout." },
];

const ukrainianChannels = [
  { handle: "@a_shtirlitz",      description: "High political share combined with exceptional propaganda meme volumes — explicit information warfare." },
  { handle: "@donbassrealii",    description: "Donbas-based. Highest mean violence score in the corpus (4.73). Documents occupation as lived reality." },
  { handle: "@kherson_non_fake", description: "Kherson-based. Second-highest violence score (4.59). Local documentation under sustained bombardment." },
  { handle: "@hyevuy_dnepr",     description: "Dnipro regional channel. Dominated by destruction and civilian content." },
  { handle: "@voenkorKotenok",   description: "Correspondent account. Event-responsive coverage across the conflict's major phases." },
];

const dimensions = [
  { label: "Content type",       desc: "Primary subject — combatants, equipment, territory, casualties, etc." },
  { label: "Implied violence",   desc: "Degree to which content suggests or depicts harm (0–10)" },
  { label: "Gamification",       desc: "Visual/rhetorical elements framing warfare in ludic or competitive terms (0–10)" },
  { label: "Dehumanization",     desc: "Representations stripping enemy actors of human attributes (0–10)" },
  { label: "Aestheticization",   desc: "Degree to which violence or destruction is rendered visually appealing (0–10)" },
  { label: "Narrative framing",  desc: "Broader discursive register — victorious, defensive, martyrological, etc. (0–10)" },
  { label: "Camera frame / POV", desc: "Compositional and perspectival choices shaping viewer identification" },
];

const limitationItems = [
  {
    title: "Sampling and volume",
    body: "The sampling method — capped at 50 posts per channel per month — ensures temporal comparability but precludes any analysis of absolute engagement or publication volume. All cross-channel and cross-temporal comparisons are therefore proportional rather than absolute. Channels that post more frequently are not systematically better represented, which is methodologically defensible but means the study cannot speak to questions of reach or total output.",
  },
  {
    title: "Annotation quality",
    body: "The automated annotation pipeline rests on a training set of only 50 manually coded images, which introduces subjectivity into the scoring framework. The codebook dimensions — particularly implied violence, aestheticization, and dehumanization — involve inherently interpretive judgements that are relative to this dataset and difficult to replicate without access to the original training material. A technical limitation was also observed whereby the model displayed a tendency to avoid extreme scores, particularly at the upper end of scales, which may compress variance in the results.",
  },
  {
    title: "Corpus scope",
    body: "The corpus is limited to ten Telegram channels — a fraction of the Russian and Ukrainian military information ecosystems, which each comprise dense networks of channels that actively repost and amplify each other's content. Channels that are less visible, operate under pseudonyms, or have since been deleted are systematically excluded. Moreover, restricting the analysis to Telegram leaves aside VKontakte, Twitter/X, and YouTube.",
  },
  {
    title: "Video treatment",
    body: "Video content constitutes a significant share of posts on military Telegram channels. The pipeline processes only the thumbnail image extracted from each video rather than the full audiovisual file. A single static frame cannot capture narrative progression, motion effects, editing rhythm, or the affective dimensions of sound — music, explosions, voiceovers, silence. The drone POV findings in particular may be systematically underestimated, as the gamified qualities of drone footage are often most pronounced in the dynamic visual elements of the full clip.",
  },
];

function ChannelTable({ channels, flagLabel, flagColor }: { channels: typeof russianChannels, flagLabel: string, flagColor: string }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: "10px", border: "1px solid var(--border)" }}>
      <table style={{ width: "100%", textAlign: "left", fontSize: "0.85rem", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface2)" }}>
            <th colSpan={2} style={{ padding: "8px 16px" }}>
              <span style={{ display: "inline-block", background: flagColor, color: "#fff", borderRadius: "4px", padding: "2px 8px", fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {flagLabel}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {channels.map((ch, i) => (
            <tr key={ch.handle} style={{ background: i % 2 === 0 ? "transparent" : "var(--surface2)", borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "9px 16px", fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 500, color: "var(--accent)", whiteSpace: "nowrap" }}>{ch.handle}</td>
              <td style={{ padding: "9px 16px", fontSize: "0.85rem", color: "var(--text-dim)" }}>{ch.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const panels: Panel[] = [
  {
    id: "collection",
    label: "I. Data collection",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          The corpus was assembled using a custom Python script built on the{" "}
          <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--accent)" }}>Telethon</span>{" "}
          library, which interfaces with the Telegram API to retrieve message metadata programmatically. The scraping pipeline was designed to collect media-bearing posts — photographs, videos (retrieved via thumbnail), and documents — published between{" "}
          <span style={{ color: "var(--accent)", fontWeight: 500 }}>24 February 2022 and 24 February 2026</span>.
          For each message, the following metadata was extracted: channel identifier, publication date, media type, file size, view count, forward count, reply count, and user reactions.
        </p>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          To ensure temporal representativeness while managing data volume, a systematic sampling method was applied: up to 50 evenly spaced media posts per channel per month were selected, yielding a corpus of approximately{" "}
          <span style={{ color: "var(--accent)", fontWeight: 500 }}>24.000+ sampled observations</span>.
          All cross-channel and cross-temporal comparisons are therefore <em>proportional</em> rather than absolute — a deliberate methodological constraint that precludes analysis of absolute publication volume but enables reliable comparative analysis of content composition over time.
        </p>
        <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-dim)" }}>
          Channels — 5 Russian · 5 Ukrainian
        </p>
        <ChannelTable channels={russianChannels} flagLabel="Russia" flagColor="#c84848" />
        <ChannelTable channels={ukrainianChannels} flagLabel="Ukraine" flagColor="#0057b7" />
      </div>
    ),
  },
  {
    id: "annotation",
    label: "II. Content annotation pipeline",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          A structured annotation framework was developed to systematically code each media item across seven analytical dimensions, enabling standardised comparative analysis across channels and time. The codebook captures both descriptive and interpretive features of each image or video. Each image received a score on all seven dimensions simultaneously via a single API call returning a structured JSON object.
        </p>

        <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "20px" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "14px" }}>
            The seven annotation dimensions
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {dimensions.map((d, i) => (
              <div key={d.label} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ display: "flex", width: "20px", height: "20px", flexShrink: 0, alignItems: "center", justifyContent: "center", borderRadius: "50%", background: i % 2 === 0 ? "#0057b7" : "#ffdd00", fontSize: "10px", fontWeight: 700, color: i % 2 === 0 ? "#fff" : "#111", marginTop: "1px" }}>
                  {i + 1}
                </span>
                <div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text)" }}>{d.label}</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}> — {d.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          The pipeline was developed in three stages. The research team manually coded 50 images, which were fed into the model as few-shot demonstrations to transfer codebook logic to the automated pipeline. Final annotation at scale was carried out using{" "}
          <span style={{ color: "var(--accent)", fontWeight: 500 }}>ChatGPT 4.5</span>.
          A recurring challenge was the model&apos;s reluctance to code violent content due to built-in safety constraints; this was addressed by prompting the model to adopt the persona of an academic researcher in conflict studies, which proved effective in eliciting consistent annotations across the full dataset.
        </p>
      </div>
    ),
  },
  {
    id: "visual-map",
    label: "III. 2D visual map",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          To provide an exploratory overview of the corpus structure prior to annotation, a 2D visual map was produced by passing 400 manually selected images through{" "}
          <span style={{ color: "var(--accent)", fontWeight: 500 }}>CLIP (ViT-B-32)</span>,
          a vision-language model that generates high-dimensional semantic embeddings for visual content. The 400 images were selected to ensure representativity both across channels and across content type.
        </p>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          Embeddings were computed using the <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--accent)" }}>sentence-transformers</span> library, and dimensionality reduction was applied via{" "}
          <span style={{ color: "var(--accent)", fontWeight: 500 }}>t-SNE</span> (scikit-learn) to produce a two-dimensional scatter plot. The pipeline was implemented in Python and executed in Google Colab. The resulting map was used to inform the annotation codebook categories and to identify the primary visual clusters in the corpus before large-scale annotation.
        </p>
      </div>
    ),
  },
  {
    id: "content-analysis",
    label: "IV. Channel content analysis",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          The primary goal of the channel content analysis is to identify shifts in communication strategies across individual Telegram channels over the four-year observation period. By normalising the data into percentages, the relative importance of different content types — combat, civilian victims, propaganda, political commentary, drone strikes — can be compared across channels and over time without the confounding effects of differential posting frequency.
        </p>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          Results are rendered as interactive heatmaps with a shared colour scale ranging from 0% to 80%, capped to accommodate extreme category dominance in certain channels while preserving gradient resolution for the more commonly observed 0–40% range. The interface offers two complementary views: a <em>category</em> view (one heatmap per content type, allowing cross-channel comparison) and a <em>channel</em> view (one heatmap per channel, allowing holistic reading of each channel&apos;s editorial profile over time).
        </p>
      </div>
    ),
  },
  {
    id: "sampling",
    label: "V. Sampling strategy",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          Due to the high volume of media posts — often exceeding 2,000 per channel per month — a{" "}
          <span style={{ color: "var(--accent)", fontWeight: 500 }}>systematic positional sampling strategy</span>{" "}
          was applied independently to each channel-month pair.
        </p>
        <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "20px" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "12px" }}>Procedure</p>
          <ol style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              "All media-bearing messages were enumerated and ordered chronologically by publication timestamp, producing an ordered list of M messages indexed 0 to M − 1.",
              "If M ≤ 50, all messages were retained without sampling.",
              "If M > 50, exactly 50 messages were selected using evenly spaced index interpolation.",
            ].map((step, i) => (
              <li key={i} style={{ display: "flex", gap: "12px", fontSize: "0.875rem", color: "var(--text-dim)", lineHeight: 1.7 }}>
                <span style={{ display: "flex", width: "20px", height: "20px", flexShrink: 0, alignItems: "center", justifyContent: "center", borderRadius: "50%", background: i % 2 === 0 ? "#0057b7" : "#ffdd00", fontSize: "10px", fontWeight: 700, color: i % 2 === 0 ? "#fff" : "#111", marginTop: "2px" }}>
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div style={{ marginTop: "16px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px 16px", fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)" }}>
            <p style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px" }}>Sampling formula</p>
            <p>step = (M − 1) / (n − 1)   where n = 50</p>
            <p style={{ marginTop: "4px" }}>I = {"{ round(i × step) | i ∈ {0, 1, …, n−1} }"}</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "correlatory",
    label: "VI. Correlatory effects",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          To explore correlatory effects across the five annotation dimensions, a series of bivariate ordinary least squares (OLS) regression analyses were conducted on the full annotated corpus of 24.000+ images. For each model, one score was designated the independent variable and a theoretically related score the dependent variable, drawing on prior literature on visual propaganda and conflict media.
        </p>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          Pearson correlation coefficients, regression slopes, intercepts, and R² values were computed, and statistical significance was assessed via p-values derived from the t-distribution on the regression slope. Three targeted models were constructed:
        </p>
        <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            "Gamification → Implied violence",
            "Dehumanization → Implied violence",
            "Aestheticization → Narrative framing",
          ].map((model, i) => (
            <div key={model} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <span style={{ display: "flex", width: "20px", height: "20px", flexShrink: 0, alignItems: "center", justifyContent: "center", borderRadius: "50%", background: i % 2 === 0 ? "#0057b7" : "#ffdd00", fontSize: "10px", fontWeight: 700, color: i % 2 === 0 ? "#fff" : "#111" }}>
                {i + 1}
              </span>
              <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--accent)" }}>{model}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          To contextualise each relationship, mean scores per discrete score level were computed with 95% confidence intervals (±1.96 × σ/√n), and results were disaggregated by content type, frame type, and channel. A full 5×5 Pearson correlation heatmap was produced to identify second-order relationships across the score network.
        </p>
      </div>
    ),
  },
  {
    id: "limitations",
    label: "VII. Limitations",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          The study is best understood as an exploratory contribution rather than a definitive empirical account. Its primary value lies in demonstrating the methodological feasibility of large-scale automated visual analysis in conflict contexts, and in generating hypotheses for more rigorously resourced future research.
        </p>
        {limitationItems.map((item) => (
          <div key={item.title} style={{ display: "flex", gap: "16px", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "16px" }}>
            <span style={{ display: "flex", width: "22px", height: "22px", flexShrink: 0, alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "#ffdd00", fontSize: "11px", fontWeight: 700, color: "#111", marginTop: "1px" }}>!</span>
            <div>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)", marginBottom: "4px" }}>{item.title}</p>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--text-dim)" }}>{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

export default function DataCollectionAccordion() {
  const [open, setOpen] = useState<string | null>("collection");

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: "14px", overflow: "hidden", background: "var(--surface)" }}>
      {panels.map((panel, idx) => {
        const isOpen = open === panel.id;
        return (
          <div key={panel.id} style={{ borderTop: idx > 0 ? "1px solid var(--border)" : undefined }}>
            <button
              onClick={() => setOpen(isOpen ? null : panel.id)}
              style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", textAlign: "left", background: "transparent", border: "none", cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--surface2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontFamily: "var(--sans)", fontSize: "0.9rem", fontWeight: 500, color: "var(--text)" }}>{panel.label}</span>
              <Chevron open={isOpen} />
            </button>
            {isOpen && (
              <div style={{ borderTop: "1px solid var(--border)", padding: "20px 24px" }}>
                {panel.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
