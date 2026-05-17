"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const scoreDistribution = [
  { score: 0, count: 2145 }, { score: 1, count: 2765 }, { score: 2, count: 2946 },
  { score: 3, count: 2767 }, { score: 4, count: 3212 }, { score: 5, count: 1137 },
  { score: 6, count: 5135 }, { score: 7, count: 1936 }, { score: 8, count: 2942 },
  { score: 9, count: 480 }, { score: 10, count: 29 },
];

const monthly = [
  { month: "2022-02", mean: 3.809, count: 440, high_pct: 32.7 }, { month: "2022-03", mean: 3.901, count: 494, high_pct: 34.8 },
  { month: "2022-04", mean: 3.996, count: 543, high_pct: 34.8 }, { month: "2022-05", mean: 3.543, count: 541, high_pct: 29.2 },
  { month: "2022-06", mean: 4.089, count: 542, high_pct: 40.2 }, { month: "2022-07", mean: 4.246, count: 544, high_pct: 41.7 },
  { month: "2022-08", mean: 4.571, count: 548, high_pct: 46.7 }, { month: "2022-09", mean: 4.328, count: 545, high_pct: 43.5 },
  { month: "2022-10", mean: 4.353, count: 547, high_pct: 43.3 }, { month: "2022-11", mean: 4.355, count: 544, high_pct: 44.3 },
  { month: "2022-12", mean: 4.265, count: 548, high_pct: 41.8 }, { month: "2023-01", mean: 4.635, count: 546, high_pct: 49.1 },
  { month: "2023-02", mean: 4.844, count: 539, high_pct: 54.4 }, { month: "2023-03", mean: 4.47, count: 544, high_pct: 46.7 },
  { month: "2023-04", mean: 4.22, count: 543, high_pct: 41.6 }, { month: "2023-05", mean: 4.156, count: 542, high_pct: 39.9 },
  { month: "2023-06", mean: 4.348, count: 547, high_pct: 42.8 }, { month: "2023-07", mean: 4.426, count: 548, high_pct: 44.3 },
  { month: "2023-08", mean: 4.386, count: 547, high_pct: 43.9 }, { month: "2023-09", mean: 4.334, count: 548, high_pct: 43.4 },
  { month: "2023-10", mean: 4.483, count: 548, high_pct: 46.2 }, { month: "2023-11", mean: 4.189, count: 544, high_pct: 40.4 },
  { month: "2023-12", mean: 4.273, count: 547, high_pct: 41.7 }, { month: "2024-01", mean: 4.344, count: 547, high_pct: 44.2 },
  { month: "2024-02", mean: 4.564, count: 547, high_pct: 47.9 }, { month: "2024-03", mean: 4.317, count: 546, high_pct: 42.0 },
  { month: "2024-04", mean: 4.115, count: 544, high_pct: 40.6 }, { month: "2024-05", mean: 4.062, count: 543, high_pct: 38.7 },
  { month: "2024-06", mean: 4.261, count: 544, high_pct: 41.9 }, { month: "2024-07", mean: 4.259, count: 546, high_pct: 42.1 },
  { month: "2024-08", mean: 4.399, count: 547, high_pct: 44.2 }, { month: "2024-09", mean: 4.481, count: 548, high_pct: 46.0 },
  { month: "2024-10", mean: 4.214, count: 546, high_pct: 41.4 }, { month: "2024-11", mean: 4.337, count: 545, high_pct: 43.7 },
  { month: "2024-12", mean: 4.263, count: 545, high_pct: 42.4 }, { month: "2025-01", mean: 4.215, count: 543, high_pct: 41.8 },
  { month: "2025-02", mean: 4.386, count: 543, high_pct: 44.8 }, { month: "2025-03", mean: 4.194, count: 541, high_pct: 41.4 },
  { month: "2025-04", mean: 4.112, count: 540, high_pct: 40.2 }, { month: "2025-05", mean: 4.238, count: 542, high_pct: 42.6 },
  { month: "2025-06", mean: 4.309, count: 543, high_pct: 43.3 }, { month: "2025-07", mean: 4.271, count: 543, high_pct: 42.5 },
  { month: "2025-08", mean: 4.196, count: 541, high_pct: 41.0 }, { month: "2025-09", mean: 4.184, count: 540, high_pct: 40.6 },
  { month: "2025-10", mean: 4.227, count: 541, high_pct: 41.6 }, { month: "2025-11", mean: 4.158, count: 539, high_pct: 40.3 },
  { month: "2025-12", mean: 4.201, count: 540, high_pct: 41.4 }, { month: "2026-01", mean: 4.312, count: 542, high_pct: 43.5 },
  { month: "2026-02", mean: 4.289, count: 538, high_pct: 42.6 },
];

const channels = [
  { channel: "donbassrealii", title: "Донбасс Реалии", side: "UA", mean: 4.73, count: 2513, high: 49.7 },
  { channel: "kherson_non_fake", title: "ХЕРСОН: Non Fake", side: "UA", mean: 4.59, count: 2514, high: 48.4 },
  { channel: "voenacher", title: "Повёрнутые на войне", side: "RU", mean: 4.28, count: 2583, high: 41.3 },
  { channel: "voenkorKotenok", title: "Военкор Котенок", side: "RU", mean: 4.26, count: 2578, high: 40.2 },
  { channel: "rusich_army", title: "АРХАНГЕЛ СПЕЦНАЗА", side: "RU", mean: 4.21, count: 2559, high: 35.8 },
  { channel: "a_shtirlitz", title: "Анатолій Штефан Штірліц", side: "UA", mean: 4.16, count: 2449, high: 41.7 },
  { channel: "RVvoenkor", title: "Военкоры Русской Весны", side: "RU", mean: 4.09, count: 3785, high: 38.2 },
  { channel: "hyevuy_dnepr", title: "ХДніпро", side: "UA", mean: 4.06, count: 2574, high: 40.8 },
  { channel: "ZA_FROHT", title: "ЗАПОРОЖСКИЙ ФРОНТ", side: "UA", mean: 4.03, count: 2485, high: 36.7 },
  { channel: "wargonzo", title: "WarGonzo", side: "RU", mean: 4.01, count: 2576, high: 40.5 },
];

const contentByChannel = [
  { channel: "wargonzo", side: "RU", destruction: 4.0, explosion: 2.4, drone: 1.8, casualty: 0.6, gruz200: 0.0, propaganda: 1.8, weapons: 7.0, combat: 14.4, political: 48.1, civilian: 5.9, aftermath: 1.1, other: 12.9 },
  { channel: "rusich_army", side: "RU", destruction: 5.8, explosion: 2.6, drone: 10.6, casualty: 1.9, gruz200: 0.0, propaganda: 5.2, weapons: 14.5, combat: 21.8, political: 18.1, civilian: 2.9, aftermath: 1.3, other: 15.3 },
  { channel: "voenacher", side: "RU", destruction: 12.1, explosion: 7.1, drone: 10.9, casualty: 2.0, gruz200: 0.0, propaganda: 1.5, weapons: 13.9, combat: 9.1, political: 18.4, civilian: 5.0, aftermath: 2.2, other: 17.8 },
  { channel: "voenkorKotenok", side: "RU", destruction: 16.3, explosion: 7.2, drone: 8.6, casualty: 1.5, gruz200: 0.0, propaganda: 1.7, weapons: 7.5, combat: 8.0, political: 21.8, civilian: 5.7, aftermath: 3.7, other: 18.1 },
  { channel: "RVvoenkor", side: "RU", destruction: 10.5, explosion: 8.4, drone: 9.0, casualty: 1.8, gruz200: 0.0, propaganda: 0.8, weapons: 7.7, combat: 10.2, political: 29.6, civilian: 5.1, aftermath: 2.6, other: 14.4 },
  { channel: "donbassrealii", side: "UA", destruction: 24.6, explosion: 4.2, drone: 2.6, casualty: 1.4, gruz200: 0.0, propaganda: 4.4, weapons: 5.2, combat: 9.6, political: 24.7, civilian: 9.6, aftermath: 5.6, other: 7.9 },
  { channel: "kherson_non_fake", side: "UA", destruction: 36.3, explosion: 7.3, drone: 2.4, casualty: 1.6, gruz200: 0.0, propaganda: 2.1, weapons: 4.2, combat: 4.6, political: 15.8, civilian: 6.4, aftermath: 3.7, other: 15.6 },
  { channel: "hyevuy_dnepr", side: "UA", destruction: 23.6, explosion: 5.2, drone: 1.5, casualty: 2.1, gruz200: 0.0, propaganda: 1.0, weapons: 3.4, combat: 4.9, political: 19.6, civilian: 14.7, aftermath: 7.2, other: 16.8 },
  { channel: "a_shtirlitz", side: "UA", destruction: 3.5, explosion: 2.8, drone: 1.4, casualty: 3.0, gruz200: 7.7, propaganda: 17.0, weapons: 3.8, combat: 7.7, political: 32.3, civilian: 9.0, aftermath: 1.5, other: 10.0 },
  { channel: "ZA_FROHT", side: "UA", destruction: 9.0, explosion: 6.4, drone: 13.8, casualty: 1.4, gruz200: 0.0, propaganda: 2.7, weapons: 10.6, combat: 12.7, political: 17.4, civilian: 6.1, aftermath: 1.4, other: 18.4 },
];

const contentKeys = ["destruction", "explosion", "drone", "casualty", "gruz200", "propaganda", "weapons", "combat", "political", "civilian", "aftermath", "other"] as const;

const catStats = {
  destruction: { count: 3885, mean: 6.49, high_pct: 78.4 },
  explosion: { count: 1477, mean: 7.15, high_pct: 97.0 },
  drone: { count: 1694, mean: 6.80, high_pct: 90.5 },
  casualty: { count: 455, mean: 7.78, high_pct: 83.3 },
  gruz200: { count: 388, mean: 6.06, high_pct: 83.0 },
  propaganda: { count: 840, mean: 5.30, high_pct: 58.3 },
  weapons: { count: 2105, mean: 4.49, high_pct: 32.1 },
  combat: { count: 2775, mean: 4.17, high_pct: 26.0 },
};

const categories = [
  { id: "destruction", name: "Destruction & Structural Damage", desc: "Collapsed buildings, shelled apartment blocks, burned vehicles, cratered streets. The largest category — violence without bodies, infrastructure as victim." },
  { id: "explosion", name: "Explosions in Progress", desc: "Active fireballs, muzzle flashes, smoke plumes. Often blurry and low-resolution, filmed in the moment. The highest mean violence score of any category (7.15)." },
  { id: "drone", name: "Drone Strikes", desc: "Aerial targeting footage with HUD overlays, crosshairs, telemetry. A distinctly gamified visual register that makes killing resemble a video game interface." },
  { id: "casualty", name: "Direct Casualties", desc: "Bodies, blood, visible injury. The rarest category in raw numbers but the most extreme in violence score (mean 7.78). 29 of the 32 score-10 images are here." },
  { id: "gruz200", name: "Груз 200 Memorial Memes", desc: "Portrait collages of soldiers overlaid with flames and the death code Груз 200 (Cargo 200). Implicit, aestheticized death — a visual genre unique to Russian Telegram culture." },
  { id: "propaganda", name: "Propaganda & Death Symbolism", desc: "Composite imagery implying violence without depicting it: nooses, flames, dehumanizing text, militant graphics. Contains two of the three score-10 images that show no bodies." },
  { id: "weapons", name: "Weapons & Ordnance", desc: "Close-ups of missiles, munitions with handwritten Cyrillic dedications, firing tanks, drone part assemblies. Potential violence rather than enacted — yet the scale of lethality is explicit." },
  { id: "combat", name: "Combat Footage & Soldier POV", desc: "Active firefights, trench warfare, soldiers aiming, artillery firing. The first-person register of war — immersive, immediate." },
] as const;

const selectedImages = {
  destruction: [
    { f: "rusich_army_11228.jpg", v: 9, ch: "rusich_army", date: "2023-10-08", views: 1634464, desc: "Graphic composite over attack map — territorial bombardment illustrated." },
    { f: "RVvoenkor_47049.jpg", v: 9, ch: "RVvoenkor", date: "2023-06-10", views: 574746, desc: "Split-screen of armored vehicles amid destroyed terrain." },
    { f: "voenacher_43679.jpg", v: 9, ch: "voenacher", date: "2023-04-29", views: 370117, desc: "Interior of a destroyed residential building — collapsed walls, rubble." },
  ],
  explosion: [
    { f: "RVvoenkor_77193.jpg", v: 9, ch: "RVvoenkor", date: "2024-09-18", views: 613135, desc: "Night scene — large fire and bright flames from structures, thick smoke." },
    { f: "voenacher_57337.jpg", v: 9, ch: "voenacher", date: "2023-12-03", views: 340723, desc: "Violent blast engulfing a vehicle, bright orange-white explosion." },
    { f: "wargonzo_16044.jpg", v: 9, ch: "wargonzo", date: "2023-10-26", views: 242765, desc: "Burning smoke-filled industrial corridor — fire consuming the interior." },
  ],
  drone: [
    { f: "rusich_army_13035.jpg", v: 9, ch: "rusich_army", date: "2024-02-06", views: 675429, desc: "Infrared night-vision drone view — targeting reticle on subjects below." },
    { f: "RVvoenkor_51674.jpg", v: 9, ch: "RVvoenkor", date: "2023-08-21", views: 512310, desc: "Night-vision aerial over vegetation and road — HUD targeting indicators." },
    { f: "voenacher_46161.jpg", v: 9, ch: "voenacher", date: "2023-06-08", views: 400284, desc: "Aerial rural landscape — trajectory trail visible, impact site marked." },
  ],
  casualty: [
    { f: "rusich_army_13799.jpg", v: 10, ch: "rusich_army", date: "2024-03-23", views: 982507, desc: "Multi-panel attack sequence collage with graphic injury close-ups. 982K views." },
    { f: "RVvoenkor_23474.jpg", v: 10, ch: "RVvoenkor", date: "2022-08-19", views: 670033, desc: "Multiple bodies on pavement, scattered tactical gear after an assault." },
    { f: "voenkorKotenok_35266.jpg", v: 10, ch: "voenkorKotenok", date: "2022-04-24", views: 433866, desc: "Two deceased individuals on dry straw, blood visible on clothing." },
  ],
  gruz200: [
    { f: "a_shtirlitz_29204.jpg", v: 9, ch: "a_shtirlitz", date: "2024-03-06", views: 96246, desc: "Collage of portrait photos of uniformed men — soldiers memorialized as KIA." },
    { f: "donbassrealii_9649.jpg", v: 6, ch: "donbassrealii", date: "2022-08-08", views: 1370, desc: "Stacked cardboard boxes marked Груз 200 — the Soviet code for fallen soldiers." },
    { f: "a_shtirlitz_19686.jpg", v: 8, ch: "a_shtirlitz", date: "2022-07-12", views: 176530, desc: "Edited composite portrait of uniformed soldier — stylized memorial graphic." },
  ],
  propaganda: [
    { f: "kherson_non_fake_1952.jpg", v: 10, ch: "kherson_non_fake", date: "2022-07-13", views: 11765, desc: "Man in suit positioned under a noose in a war-damaged setting. Score 10." },
    { f: "rusich_army_1439.jpg", v: 10, ch: "rusich_army", date: "2022-03-31", views: 1787, desc: "Social media post with explicit death threats and dehumanizing language. Score 10." },
    { f: "ZA_FROHT_51639.jpg", v: 9, ch: "ZA_FROHT", date: "2026-02-22", views: 10657, desc: "Stylized propaganda scene: Russian soldier in foreground, explosions behind." },
  ],
  weapons: [
    { f: "rusich_army_15371.jpg", v: 9, ch: "rusich_army", date: "2024-06-23", views: 365336, desc: "Tabletop covered with drone parts and quadcopter frames — FPV drone assembly." },
    { f: "hyevuy_dnepr_56016.jpg", v: 9, ch: "hyevuy_dnepr", date: "2023-07-08", views: 150652, desc: "Soldiers operating a large artillery piece in a field — crew visible." },
    { f: "RVvoenkor_8007.jpg", v: 8, ch: "RVvoenkor", date: "2022-04-14", views: 307173, desc: "Tabletop with multiple handguns and tactical equipment — seized or displayed." },
  ],
  combat: [
    { f: "voenacher_39395.jpg", v: 9, ch: "voenacher", date: "2023-02-11", views: 355827, desc: "Two self-propelled guns firing on a snowy wooded hillside — large smoke plumes." },
    { f: "wargonzo_14716.jpg", v: 9, ch: "wargonzo", date: "2023-08-30", views: 278296, desc: "Close dynamic scene — soldier aiming weapon amid smoke and debris." },
    { f: "kherson_non_fake_22751.jpg", v: 9, ch: "kherson_non_fake", date: "2025-08-03", views: 76316, desc: "Helmeted soldier aiming scoped rifle — active engagement position." },
  ],
};

const extremeImages = [
  { f: "rusich_army_13799.jpg", v: 10, ch: "rusich_army", date: "2024-03-23", views: 982507, ct: "casualty", desc: "Multi-panel attack sequence with graphic injury close-ups. 982K views." },
  { f: "RVvoenkor_23474.jpg", v: 10, ch: "RVvoenkor", date: "2022-08-19", views: 670033, ct: "casualty", desc: "Multiple bodies on pavement with scattered military gear." },
  { f: "RVvoenkor_18875.jpg", v: 10, ch: "RVvoenkor", date: "2022-07-08", views: 646727, ct: "casualty", desc: "Two deceased soldiers in tall vegetation, visible facial trauma." },
  { f: "rusich_army_7242.jpg", v: 10, ch: "rusich_army", date: "2023-01-14", views: 597117, ct: "casualty", desc: "Multiple soldiers lying in rows — aftermath of combat assault." },
  { f: "RVvoenkor_76401.jpg", v: 10, ch: "RVvoenkor", date: "2024-09-05", views: 541248, ct: "casualty", desc: "Several bodies in wooded brush, prominent head injuries." },
  { f: "voenacher_27355.jpg", v: 10, ch: "voenacher", date: "2022-08-17", views: 393103, ct: "casualty", desc: "Charred body amid burned vegetation — aftermath of explosion." },
];

const videoEmbeds = [
  { url: "https://t.me/rusich_army/12698", cat: "explosion", ch: "rusich_army", date: "2024-01-15", views: 1319864, desc: "Massive nighttime fireball — the most-viewed video in the corpus at 1.3M views." },
  { url: "https://t.me/rusich_army/15868", cat: "drone strike", ch: "rusich_army", date: "2024-07-17", views: 629791, desc: "Drone targeting display: aerial view of strike zone with HUD overlay and telemetry data." },
  { url: "https://t.me/RVvoenkor/41549", cat: "drone strike", ch: "RVvoenkor", date: "2023-03-28", views: 542245, desc: "Aerial drone view through smoke over a destroyed landscape — rectangular targeting reticle." },
  { url: "https://t.me/RVvoenkor/77233", cat: "destruction", ch: "RVvoenkor", date: "2024-09-18", views: 579369, desc: "Burning armored vehicle engulfed in flames and thick smoke on the battlefield." },
  { url: "https://t.me/a_shtirlitz/26529", cat: "combat", ch: "a_shtirlitz", date: "2023-07-15", views: 200940, desc: "Two camouflaged soldiers in active combat position — crouched over dark soil." },
  { url: "https://t.me/wargonzo/9040", cat: "weapons", ch: "wargonzo", date: "2022-11-04", views: 496648, desc: "Ship at sea — large vertical flame from a weapon launcher. Naval strike footage." },
];

const viewsByScore = [
  { score: 0, mean_views: 172597 }, { score: 1, mean_views: 194424 }, { score: 2, mean_views: 205720 },
  { score: 3, mean_views: 213852 }, { score: 4, mean_views: 220289 }, { score: 5, mean_views: 207208 },
  { score: 6, mean_views: 207142 }, { score: 7, mean_views: 188380 }, { score: 8, mean_views: 172693 },
  { score: 9, mean_views: 176454 }, { score: 10, mean_views: 303455 },
];

const tooltipStyle = {
  background: "#08090b",
  border: "1px solid rgba(246,243,235,0.18)",
  borderRadius: 12,
  color: "#f6f3eb",
};

function ReportSection({
  number,
  title,
  desc,
  children,
}: {
  number: string;
  title: ReactNode;
  desc: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-6">
        <p className="kicker">{number}</p>
        <h2 className="mt-3 max-w-3xl font-serif text-[clamp(2rem,7vw,4rem)] font-bold leading-none tracking-[-0.035em] text-[color:var(--text)]">
          {title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--text-dim)]">{desc}</p>
      </div>
      {children}
    </section>
  );
}

function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-3xl border border-[color:var(--border)] bg-black/35 p-4 sm:p-5">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--text-muted)]">{title}</p>
      {children}
    </article>
  );
}

function Callout({ label, children }: { label: string; children: ReactNode }) {
  return (
    <aside className="rounded-3xl border border-[color:var(--ukraine-blue)]/60 bg-[color:var(--surface)] p-5 sm:p-6">
      <p className="kicker text-[color:var(--ukraine-yellow)]">{label}</p>
      <div className="mt-3 text-base leading-8 text-[color:var(--text-dim)]">{children}</div>
    </aside>
  );
}

function formatViews(views: number) {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${Math.round(views / 1000)}K`;
  return `${views}`;
}

export default function ViolenceCharts() {
  return (
    <div className="space-y-14">
      <section className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--panel)] p-5 sm:p-8">
        <p className="kicker">War imagery on Telegram · 2022-2026</p>
        <h2 className="mt-5 font-serif text-[clamp(3rem,12vw,7rem)] font-bold leading-none tracking-[-0.05em] text-[color:var(--text)]">
          Frontline violence
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--text-dim)]">
          A corpus analysis of 24.000+ images and video thumbnails scraped from 10 Telegram war channels — five Russian, five Ukrainian — spanning the full-scale invasion from February 24, 2022 to February 24, 2026. Each image was annotated by AI across multiple dimensions. This interactive companion isolates the violence dimension.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-4">
          {[
            ["24.000+", "Images analysed"],
            ["41%", "Explicitly violent"],
            ["4.23", "Mean violence score"],
            ["4 yrs", "Timespan"],
          ].map(([value, label]) => (
            <div className="rounded-2xl border border-[color:var(--border)] bg-black/25 p-4" key={label}>
              <p className="font-serif text-3xl font-bold text-[color:var(--text)]">{value}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <ReportSection
        number="01 / 07"
        title={<>How violent is the corpus?</>}
        desc={<>Each image was scored on implied violence from 0 (none) to 10 (maximum). The distribution reveals a striking bimodal pattern — and a remarkable finding: <strong>41 in every 100 images</strong> score 6 or above.</>}
      >
        <ChartCard title="Score distribution — full 24.000+ image corpus">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreDistribution}>
                <CartesianGrid stroke="rgba(246,243,235,0.12)" vertical={false} />
                <XAxis dataKey="score" tick={{ fill: "#b8b2a7", fontSize: 12 }} />
                <YAxis tick={{ fill: "#b8b2a7", fontSize: 12 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {scoreDistribution.map((row) => (
                    <Cell key={row.score} fill={row.score >= 6 ? "#ffdd00" : "#0057b7"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <Callout label="Key finding">
          <p><strong>41.0% of all images score &gt;= 6</strong> — classified as explicitly violent. The distribution is notably bimodal, clustering around scores 1-4 and then spiking again at 6 and 8. Score 5 forms a curious valley — suggesting the annotation model treated it as a threshold rather than a midpoint. Only <strong>32 images reach the maximum score of 10</strong>, and 480 score 9.</p>
        </Callout>
      </ReportSection>

      <ReportSection
        number="02 / 07"
        title={<>Four years of violence</>}
        desc="Monthly mean violence score across the full 48-month period. Does the visual register of war intensify over time — or does it settle into a rhythm?"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <ChartCard title="Monthly mean violence score · Feb 2022 - Feb 2026">
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthly}>
                  <CartesianGrid stroke="rgba(246,243,235,0.12)" />
                  <XAxis dataKey="month" tick={{ fill: "#b8b2a7", fontSize: 10 }} interval={5} />
                  <YAxis domain={[3.3, 5]} tick={{ fill: "#b8b2a7", fontSize: 12 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="mean" stroke="#ffdd00" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          <ChartCard title="% of images scoring >= 6 — per month">
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthly}>
                  <CartesianGrid stroke="rgba(246,243,235,0.12)" />
                  <XAxis dataKey="month" tick={{ fill: "#b8b2a7", fontSize: 10 }} interval={5} />
                  <YAxis domain={[25, 58]} tick={{ fill: "#b8b2a7", fontSize: 12 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="high_pct" stroke="#0057b7" fill="#0057b7" fillOpacity={0.45} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
        <Callout label="Reading the timeline">
          <p>The corpus begins on <strong>February 24, 2022</strong> — the first day of the full-scale invasion. Early months show moderate violence that rises and stabilises. Peaks correlate with major offensives and counteroffensives. The visual grammar of the war becomes increasingly entrenched over time.</p>
        </Callout>
      </ReportSection>

      <ReportSection
        number="03 / 07"
        title={<>Russian vs. Ukrainian channels</>}
        desc="Ten channels — five on each side of the conflict. The comparison yields a counterintuitive result."
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <ChartCard title="Mean violence by channel">
            <div className="space-y-3">
              {channels.map((channel) => (
                <div key={channel.channel}>
                  <div className="mb-1 flex items-center justify-between gap-3 font-mono text-xs">
                    <span className="text-[color:var(--text)]">{channel.channel}</span>
                    <span className="text-[color:var(--text-muted)]">{channel.mean.toFixed(2)} mean · {channel.high.toFixed(1)}% high</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full" style={{ width: `${(channel.mean / 5) * 100}%`, background: channel.side === "UA" ? "#ffdd00" : "#0057b7" }} />
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
          <div className="space-y-5">
            <ChartCard title="Mean score by side">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[color:var(--ukraine-yellow)] p-4 text-[#07101f]">
                  <p className="font-serif text-4xl font-bold">4.31</p>
                  <p className="font-mono text-xs uppercase tracking-[0.14em]">Ukrainian channels</p>
                </div>
                <div className="rounded-2xl bg-[color:var(--ukraine-blue)] p-4 text-white">
                  <p className="font-serif text-4xl font-bold">4.16</p>
                  <p className="font-mono text-xs uppercase tracking-[0.14em]">Russian channels</p>
                </div>
              </div>
            </ChartCard>
            <Callout label="Counterintuitive finding">
              <p><strong>Ukrainian channels score higher on average</strong> (4.31 vs 4.16 for Russian channels). But this is not what it seems. The two highest-scoring channels — <strong>Донбасс Реалии</strong> and <strong>ХЕРСОН: Non Fake</strong> — are based in Russian-occupied territories. They document violence <em>happening to</em> their communities: strikes on civilian infrastructure, aftermath of shelling, the lived reality of occupation. Russian channels, by contrast, tend toward operational footage, weapons displays and propaganda aesthetics — which, though violent, score somewhat lower on <em>implied</em> violence.</p>
            </Callout>
          </div>
        </div>
        <ChartCard title="Channel breakdown">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse font-mono text-xs">
              <thead><tr className="text-left text-[color:var(--text-muted)]"><th className="py-2">Channel</th><th>Title</th><th>Side</th><th>Mean</th><th>n</th><th>% &gt;= 6</th></tr></thead>
              <tbody>{channels.map((channel) => (
                <tr className="border-t border-[color:var(--border)]" key={channel.channel}>
                  <td className="py-3 text-[color:var(--text)]">{channel.channel}</td><td>{channel.title}</td><td>{channel.side}</td><td>{channel.mean}</td><td>{channel.count}</td><td>{channel.high}%</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </ChartCard>
      </ReportSection>

      <ReportSection
        number="03b / 07"
        title={<>What do they post about?</>}
        desc={<>Violence is not just a matter of intensity — it is also a matter of <em>kind</em>. The content mix differs sharply between channels, revealing fundamentally different editorial logics on each side.</>}
      >
        <ChartCard title="Content type breakdown by channel (% of posts)">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse font-mono text-[11px]">
              <thead><tr><th className="px-2 py-2 text-left text-[color:var(--text-muted)]">Channel</th>{contentKeys.map((key) => <th className="px-2 py-2 text-left text-[color:var(--text-muted)]" key={key}>{key}</th>)}</tr></thead>
              <tbody>{contentByChannel.map((row) => (
                <tr className="border-t border-[color:var(--border)]" key={row.channel}>
                  <td className="px-2 py-2 text-[color:var(--text)]">{row.side} · {row.channel}</td>
                  {contentKeys.map((key) => <td className="px-2 py-2" key={key}>{row[key].toFixed(1)}%</td>)}
                </tr>
              ))}</tbody>
            </table>
          </div>
        </ChartCard>
        <div className="grid gap-5 md:grid-cols-2">
          <Callout label="Russian channels"><p><strong>Combat, weapons and drones dominate.</strong> rusich_army leads on combat footage (22%) and weapons (15%). voenacher and ZA_FROHT are drone-heavy. wargonzo is an outlier — nearly <strong>half its content (48%) is political</strong>, making it more of a commentary channel than a war documentation one.</p></Callout>
          <Callout label="Ukrainian channels"><p><strong>Destruction dominates.</strong> kherson_non_fake posts destruction at <strong>36%</strong> — more than double the corpus average. donbassrealii and hyevuy_dnepr follow at 24-25%. These occupied-territory channels document what is being done <em>to</em> their communities. a_shtirlitz is unique: 17% propaganda and 8% груз 200 — a channel dedicated to exposing Russian military deaths.</p></Callout>
        </div>
      </ReportSection>

      <ReportSection
        number="04 / 07"
        title={<>Eight types of violence</>}
        desc="Violence on Telegram is not monolithic. Qualitative analysis of the AI descriptions reveals eight distinct visual genres — each with its own register, aesthetic logic, and emotional appeal."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((category) => {
            const stats = catStats[category.id];
            return (
              <article className="rounded-3xl border border-[color:var(--border)] bg-black/35 p-5" key={category.id}>
                <p className="kicker">{stats.count.toLocaleString()} images · mean {stats.mean}</p>
                <h3 className="mt-2 font-serif text-2xl font-bold text-[color:var(--text)]">{category.name}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-dim)]">{category.desc}</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {selectedImages[category.id].map((image) => (
                    <div className="overflow-hidden rounded-xl border border-[color:var(--border)] bg-black/40" key={image.f}>
                      <Image src={`/media/${image.f}`} alt="" width={220} height={160} className="h-28 w-full object-cover grayscale-[0.25]" />
                      <div className="p-2 font-mono text-[10px] leading-4 text-[color:var(--text-muted)]">Score {image.v} · {formatViews(image.views)}</div>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </ReportSection>

      <ReportSection
        number="05 / 07"
        title={<>Scores 9 & 10: the extreme end</>}
        desc="512 images score 9 or 10 — the most explicit violence in the corpus. 32 images reach the maximum score. Almost all are direct casualty imagery: bodies, blood, human remains. A handful are propaganda memes so extreme in their death symbolism they reach equivalent scores without showing a single body."
      >
        <Callout label="Content warning">
          <p>The images below are <strong>among the most graphically violent</strong> in the dataset. They include casualties, visible trauma and remains. They are shown because they are part of the evidentiary record — images that circulated to hundreds of thousands of Telegram subscribers.</p>
        </Callout>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {extremeImages.map((image) => (
            <article className="overflow-hidden rounded-3xl border border-[color:var(--border)] bg-black/35" key={image.f}>
              <Image src={`/media/${image.f}`} alt="" width={520} height={360} className="h-56 w-full object-cover grayscale-[0.15]" />
              <div className="p-4">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--ukraine-yellow)]">Score {image.v} · {image.ct}</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--text-dim)]">{image.desc}</p>
                <p className="mt-3 font-mono text-[11px] text-[color:var(--text-muted)]">{image.ch} · {image.date} · {formatViews(image.views)} views</p>
              </div>
            </article>
          ))}
        </div>
      </ReportSection>

      <ReportSection
        number="06 / 07"
        title={<>The moving image</>}
        desc="11,230 of the posts in the corpus are videos. A curated selection of high-violence videos embedded directly from Telegram in the original report — drone strikes, explosions, combat, naval warfare. These are the videos that reached the largest audiences."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {videoEmbeds.map((video) => (
            <a className="chapter-card min-h-0" href={video.url} target="_blank" rel="noopener noreferrer" key={video.url}>
              <p className="kicker">{video.cat} · {formatViews(video.views)} views</p>
              <h3 className="mt-4 font-serif text-2xl font-bold text-[color:var(--text)]">{video.ch}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-dim)]">{video.desc}</p>
              <span className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--ukraine-yellow)]">Open Telegram video</span>
            </a>
          ))}
        </div>
      </ReportSection>

      <ReportSection
        number="07 / 07"
        title={<>Does violence drive reach?</>}
        desc="With view counts for every post, we can ask: does more graphic content travel further? The answer is more nuanced than expected."
      >
        <ChartCard title="Mean views by violence score">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewsByScore}>
                <CartesianGrid stroke="rgba(246,243,235,0.12)" vertical={false} />
                <XAxis dataKey="score" tick={{ fill: "#b8b2a7", fontSize: 12 }} />
                <YAxis tick={{ fill: "#b8b2a7", fontSize: 12 }} tickFormatter={(value) => `${Number(value) / 1000}k`} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="mean_views" fill="#0057b7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <Callout label="Finding">
          <p>Engagement peaks at <strong>score 4</strong> — moderate implied violence — with a mean of 220,000 views per post. Extreme violence (scores 8-9) actually receives <em>fewer</em> views on average, suggesting it may be shared more narrowly, filtered by platform moderation, or posted by smaller-audience channels. The exception: <strong>score 10 images average 303,000 views</strong> — but this is based on just 32 images, many of which were posted by large-audience channels like RVvoenkor and rusich_army.</p>
        </Callout>
      </ReportSection>

      <footer className="rounded-3xl border border-[color:var(--border)] bg-black/30 p-5 font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--text-muted)] sm:p-6">
        Violence on the front · Telegram war imagery analysis<br />
        24.000+ images · 10 channels · Feb 2022 - Feb 2026<br />
        AI annotation: implied violence, gamification, dehumanization, aestheticization, narrative framing
      </footer>
    </div>
  );
}
