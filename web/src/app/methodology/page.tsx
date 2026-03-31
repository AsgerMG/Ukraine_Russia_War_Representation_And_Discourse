import Link from "next/link";

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <header className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
            Methods
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Methodology
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            A transparent account of the corpus, coding scheme, analytical
            choices and limitations behind this report.
          </p>
        </header>

        <section className="space-y-4 text-sm leading-relaxed text-zinc-700">
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Corpus and data
          </h2>
          <p>
            Use this section to describe what you collected: platforms,
            outlets, time period, languages, sampling strategy and any
            exclusions. Aim for enough detail that the study could be
            understood and, where possible, replicated.
          </p>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-zinc-700">
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Analytical framework
          </h2>
          <p>
            Here you can outline your discourse or media analysis framework,
            the categories used (content type, implied violence, gamification,
            dehumanization, aestheticization, narrative framing, technical
            framing) and how they were operationalised.
          </p>
        </section>

        <section className="space-y-4 text-sm leading-relaxed text-zinc-700">
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Procedures, reliability and limitations
          </h2>
          <p>
            Use this part for coder training, intercoder reliability (if
            applicable), tools and software, and a short reflection on ethical
            considerations and constraints.
          </p>
        </section>

        <footer className="border-t border-zinc-200 pt-6 text-sm text-zinc-500">
          <Link href="/" className="underline underline-offset-2">
            Back to overview
          </Link>
        </footer>
      </main>
    </div>
  );
}

