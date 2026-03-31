import Link from "next/link";

export default function ImpliedViolencePage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <header className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
            Chapter 02
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Implied violence
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            How violence is suggested, obscured or made visible through
            language, imagery and platform constraints.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Overview
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700">
            Use this page to unpack how violence appears directly versus being
            hinted at or kept off-screen. You might compare different outlet
            policies, content warnings and visual strategies, supported by
            annotated examples.
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

