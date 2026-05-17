import Link from "next/link";

const findings = [
  {
    value: "24,000+",
    label: "sampled images and video thumbnails",
    detail: "A four-year Telegram corpus spanning five Russian and five Ukrainian channels.",
  },
  {
    value: "41%",
    label: "score 6+ for implied violence",
    detail: "Violent imagery is not episodic; it is a stable visual condition of the war feed.",
  },
  {
    value: "x2.2",
    label: "rise in gamification score",
    detail: "Drone and targeting interfaces increasingly make violence appear operational and game-like.",
  },
  {
    value: "10",
    label: "channels compared symmetrically",
    detail: "The project reads Russian and Ukrainian war imagery through the same annotation framework.",
  },
];

const chapters = [
  {
    href: "/content-type",
    eyebrow: "Chapter 01",
    title: "Channel content",
    description:
      "How political commentary, destruction, propaganda, combat and civilian harm shift across channels over time.",
  },
  {
    href: "/implied-violence",
    eyebrow: "Chapter 02",
    title: "Frontline violence",
    description:
      "The distribution, persistence and qualitative genres of violent imagery across the corpus.",
  },
  {
    href: "/technical-framing",
    eyebrow: "Chapter 03",
    title: "Technical means",
    description:
      "How drone POV, soldier POV, screenshots and professional production change the war's visual grammar.",
  },
  {
    href: "/correlatory-effects",
    eyebrow: "Cross-dimensional",
    title: "Correlatory effects",
    description:
      "How gamification, dehumanization, aestheticization and violence scores move together.",
  },
  {
    href: "/methodology",
    eyebrow: "Research design",
    title: "Methodology",
    description:
      "Sampling, annotation, limitations and the technical pipeline behind the analysis.",
  },
  {
    href: "/project-report",
    eyebrow: "Full text",
    title: "Project report",
    description:
      "The long-form report for readers who want the complete argument and literature context.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ color: "var(--text)" }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8 lg:gap-16 lg:py-20">
        <header className="grid gap-8 rounded-[28px] border border-[color:var(--border)] bg-[color:var(--panel)] p-5 shadow-2xl shadow-black/30 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <p className="kicker">Conference research preview</p>
              <div className="space-y-4">
                <h1 className="max-w-4xl font-serif text-[clamp(2.45rem,9vw,5.8rem)] font-bold leading-[0.95] tracking-[-0.045em] text-[color:var(--text)]">
                  Picturing the War
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[color:var(--text-dim)] sm:text-xl">
                  Visual representation and discourse on Telegram, 2022-2026. A comparative study of how ten Russian and Ukrainian channels make the war visible, persuasive and repeatable.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className="button-primary" href="#visual-map">
                Explore the visual map
              </Link>
              <Link className="button-secondary" href="/project-report">
                Read the full report
              </Link>
            </div>
          </div>

          <aside className="grid content-between gap-4 rounded-3xl border border-[color:var(--border)] bg-black/25 p-5">
            <div className="data-rule" />
            <p className="kicker text-[color:var(--text)]">Core claim</p>
            <p className="text-balance font-serif text-3xl font-bold leading-tight text-[color:var(--text)]">
              Both sides share a visual language, but use it to say different things.
            </p>
            <p className="text-sm leading-7 text-[color:var(--text-dim)]">
              The site is built for quick conference scanning: start with the map, then move into the finished analytical chapters.
            </p>
          </aside>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Key findings">
          {findings.map((finding) => (
            <article className="stat-card" key={finding.label}>
              <p className="font-serif text-4xl font-bold leading-none text-[color:var(--text)]">{finding.value}</p>
              <div className="mt-3 h-1 w-12 bg-[color:var(--ukraine-blue)]" />
              <h2 className="mt-3 text-sm font-medium uppercase tracking-[0.16em] text-[color:var(--text)]">{finding.label}</h2>
              <p className="mt-3 text-sm leading-6 text-[color:var(--text-dim)]">{finding.detail}</p>
            </article>
          ))}
        </section>

        <section id="visual-map" className="space-y-5 scroll-mt-6">
          <div className="flex flex-col gap-4 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="kicker">Corpus explorer</p>
              <h2 className="font-serif text-3xl font-bold text-[color:var(--text)]">2D visual map</h2>
              <p className="max-w-3xl text-sm leading-7 text-[color:var(--text-dim)]">
                A 400-image sample projected with CLIP embeddings and t-SNE. On desktop, drag to pan and scroll to zoom. On mobile, open the map full screen for the best touch experience.
              </p>
            </div>
            <a className="button-secondary shrink-0" href="/visual-map.html" target="_blank" rel="noopener noreferrer">
              Open map full screen
            </a>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-black/60 shadow-2xl shadow-black/40 h-[min(68vh,620px)] min-h-[420px] max-sm:h-[52vh] max-sm:min-h-[360px]">
            <iframe
              src="/visual-map.html"
              className="absolute inset-0 h-full w-full"
              title="2D visual embedding map"
              loading="lazy"
            />
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="kicker">Finished public chapters</p>
              <h2 className="font-serif text-3xl font-bold text-[color:var(--text)]">Follow the argument</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[color:var(--text-muted)]">
              A short route through the strongest findings, with deeper material available when readers want it.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {chapters.map((chapter) => (
              <Link className="chapter-card" href={chapter.href} key={chapter.href}>
                <p className="kicker">{chapter.eyebrow}</p>
                <h3 className="mt-4 font-serif text-2xl font-bold text-[color:var(--text)]">{chapter.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-dim)]">{chapter.description}</p>
                <span className="mt-6 inline-flex font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--ukraine-yellow)]">
                  Open
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
