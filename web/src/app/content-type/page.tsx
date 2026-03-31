import Link from "next/link";

export default function ContentTypePage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <header className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
            Chapter 01
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Content type
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            How different formats, genres and platform-native features shape
            how the Ukraine war appears in feeds and interfaces.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Overview
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700">
            Use this page to present your main findings on content types
            (e.g. short-form video, livestreams, memes, infographics, long-form
            explainers). You can structure the analysis as 3–5 short sections,
            each combining a key observation with one or two illustrative
            examples or visuals.
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

