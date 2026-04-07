"use client";

import { useState } from "react";

type Panel = { id: string; label: string; content: React.ReactNode };

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      style={{
        width: "16px", height: "16px", flexShrink: 0,
        color: "var(--text-muted)",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s",
      }}
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
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          Data were collected from ten Russian-language Telegram channels
          associated with pro-Russian war correspondents and military
          commentators active during the Russo-Ukrainian conflict. Channels were
          selected based on their prominence in the Russian military information
          ecosystem, subscriber base and sustained posting activity throughout
          the study period:{" "}
          <span style={{ color: "var(--accent)", fontWeight: 500 }}>
            24 February 2022 – 23 February 2023
          </span>
          .
        </p>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          Data were extracted programmatically via the Telegram API using the{" "}
          <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--accent)" }}>
            Telethon
          </span>{" "}
          client library (v1.36.0). Only messages containing attached media
          (photographs, videos, voice messages, documents or geolocation
          markers) were retained; text-only messages were excluded as the
          analysis centres on visual and multimedia content.
        </p>

        <div style={{ overflowX: "auto", borderRadius: "10px", border: "1px solid var(--border)" }}>
          <table style={{ width: "100%", textAlign: "left", fontSize: "0.85rem", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface2)" }}>
                <th style={{ padding: "10px 16px", fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-dim)", fontWeight: 500 }}>
                  Channel
                </th>
                <th style={{ padding: "10px 16px", fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-dim)", fontWeight: 500 }}>
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {channels.map((ch, i) => (
                <tr key={ch.handle} style={{ background: i % 2 === 0 ? "transparent" : "var(--surface2)", borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "9px 16px", fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 500, color: "var(--accent)" }}>
                    {ch.handle}
                  </td>
                  <td style={{ padding: "9px 16px", fontSize: "0.85rem", color: "var(--text-dim)" }}>
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
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          Due to the high volume of media posts — often exceeding 2,000 per
          channel per month — a{" "}
          <span style={{ color: "var(--accent)", fontWeight: 500 }}>
            systematic positional sampling strategy
          </span>{" "}
          was applied independently to each channel-month pair.
        </p>

        <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "20px" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "12px" }}>
            Procedure
          </p>
          <ol style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              "All messages containing attached media were enumerated and ordered chronologically by publication timestamp (oldest first), producing an ordered list of M messages indexed 0 to M − 1.",
              "If M ≤ 50, all messages were retained without sampling.",
              "If M > 50, exactly 50 messages were selected using evenly spaced index interpolation.",
            ].map((step, i) => (
              <li key={i} style={{ display: "flex", gap: "12px", fontSize: "0.875rem", color: "var(--text-dim)", lineHeight: 1.7 }}>
                <span style={{ display: "flex", width: "20px", height: "20px", flexShrink: 0, alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "var(--accent)", fontSize: "10px", fontWeight: 700, color: "var(--bg)", marginTop: "2px" }}>
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <div style={{ marginTop: "16px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px 16px", fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)" }}>
            <p style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px" }}>Sampling formula</p>
            <p>step = (M − 1) / (n − 1)   where n = 50</p>
            <p style={{ marginTop: "4px" }}>I = {"{ round(i × step) | i ∈ {0, 1, …, n−1} }"}</p>
          </div>
        </div>

        <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "20px" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "10px" }}>
            Worked example — April 2022, M = 2,400
          </p>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
            <li style={{ display: "flex", gap: "8px", fontSize: "0.875rem", color: "var(--text-dim)" }}><span style={{ color: "var(--accent)" }}>→</span> step = 2399 / 49 ≈ 48.96</li>
            <li style={{ display: "flex", gap: "8px", fontSize: "0.875rem", color: "var(--text-dim)" }}><span style={{ color: "var(--accent)" }}>→</span> Selected indices: {"{0, 49, 98, 147, …, 2351, 2399}"}</li>
            <li style={{ display: "flex", gap: "8px", fontSize: "0.875rem", color: "var(--text-dim)" }}><span style={{ color: "var(--accent)" }}>→</span> 1st, 50th, 99th, 148th … 2,400th media messages retained</li>
          </ul>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-dim)" }}>
            Important clarifications
          </p>
          {[
            { head: "Positional, not temporal spacing.", body: "The interval is computed over ordinal position in the chronologically sorted list, not over calendar time. This ensures the sample reflects the channel\u2019s actual output distribution rather than artificially equalising quiet and active periods." },
            { head: "Rounding collisions.", body: "Because indices are computed via floating-point arithmetic and rounded to the nearest integer, two indices could theoretically collapse to the same value, yielding fewer than 50 selections. In practice this only occurs when M is very close to 50 and the effect is the omission of at most one observation." },
            { head: "No randomisation.", body: "The method is fully deterministic: given the same ordered message list and sample size, the identical subset will always be selected. This ensures reproducibility but means the sample is not a probability sample in the inferential-statistics sense. Confidence intervals derived from it should be interpreted with caution." },
          ].map(item => (
            <p key={item.head} style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
              <span style={{ color: "var(--text)", fontWeight: 500 }}>{item.head}</span>{" "}{item.body}
            </p>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "variables",
    label: "Variables captured",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-dim)" }}>
          For each sampled message the following variables were recorded and
          stored in a local SQLite relational database with deduplication
          enforced via unique constraints on the{" "}
          <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--accent)" }}>(channel, message_id)</span>{" "}
          pair.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
          {[
            { label: "Content", value: "Message text / caption in original language" },
            { label: "Media metadata", value: "Type (photo, video, voice, document, geo), file size, resolution (w × h), duration (video/audio)" },
            { label: "Thumbnail", value: "Compressed image preview for subsequent computer vision analysis" },
            { label: "Engagement metrics", value: "View count, forward count, reply count, emoji reaction distribution (frequency counts per emoji)" },
            { label: "Temporal metadata", value: "UTC timestamp of original publication" },
          ].map((v) => (
            <div key={v.label} style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "16px" }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "6px" }}>
                {v.label}
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--text-dim)", lineHeight: 1.6 }}>{v.value}</p>
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
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {limitationItems.map((item) => (
          <div key={item.title} style={{ display: "flex", gap: "16px", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "16px" }}>
            <span style={{ display: "flex", width: "22px", height: "22px", flexShrink: 0, alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "var(--red)", fontSize: "11px", fontWeight: 700, color: "#fff", marginTop: "1px" }}>
              !
            </span>
            <div>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)", marginBottom: "4px" }}>{item.title}</p>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--text-dim)" }}>{item.body}</p>
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
    <div style={{ border: "1px solid var(--border)", borderRadius: "14px", overflow: "hidden", background: "var(--surface)" }}>
      {panels.map((panel, idx) => {
        const isOpen = open === panel.id;
        return (
          <div key={panel.id} style={{ borderTop: idx > 0 ? "1px solid var(--border)" : undefined }}>
            <button
              onClick={() => setOpen(isOpen ? null : panel.id)}
              style={{
                display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between",
                padding: "16px 24px", textAlign: "left",
                background: "transparent", border: "none", cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--surface2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontFamily: "var(--sans)", fontSize: "0.9rem", fontWeight: 500, color: "var(--text)" }}>
                {panel.label}
              </span>
              <Chevron open={isOpen} />
            </button>
            {isOpen && (
              <div style={{ borderTop: "1px solid var(--border)", padding: "20px 24px" }}>
                {panel.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
