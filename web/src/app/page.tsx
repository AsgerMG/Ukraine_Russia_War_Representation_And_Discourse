import Link from "next/link";

const numbers = [
  { value: "24,000+", label: "sampled images and video thumbnails, four years of a Telegram corpus" },
  { value: "10",      label: "channels, five Russian and five Ukrainian, read through one annotation framework" },
  { value: "41%",     label: "score six or higher for implied violence, a steady condition rather than an episode" },
  { value: "2.2×",    label: "rise in the gamification score as drone and targeting interfaces spread" },
];

const contents = [
  {
    href: "/content-type",
    no: "01",
    eyebrow: "Chapter",
    title: "What the channels chose to show",
    dek: "How political commentary, destruction, propaganda, combat and civilian harm rise and recede across the feeds over time.",
  },
  {
    href: "/implied-violence",
    no: "02",
    eyebrow: "Chapter",
    title: "Frontline violence",
    dek: "The distribution, persistence and qualitative genres of violent imagery across the corpus.",
  },
  {
    href: "/technical-framing",
    no: "03",
    eyebrow: "Chapter",
    title: "Technical means",
    dek: "How drone POV, soldier POV, screenshots and professional production reshape the war's visual grammar.",
  },
  {
    href: "/correlatory-effects",
    no: "04",
    eyebrow: "Chapter",
    title: "How the dimensions move together",
    dek: "Where gamification, dehumanisation, aestheticisation and violence rise and fall in step.",
  },
  {
    href: "/methodology",
    no: "05",
    eyebrow: "Reference",
    title: "Methodology",
    dek: "Sampling, annotation, limitations and the technical pipeline behind the analysis.",
  },
  {
    href: "/project-report",
    no: "06",
    eyebrow: "Long read",
    title: "The full report",
    dek: "The long-form text for readers who want the complete argument and its literature.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-6 lg:py-20">

        <header>
          <p className="kicker">Conference research preview</p>
          <h1 className="mt-5 text-[clamp(2.6rem,7vw,4.6rem)] leading-[1.02]">
            Picturing the War
          </h1>
          <p className="lede mt-6 max-w-[40ch]">
            Visual representation and discourse on Telegram, 2022 to 2026. A
            comparative study of how ten Russian and Ukrainian channels made the
            war visible, persuasive and repeatable.
          </p>
          <div className="data-rule mt-9" />
        </header>

        <section className="mt-12 prose dropcap" aria-label="Introduction">
          <p>
            The argument of this study is simple to state and harder to look at.
            Both sides of the war draw on the same visual language, the same
            grammar of drone footage, ruined streets, weapons laid out for the
            camera and memorial montage. They use it to say opposite things. One
            feed documents what is being done to it; the other rehearses what it
            is doing.
          </p>
          <p>
            The site is built to be read rather than scanned. Start with the
            visual map for a sense of the corpus, then follow the chapters in
            order, or jump to the chapter that answers your question. The
            methodology is set out plainly so the findings can be checked.
          </p>
        </section>

        <section className="mt-14" aria-label="By the numbers">
          <p className="kicker">By the numbers</p>
          <dl className="mt-5 grid grid-cols-1 border-t border-[color:var(--rule-strong)] sm:grid-cols-2">
            {numbers.map((n, i) => (
              <div
                key={n.value}
                className={`flex flex-col gap-2 border-b border-[color:var(--rule)] py-6 sm:py-7 ${
                  i % 2 === 0
                    ? "sm:border-r sm:border-r-[color:var(--rule)] sm:pr-8"
                    : "sm:pl-8"
                }`}
              >
                <dt className="stat-figure text-[2rem] sm:text-[2.25rem]">{n.value}</dt>
                <dd className="max-w-[34ch] text-[0.98rem] leading-7 text-[color:var(--text-dim)]">
                  {n.label}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="visual-map" className="mt-16 scroll-mt-6">
          <p className="kicker">Corpus explorer</p>
          <h2 className="mt-3">The two-dimensional visual map</h2>
          <p className="prose mt-4 max-w-[58ch]">
            A four-hundred-image sample projected with CLIP embeddings and
            t-SNE. Drag to roam, scroll to zoom. On a phone, open the map
            full screen for the best touch experience.
          </p>
          <figure className="mt-7 figure">
            <div className="overflow-hidden bg-black/30 h-[min(72vh,640px)] min-h-[460px] max-sm:h-[58vh]">
              <iframe
                src="/visual-map.html"
                className="h-full w-full"
                title="Two-dimensional visual embedding map"
                loading="lazy"
              />
            </div>
            <figcaption className="figure-cap mt-4">
              <strong>Figure 1.</strong> A four-hundred-image sample of the
              corpus, projected with CLIP embeddings and t-SNE. Russian
              channels tend toward the lower-left; Ukrainian aftermath imagery
              clusters along the upper edge. Drone POV gathers in the
              west; memorial portraiture in the north-east. Approximate
              cluster positions are labelled; use the story stops to fly
              directly to each region.
            </figcaption>
          </figure>
          <p className="mt-4">
            <a
              className="button-primary"
              href="/visual-map.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the map full screen &rarr;
            </a>
          </p>
        </section>

        <section className="mt-20">
          <p className="kicker">Contents</p>
          <h2 className="mt-4">Follow the argument</h2>
          <nav className="index-list mt-7">
            {contents.map((c) => (
              <Link key={c.href} href={c.href} className="index-row group">
                <div className="flex items-start gap-5 sm:gap-7">
                  <span className="mt-[0.35rem] shrink-0 font-sans text-[0.8rem] font-semibold tracking-widest text-[color:var(--accent)]">
                    {c.no}
                  </span>
                  <div className="flex-1">
                    <p className="font-sans text-[0.69rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                      {c.eyebrow}
                    </p>
                    <h3 className="mt-1.5 text-[1.35rem] transition-colors group-hover:text-[color:var(--ukraine-yellow)]">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 max-w-[58ch] text-[0.98rem] leading-7 text-[color:var(--text-dim)]">
                      {c.dek}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="mt-[0.35rem] shrink-0 self-start font-sans text-[1.05rem] text-[color:var(--text-muted)] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[color:var(--ukraine-yellow)]"
                  >
                    &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </nav>
        </section>

        <footer className="mt-24 border-t border-[color:var(--rule)] pt-7 font-sans text-[0.72rem] text-[color:var(--text-muted)]">
          Picturing the War. A comparative study of ten Telegram channels,
          February 2022 to February 2026.
        </footer>

      </main>
    </div>
  );
}
