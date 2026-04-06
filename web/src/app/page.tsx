type SectionConfig = {
  href: string;
  title: string;
  bg: string;
  Icon: () => JSX.Element;
};

const sections: SectionConfig[] = [
  {
    href: "/content-type",
    title: "Content type",
    bg: "bg-[#e3f0ff]", // light Ukrainian blue
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c5e0ff] text-lg">
        🎯
      </span>
    ),
  },
  {
    href: "/implied-violence",
    title: "Implied violence",
    bg: "bg-[#c5e0ff]", // medium Ukrainian blue
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a7d0ff] text-lg">
        ⚠️
      </span>
    ),
  },
  {
    href: "/gamification",
    title: "Gamification",
    bg: "bg-[#a7d0ff]", // stronger Ukrainian blue
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#89c0ff] text-lg">
        🎮
      </span>
    ),
  },
  {
    href: "/dehumanization",
    title: "Dehumanization",
    bg: "bg-[#89c0ff]", // deepest Ukrainian blue in row
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#72b3ff] text-lg">
        🧱
      </span>
    ),
  },
  {
    href: "/aestheticization",
    title: "Aestheticization",
    bg: "bg-[#fff7d1]", // light Ukrainian yellow
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffefad] text-lg">
        ✨
      </span>
    ),
  },
  {
    href: "/narrative-framing",
    title: "Narrative framing",
    bg: "bg-[#ffefad]", // medium Ukrainian yellow
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffe789] text-lg">
        📣
      </span>
    ),
  },
  {
    href: "/technical-framing",
    title: "Technical framing",
    bg: "bg-[#ffe789]", // stronger Ukrainian yellow
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffdf65] text-lg">
        🛠️
      </span>
    ),
  },
  {
    href: "/methodology",
    title: "Methodology",
    bg: "bg-[#ffdf65]", // deepest Ukrainian yellow in row
    Icon: () => (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7d34f] text-lg">
        📊
      </span>
    ),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <header className="flex flex-col gap-4 sm:max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Research report
          </p>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Representation and discourse of the Ukraine war
          </h1>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg">
            A visual and analytical exploration of how the Ukraine war is
            represented across digital platforms, with a focus on content type,
            violence, gamification, dehumanization, aestheticization and
            narrative framing.
          </p>
        </header>

        {/* ── 2D Visual Map ── */}
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Corpus explorer
              </p>
              <h2 className="text-lg font-semibold text-zinc-900">
                2D visual map
              </h2>
              <p className="text-sm text-zinc-600">
                CLIP embeddings of the 400-image sample projected into 2D via
                t-SNE. Drag to pan, scroll to zoom.
              </p>
            </div>
            <a
              href="/visual-map.html"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50"
            >
              Open full map ↗
            </a>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-900 shadow-md"
               style={{ height: "480px" }}>
            <iframe
              src="/visual-map.html"
              className="absolute inset-0 h-full w-full"
              title="2D visual embedding map"
              loading="lazy"
            />
          </div>
        </section>

        {/* ── Analytical section tiles ── */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map(({ href, title, Icon, bg }) => (
            <a
              key={href}
              href={href}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm ring-0 transition hover:-translate-y-1 hover:shadow-md hover:ring-1 hover:ring-zinc-200"
            >
              <div className={`mb-4 inline-flex items-center gap-3 rounded-2xl p-2 ${bg}`}>
                <Icon />
                <div className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold italic text-zinc-900 ${bg}`}>
                  {title}
                </div>
              </div>
              <p className="text-sm text-zinc-600">
                Open the analytical chapter on {title.toLowerCase()}.
              </p>
            </a>
          ))}
        </section>

        <section className="max-w-3xl space-y-4 text-sm text-zinc-600">
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            How to read this
          </h2>
          <p>
            Start anywhere: each chapter can be read on its own, but together
            they sketch a broader picture of how the war is framed and made
            visible. For readers interested in the research design, the{" "}
            <a
              href="/methodology"
              className="font-medium text-zinc-900 underline underline-offset-2"
            >
              Methodology
            </a>{" "}
            page details data sources, coding and limitations.
          </p>
        </section>
      </div>
    </div>
  );
}
