"use client";

import { useState } from "react";

type Panel = { id: string; label: string; content: React.ReactNode };

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const channels = [
  { handle: "@RVvoenkor",        description: "Russian war correspondent aggregator" },
  { handle: "@rusich_army",      description: "Pro-Russian paramilitary-linked channel" },
  { handle: "@voenkorKotenok",   description: "War correspondent Y. Kotenok" },
  { handle: "@wargonzo",         description: "War correspondent S. Pegov" },
  { handle: "@donbassrealii",    description: "Donbas-focused reporting" },
  { handle: "@ZA_FROHT",        description: "Front-line reporting" },
  { handle: "@kherson_non_fake", description: "Kherson region reporting" },
  { handle: "@a_shtirlitz",      description: "Military intelligence commentary" },
  { handle: "@hyevuy_dnepr",     description: "Dnipro region coverage" },
  { handle: "@voenacher",        description: "Military analysis channel" },
];

const limitationItems = [
  {
    title: "Survivorship bias",
    body: "Messages deleted by channel administrators before scraping are absent from the corpus. The extent of post-publication deletion is unknown.",
  },
  {
    title: "Point-in-time engagement",
    body: "View counts and reactions reflect values at the moment of scraping, not final cumulative totals.",
  },
  {
    title: "Thumbnail fidelity",
    body: "Visual analysis is performed on compressed thumbnail previews rather than full-resolution media, which may limit the granularity of content classification (e.g. distinguishing specific equipment types).",
  },
  {
    title: "Sampling cap",
    body: "The 50-per-month ceiling means that in high-activity months the majority of posts are excluded. While temporal spacing preserves month-wide coverage, within-day variation may be underrepresented.",
  },
];

const panels: Panel[] = [
  {
    id: "collection",
    label: "Data collection",
    content: (
      <div className="space-y-5">
        <p className="text-sm leading-relaxed text-zinc-700">
          Data were collected from ten Russian-language Telegram channels
          associated with pro-Russian war correspondents and military
          commentators active during the Russo-Ukrainian conflict. Channels were
          selected based on their prominence in the Russian military information
          ecosystem, subscriber base and sustained posting activity throughout
          the study period:{" "}
          <span className="font-medium text-zinc-900">
            24 February 2022 – 23 February 2023
          </span>
          .
        </p>
        <p className="text-sm leading-relaxed text-zinc-700">
          Data were extracted programmatically via the Telegram API using the{" "}
          <span className="font-mono text-xs font-medium text-zinc-900">
            Telethon
          </span>{" "}
          client library (v1.36.0). Only messages containing attached media
          (photographs, videos, voice messages, documents or geolocation
          markers) were retained; text-only messages were excluded as the
          analysis centres on visual and multimedia content.
        </p>

        <div className="overflow-hidden rounded-xl border border-zinc-200">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="px-4 py-3 font-semibold text-zinc-800">
                  Channel
                </th>
                <th className="px-4 py-3 font-semibold text-zinc-800">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {channels.map((ch, i) => (
                <tr
                  key={ch.handle}
                  className={i % 2 === 0 ? "bg-white" : "bg-zinc-50"}
                >
                  <td className="px-4 py-2.5 font-mono text-xs font-medium text-[#0057b8]">
                    {ch.handle}
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600">
                    {ch.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: "sampling",
    label: "Sampling strategy",
    content: (
      <div className="space-y-5">
        <p className="text-sm leading-relaxed text-zinc-700">
          Due to the high volume of media posts — often exceeding 2,000 per
          channel per month — a{" "}
          <span className="font-medium text-zinc-900">
            systematic positional sampling strategy
          </span>{" "}
          was applied independently to each channel-month pair.
        </p>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Procedure
          </p>
          <ol className="space-y-2 text-sm leading-relaxed text-zinc-700 list-none">
            {[
              "All messages containing attached media were enumerated and ordered chronologically by publication timestamp (oldest first), producing an ordered list of M messages indexed 0 to M − 1.",
              "If M ≤ 50, all messages were retained without sampling.",
              "If M > 50, exactly 50 messages were selected using evenly spaced index interpolation.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ffd700] text-[10px] font-bold text-zinc-900">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-3 rounded-lg bg-white border border-zinc-200 px-4 py-3 font-mono text-xs text-zinc-700 space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">Sampling formula</p>
            <p>step = (M − 1) / (n − 1)   where n = 50</p>
            <p>I = {"{ round(i × step) | i ∈ {0, 1, …, n−1} }"}</p>
          </div>
        </div>

        <div className="rounded-xl border border-[#c5e0ff] bg-[#e3f0ff] p-5 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0057b8]">
            Worked example — April 2022, M = 2,400
          </p>
          <ul className="space-y-1 text-sm text-zinc-700 list-none">
            <li className="flex gap-2"><span className="text-[#0057b8]">→</span> step = 2399 / 49 ≈ 48.96</li>
            <li className="flex gap-2"><span className="text-[#0057b8]">→</span> Selected indices: {"{0, 49, 98, 147, …, 2351, 2399}"}</li>
            <li className="flex gap-2"><span className="text-[#0057b8]">→</span> 1st, 50th, 99th, 148th … 2,400th media messages retained</li>
          </ul>
        </div>

        <div className="space-y-3 text-sm text-zinc-700">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Important clarifications
          </p>
          <p>
            <span className="font-medium text-zinc-900">Positional, not temporal spacing.</span>{" "}
            The interval is computed over ordinal position in the
            chronologically sorted list, not over calendar time. This ensures
            the sample reflects the channel&apos;s actual output distribution rather
            than artificially equalising quiet and active periods.
          </p>
          <p>
            <span className="font-medium text-zinc-900">Rounding collisions.</span>{" "}
            Because indices are computed via floating-point arithmetic and
            rounded to the nearest integer, two indices could theoretically
            collapse to the same value, yielding fewer than 50 selections. In
            practice this only occurs when M is very close to 50 and the
            effect is the omission of at most one observation.
          </p>
          <p>
            <span className="font-medium text-zinc-900">No randomisation.</span>{" "}
            The method is fully deterministic: given the same ordered message
            list and sample size, the identical subset will always be selected.
            This ensures reproducibility but means the sample is not a
            probability sample in the inferential-statistics sense. Confidence
            intervals derived from it should be interpreted with caution.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "variables",
    label: "Variables captured",
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-zinc-700">
          For each sampled message the following variables were recorded and
          stored in a local SQLite relational database with deduplication
          enforced via unique constraints on the{" "}
          <span className="font-mono text-xs">(channel, message_id)</span>{" "}
          pair.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              label: "Content",
              value: "Message text / caption in original language",
            },
            {
              label: "Media metadata",
              value:
                "Type (photo, video, voice, document, geo), file size, resolution (w × h), duration (video/audio)",
            },
            {
              label: "Thumbnail",
              value:
                "Compressed image preview for subsequent computer vision analysis",
            },
            {
              label: "Engagement metrics",
              value:
                "View count, forward count, reply count, emoji reaction distribution (frequency counts per emoji)",
            },
            {
              label: "Temporal metadata",
              value: "UTC timestamp of original publication",
            },
          ].map((v) => (
            <div
              key={v.label}
              className="rounded-xl border border-zinc-200 bg-white p-4 space-y-1"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {v.label}
              </p>
              <p className="text-sm text-zinc-700">{v.value}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "limitations",
    label: "Limitations",
    content: (
      <div className="space-y-3">
        {limitationItems.map((item) => (
          <div
            key={item.title}
            className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-4"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ffd700] text-[10px] font-bold text-zinc-900">
              !
            </span>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
              <p className="text-sm leading-relaxed text-zinc-600">{item.body}</p>
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
    <div className="divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      {panels.map((panel) => {
        const isOpen = open === panel.id;
        return (
          <div key={panel.id}>
            <button
              onClick={() => setOpen(isOpen ? null : panel.id)}
              className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-zinc-50"
            >
              <span className="text-sm font-semibold text-zinc-900">
                {panel.label}
              </span>
              <Chevron open={isOpen} />
            </button>
            {isOpen && (
              <div className="border-t border-zinc-100 px-6 py-5">
                {panel.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
