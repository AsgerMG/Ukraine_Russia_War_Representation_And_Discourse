import Link from "next/link";

export default function TechnicalFramingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <header className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
            Chapter 07
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Technical framing
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            How interface design, recommendation systems and platform affordances
            structure what can be seen, said and shared about the war.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Overview
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700">
            Use this page to connect your discourse findings to technical
            infrastructures: timelines, algorithms, moderation tools and
            monetisation features. You can combine screenshots or simplified
            diagrams with short analytic notes.
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

