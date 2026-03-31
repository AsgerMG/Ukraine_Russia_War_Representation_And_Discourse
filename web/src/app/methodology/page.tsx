import Link from "next/link";
import DataCollectionAccordion from "./DataCollectionAccordion";

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex max-w-4xl flex-col gap-12 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
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

        {/* ── Data collection ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0057b8] text-xs font-bold text-white">
              1
            </span>
            <h2 className="text-base font-semibold text-zinc-900">
              Data collection
            </h2>
          </div>
          <DataCollectionAccordion />
        </section>

        {/* ── Analytical framework ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ffd700] text-xs font-bold text-zinc-900">
              2
            </span>
            <h2 className="text-base font-semibold text-zinc-900">
              Analytical framework
            </h2>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm leading-relaxed text-zinc-700 shadow-sm space-y-3">
            <p>
              Here you can outline your discourse or media analysis framework,
              the categories used (content type, implied violence, gamification,
              dehumanization, aestheticization, narrative framing, technical
              framing) and how they were operationalised.
            </p>
          </div>
        </section>

        {/* ── Procedures, reliability and limitations ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0057b8] text-xs font-bold text-white">
              3
            </span>
            <h2 className="text-base font-semibold text-zinc-900">
              Procedures, reliability and limitations
            </h2>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm leading-relaxed text-zinc-700 shadow-sm space-y-3">
            <p>
              Use this part for coder training, intercoder reliability (if
              applicable), tools and software, and a short reflection on ethical
              considerations and constraints.
            </p>
          </div>
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
