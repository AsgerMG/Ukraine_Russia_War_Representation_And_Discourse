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

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/content-type", title: "Content type" },
            { href: "/implied-violence", title: "Implied violence" },
            { href: "/gamification", title: "Gamification" },
            { href: "/dehumanization", title: "Dehumanization" },
            { href: "/aestheticization", title: "Aestheticization" },
            { href: "/narrative-framing", title: "Narrative framing" },
            { href: "/technical-framing", title: "Technical framing" },
            { href: "/methodology", title: "Methodology" },
          ].map((section) => (
            <a
              key={section.href}
              href={section.href}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-6 h-10 w-10 rounded-xl bg-zinc-100" />
              <div className="space-y-1">
                <h2 className="text-base font-medium">{section.title}</h2>
                <p className="text-sm text-zinc-600">
                  Open the analytical chapter on {section.title.toLowerCase()}.
                </p>
              </div>
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
