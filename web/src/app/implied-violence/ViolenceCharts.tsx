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
  { id: "destruction", name: "Destruction and structural damage", desc: "Collapsed buildings, shelled apartment blocks, burned vehicles, cratered streets. The largest category, and violence without bodies: infrastructure as the victim." },
  { id: "explosion", name: "Explosions in progress", desc: "Active fireballs, muzzle flashes, smoke plumes, often blurry and filmed in the moment. The highest mean violence score of any category, at 7.15." },
  { id: "drone", name: "Drone strikes", desc: "Aerial targeting footage with HUD overlays, crosshairs and telemetry. A distinctly gamified register that makes killing resemble a video-game interface." },
  { id: "casualty", name: "Direct casualties", desc: "Bodies, blood, visible injury. The rarest category by count but the most extreme by score, mean 7.78. Twenty-nine of the thirty-two score-10 images sit here." },
  { id: "gruz200", name: "Груз 200 memorial memes", desc: "Portrait collages of soldiers overlaid with flames and the death code Груз 200, Cargo 200. Implicit, aestheticised death, a visual genre native to Russian Telegram." },
  { id: "propaganda", name: "Propaganda and death symbolism", desc: "Composite imagery that implies violence without depicting it: nooses, flames, dehumanising text, militant graphics. Two of the three bodyless score-10 images are here." },
  { id: "weapons", name: "Weapons and ordnance", desc: "Missiles and munitions carrying handwritten Cyrillic dedications, firing tanks, drone-part assemblies. Potential violence rather than enacted, but the lethality is explicit." },
  { id: "combat", name: "Combat footage and soldier POV", desc: "Firefights, trench warfare, soldiers aiming, artillery firing. The first-person register of war: immersive and immediate." },
] as const;

const selectedImages = {
  destruction: [
    { f: "rusich_army_11228.jpg", v: 9, ch: "rusich_army", date: "2023-10-08", views: 1634464, desc: "Graphic composite over an attack map; territorial bombardment illustrated." },
    { f: "RVvoenkor_47049.jpg", v: 9, ch: "RVvoenkor", date: "2023-06-10", views: 574746, desc: "Split-screen of armoured vehicles amid destroyed terrain." },
    { f: "voenacher_43679.jpg", v: 9, ch: "voenacher", date: "2023-04-29", views: 370117, desc: "Interior of a destroyed residential building: collapsed walls and rubble." },
  ],
  explosion: [
    { f: "RVvoenkor_77193.jpg", v: 9, ch: "RVvoenkor", date: "2024-09-18", views: 613135, desc: "Night scene; large fire and bright flames from structures, thick smoke." },
    { f: "voenacher_57337.jpg", v: 9, ch: "voenacher", date: "2023-12-03", views: 340723, desc: "Violent blast engulfing a vehicle, a bright orange-white explosion." },
    { f: "wargonzo_16044.jpg", v: 9, ch: "wargonzo", date: "2023-10-26", views: 242765, desc: "Burning smoke-filled industrial corridor, fire consuming the interior." },
  ],
  drone: [
    { f: "rusich_army_13035.jpg", v: 9, ch: "rusich_army", date: "2024-02-06", views: 675429, desc: "Infrared night-vision drone view, targeting reticle on subjects below." },
    { f: "RVvoenkor_51674.jpg", v: 9, ch: "RVvoenkor", date: "2023-08-21", views: 512310, desc: "Night-vision aerial over vegetation and road, HUD targeting indicators." },
    { f: "voenacher_46161.jpg", v: 9, ch: "voenacher", date: "2023-06-08", views: 400284, desc: "Aerial rural landscape; a trajectory trail visible, impact site marked." },
  ],
  casualty: [
    { f: "rusich_army_13799.jpg", v: 10, ch: "rusich_army", date: "2024-03-23", views: 982507, desc: "Multi-panel attack sequence with graphic injury close-ups. 982K views." },
    { f: "RVvoenkor_23474.jpg", v: 10, ch: "RVvoenkor", date: "2022-08-19", views: 670033, desc: "Multiple bodies on pavement, scattered tactical gear after an assault." },
    { f: "voenkorKotenok_35266.jpg", v: 10, ch: "voenkorKotenok", date: "2022-04-24", views: 433866, desc: "Two deceased individuals on dry straw, blood visible on clothing." },
  ],
  gruz200: [
    { f: "a_shtirlitz_29204.jpg", v: 9, ch: "a_shtirlitz", date: "2024-03-06", views: 96246, desc: "Collage of portrait photos of uniformed men, soldiers memorialised as killed in action." },
    { f: "donbassrealii_9649.jpg", v: 6, ch: "donbassrealii", date: "2022-08-08", views: 1370, desc: "Stacked cardboard boxes marked Груз 200, the Soviet code for fallen soldiers." },
    { f: "a_shtirlitz_19686.jpg", v: 8, ch: "a_shtirlitz", date: "2022-07-12", views: 176530, desc: "Edited composite portrait of a uniformed soldier, a stylised memorial graphic." },
  ],
  propaganda: [
    { f: "kherson_non_fake_1952.jpg", v: 10, ch: "kherson_non_fake", date: "2022-07-13", views: 11765, desc: "A man in a suit positioned under a noose in a war-damaged setting. Score 10." },
    { f: "rusich_army_1439.jpg", v: 10, ch: "rusich_army", date: "2022-03-31", views: 1787, desc: "Social-media post with explicit death threats and dehumanising language. Score 10." },
    { f: "ZA_FROHT_51639.jpg", v: 9, ch: "ZA_FROHT", date: "2026-02-22", views: 10657, desc: "Stylised propaganda scene: a Russian soldier in the foreground, explosions behind." },
  ],
  weapons: [
    { f: "rusich_army_15371.jpg", v: 9, ch: "rusich_army", date: "2024-06-23", views: 365336, desc: "A table of drone parts and quadcopter frames, FPV drone assembly." },
    { f: "hyevuy_dnepr_56016.jpg", v: 9, ch: "hyevuy_dnepr", date: "2023-07-08", views: 150652, desc: "Soldiers operating a large artillery piece in a field, crew visible." },
    { f: "RVvoenkor_8007.jpg", v: 8, ch: "RVvoenkor", date: "2022-04-14", views: 307173, desc: "A table with multiple handguns and tactical equipment, seized or displayed." },
  ],
  combat: [
    { f: "voenacher_39395.jpg", v: 9, ch: "voenacher", date: "2023-02-11", views: 355827, desc: "Two self-propelled guns firing on a snowy wooded hillside, large smoke plumes." },
    { f: "wargonzo_14716.jpg", v: 9, ch: "wargonzo", date: "2023-08-30", views: 278296, desc: "A close, dynamic scene; a soldier aiming a weapon amid smoke and debris." },
    { f: "kherson_non_fake_22751.jpg", v: 9, ch: "kherson_non_fake", date: "2025-08-03", views: 76316, desc: "A helmeted soldier aiming a scoped rifle in an active engagement position." },
  ],
};

const extremeImages = [
  { f: "rusich_army_13799.jpg", v: 10, ch: "rusich_army", date: "2024-03-23", views: 982507, ct: "casualty", desc: "Multi-panel attack sequence with graphic injury close-ups. 982K views." },
  { f: "RVvoenkor_23474.jpg", v: 10, ch: "RVvoenkor", date: "2022-08-19", views: 670033, ct: "casualty", desc: "Multiple bodies on pavement with scattered military gear." },
  { f: "RVvoenkor_18875.jpg", v: 10, ch: "RVvoenkor", date: "2022-07-08", views: 646727, ct: "casualty", desc: "Two deceased soldiers in tall vegetation, visible facial trauma." },
  { f: "rusich_army_7242.jpg", v: 10, ch: "rusich_army", date: "2023-01-14", views: 597117, ct: "casualty", desc: "Multiple soldiers lying in rows, the aftermath of a combat assault." },
  { f: "RVvoenkor_76401.jpg", v: 10, ch: "RVvoenkor", date: "2024-09-05", views: 541248, ct: "casualty", desc: "Several bodies in wooded brush, prominent head injuries." },
  { f: "voenacher_27355.jpg", v: 10, ch: "voenacher", date: "2022-08-17", views: 393103, ct: "casualty", desc: "A charred body amid burned vegetation, the aftermath of an explosion." },
];

const videoEmbeds = [
  { url: "https://t.me/rusich_army/12698", cat: "explosion", ch: "rusich_army", date: "2024-01-15", views: 1319864, desc: "A massive nighttime fireball, the most-viewed video in the corpus at 1.3M views." },
  { url: "https://t.me/rusich_army/15868", cat: "drone strike", ch: "rusich_army", date: "2024-07-17", views: 629791, desc: "A drone targeting display: aerial view of a strike zone with HUD overlay and telemetry." },
  { url: "https://t.me/RVvoenkor/41549", cat: "drone strike", ch: "RVvoenkor", date: "2023-03-28", views: 542245, desc: "Aerial drone view through smoke over a destroyed landscape, a rectangular targeting reticle." },
  { url: "https://t.me/RVvoenkor/77233", cat: "destruction", ch: "RVvoenkor", date: "2024-09-18", views: 579369, desc: "A burning armoured vehicle engulfed in flames and thick smoke on the battlefield." },
  { url: "https://t.me/a_shtirlitz/26529", cat: "combat", ch: "a_shtirlitz", date: "2023-07-15", views: 200940, desc: "Two camouflaged soldiers in an active combat position, crouched over dark soil." },
  { url: "https://t.me/wargonzo/9040", cat: "weapons", ch: "wargonzo", date: "2022-11-04", views: 496648, desc: "A ship at sea with a large vertical flame from a launcher; naval strike footage." },
];

const viewsByScore = [
  { score: 0, mean_views: 172597 }, { score: 1, mean_views: 194424 }, { score: 2, mean_views: 205720 },
  { score: 3, mean_views: 213852 }, { score: 4, mean_views: 220289 }, { score: 5, mean_views: 207208 },
  { score: 6, mean_views: 207142 }, { score: 7, mean_views: 188380 }, { score: 8, mean_views: 172693 },
  { score: 9, mean_views: 176454 }, { score: 10, mean_views: 303455 },
];

const GRID = "rgba(236,231,218,0.1)";
const TICK = "#ada697";
const BLUE = "#005bbb";
const GOLD = "#ffd700";

const tooltipStyle = {
  background: "#1a1814",
  border: "1px solid rgba(236,231,218,0.2)",
  borderRadius: 3,
  color: "#ece7da",
  fontFamily: "var(--sans)",
  fontSize: 12,
};

function Movement({
  part,
  title,
  desc,
  children,
}: {
  part: string;
  title: ReactNode;
  desc: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-[color:var(--rule-strong)] pt-9">
      <p className="kicker">{part}</p>
      <h2 className="mt-3 max-w-[18ch] text-[clamp(1.7rem,4vw,2.5rem)]">{title}</h2>
      <p className="prose mt-4">{desc}</p>
      <div className="mt-9 flex flex-col gap-9">{children}</div>
    </section>
  );
}

function Figure({ title, children }: { title: string; children: ReactNode }) {
  return (
    <figure className="figure m-0">
      <figcaption className="figure-cap">{title}</figcaption>
      {children}
    </figure>
  );
}

function Note({ label, children }: { label: string; children: ReactNode }) {
  return (
    <aside className="note">
      <span className="note-label">{label}</span>
      <div className="text-[1.04rem] leading-7 text-[color:var(--text-dim)]">{children}</div>
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
    <div className="flex flex-col gap-16">
      <div className="prose dropcap">
        <p>
          Every one of more than 24,000 sampled images and video thumbnails was
          annotated for the violence it shows or implies. What follows isolates
          that single dimension across ten Telegram channels, five Russian and
          five Ukrainian, over the four years from 24 February 2022 onward.
          Violence here is not an occasional intrusion. It is the resting state
          of the feed.
        </p>
        <dl className="not-prose mt-2 flex flex-wrap gap-x-12 gap-y-4 font-sans">
          {[
            ["24,000+", "images analysed"],
            ["41%", "explicitly violent"],
            ["4.23", "mean violence score"],
            ["4 years", "of war documented"],
          ].map(([v, l]) => (
            <div key={l}>
              <dt className="stat-figure text-[2rem]">{v}</dt>
              <dd className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">{l}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Movement
        part="Part one of seven"
        title="How violent is the corpus?"
        desc={
          <>
            Every image was scored for implied violence, from zero for none to
            ten for the most extreme. The distribution is sharply bimodal, and
            the headline is blunt: roughly <strong>four images in ten</strong>{" "}
            score six or higher.
          </>
        }
      >
        <Figure title="Score distribution across the full 24,000-image corpus">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreDistribution}>
                <CartesianGrid stroke={GRID} vertical={false} />
                <XAxis dataKey="score" tick={{ fill: TICK, fontSize: 12 }} />
                <YAxis tick={{ fill: TICK, fontSize: 12 }} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(236,231,218,0.04)" }} />
                <Bar dataKey="count">
                  {scoreDistribution.map((row) => (
                    <Cell key={row.score} fill={row.score >= 6 ? GOLD : BLUE} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Figure>
        <Note label="Key finding">
          <p>
            <strong>41 per cent of all images score six or above</strong> and
            are read as explicitly violent. The distribution is notably bimodal,
            clustering around scores one to four and spiking again at six and
            eight. Score five forms a curious valley, as if the model treated it
            as a threshold rather than a midpoint. Only{" "}
            <strong>32 images reach the maximum of ten</strong>, with 480 at
            nine.
          </p>
        </Note>
      </Movement>

      <Movement
        part="Part two of seven"
        title="Four years of violence"
        desc="Monthly mean violence across forty-eight months. Does the visual register of the war intensify over time, or settle into a rhythm?"
      >
        <div className="grid gap-9 lg:grid-cols-2">
          <Figure title="Monthly mean violence score, February 2022 to February 2026">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthly}>
                  <CartesianGrid stroke={GRID} />
                  <XAxis dataKey="month" tick={{ fill: TICK, fontSize: 10 }} interval={5} />
                  <YAxis domain={[3.3, 5]} tick={{ fill: TICK, fontSize: 12 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="mean" stroke={GOLD} strokeWidth={2.25} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Figure>
          <Figure title="Share of images scoring six or above, per month">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthly}>
                  <CartesianGrid stroke={GRID} />
                  <XAxis dataKey="month" tick={{ fill: TICK, fontSize: 10 }} interval={5} />
                  <YAxis domain={[25, 58]} tick={{ fill: TICK, fontSize: 12 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="high_pct" stroke={BLUE} fill={BLUE} fillOpacity={0.35} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Figure>
        </div>
        <Note label="Reading the timeline">
          <p>
            The corpus opens on 24 February 2022, the first day of the
            full-scale invasion. Early months show moderate violence that rises
            and then steadies. The peaks line up with major offensives and
            counter-offensives. Over time the visual grammar of the war becomes
            entrenched rather than escalating.
          </p>
        </Note>
      </Movement>

      <Movement
        part="Part three of seven"
        title="Russian against Ukrainian channels"
        desc="Ten channels, five on each side. The comparison returns a counter-intuitive result."
      >
        <Figure title="Mean violence by channel">
          <div className="flex flex-col gap-3.5">
            {channels.map((channel) => (
              <div key={channel.channel}>
                <div className="mb-1 flex items-center justify-between gap-3 font-sans text-[0.78rem]">
                  <span className="text-[color:var(--text)]">{channel.channel}</span>
                  <span className="text-[color:var(--text-muted)]">
                    {channel.mean.toFixed(2)} mean, {channel.high.toFixed(1)}% high
                  </span>
                </div>
                <div className="h-2 overflow-hidden bg-[rgba(236,231,218,0.06)]">
                  <div
                    className="h-full"
                    style={{ width: `${(channel.mean / 5) * 100}%`, background: channel.side === "UA" ? GOLD : BLUE }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Figure>
        <Note label="A counter-intuitive finding">
          <p>
            On average <strong>Ukrainian channels score higher</strong>, 4.31
            against 4.16 for Russian channels, but the headline misleads. The
            two highest-scoring channels, Донбасс Реалии and ХЕРСОН: Non Fake,
            sit in Russian-occupied territory. They document violence happening{" "}
            <em>to</em> their communities: strikes on civilian infrastructure,
            the aftermath of shelling, the daily texture of occupation. Russian
            channels lean toward operational footage, weapons displays and
            propaganda aesthetics, which are violent but read lower on{" "}
            <em>implied</em> violence.
          </p>
        </Note>
        <Figure title="Channel breakdown">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse font-sans text-[0.82rem]">
              <thead>
                <tr className="border-b border-[color:var(--rule-strong)] text-left text-[color:var(--text-muted)]">
                  <th className="py-2.5 font-semibold">Channel</th><th className="font-semibold">Title</th><th className="font-semibold">Side</th><th className="font-semibold">Mean</th><th className="font-semibold">n</th><th className="font-semibold">% ≥ 6</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((channel) => (
                  <tr className="border-b border-[color:var(--rule)]" key={channel.channel}>
                    <td className="py-2.5 text-[color:var(--text)]">{channel.channel}</td>
                    <td className="text-[color:var(--text-dim)]">{channel.title}</td>
                    <td className="text-[color:var(--text-dim)]">{channel.side}</td>
                    <td className="text-[color:var(--text-dim)]">{channel.mean}</td>
                    <td className="text-[color:var(--text-dim)]">{channel.count}</td>
                    <td className="text-[color:var(--text-dim)]">{channel.high}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Figure>
      </Movement>

      <Movement
        part="Part four of seven"
        title="What do they post about?"
        desc={
          <>
            Violence is a matter of kind as much as intensity. The content mix
            differs sharply between channels, exposing two different editorial
            logics.
          </>
        }
      >
        <Figure title="Content type by channel, share of posts">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse font-sans text-[0.74rem]">
              <thead>
                <tr className="border-b border-[color:var(--rule-strong)]">
                  <th className="px-2 py-2 text-left font-semibold text-[color:var(--text-muted)]">Channel</th>
                  {contentKeys.map((key) => (
                    <th className="px-2 py-2 text-left font-semibold text-[color:var(--text-muted)]" key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contentByChannel.map((row) => (
                  <tr className="border-b border-[color:var(--rule)]" key={row.channel}>
                    <td className="px-2 py-2 text-[color:var(--text)]">{row.side} · {row.channel}</td>
                    {contentKeys.map((key) => (
                      <td className="px-2 py-2 text-[color:var(--text-dim)]" key={key}>{row[key].toFixed(1)}%</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Figure>
        <div className="grid gap-8 md:grid-cols-2">
          <Note label="Russian channels">
            <p>
              Combat, weapons and drones dominate. rusich_army leads on combat
              footage at 22 per cent and weapons at 15 per cent; voenacher and
              ZA_FROHT are drone-heavy. wargonzo is the outlier, with nearly half
              its content, 48 per cent, political. It is closer to a commentary
              channel than a war-documentation one.
            </p>
          </Note>
          <Note label="Ukrainian channels">
            <p>
              Destruction dominates. kherson_non_fake posts it at 36 per cent,
              more than double the corpus average; donbassrealii and hyevuy_dnepr
              follow at 24 to 25 per cent. These occupied-territory channels
              record what is being done to their communities. a_shtirlitz is
              distinct: 17 per cent propaganda and 8 per cent Груз 200, an
              account built to expose Russian military deaths.
            </p>
          </Note>
        </div>
      </Movement>

      <Movement
        part="Part five of seven"
        title="Eight kinds of violence"
        desc="Violence on Telegram is not monolithic. A close reading of the annotation descriptions yields eight visual genres, each with its own register and emotional appeal."
      >
        <div className="index-list">
          {categories.map((category) => {
            const stats = catStats[category.id];
            return (
              <article key={category.id} className="border-b border-[color:var(--rule)] py-9 first:pt-0">
                <p className="font-sans text-[0.72rem] uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
                  {stats.count.toLocaleString()} images · mean {stats.mean}
                </p>
                <h3 className="mt-2 text-[1.45rem]">{category.name}</h3>
                <p className="mt-2.5 max-w-[60ch] text-[1.02rem] leading-7 text-[color:var(--text-dim)]">{category.desc}</p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {selectedImages[category.id].map((image) => (
                    <div key={image.f}>
                      <Image
                        src={`/media/${image.f}`}
                        alt=""
                        width={220}
                        height={150}
                        className="h-28 w-full border border-[color:var(--rule)] object-cover grayscale-[0.3]"
                      />
                      <p className="mt-1.5 font-sans text-[0.66rem] text-[color:var(--text-muted)]">
                        Score {image.v} · {formatViews(image.views)}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </Movement>

      <Movement
        part="Part six of seven"
        title="Scores nine and ten"
        desc="512 images score nine or ten, the most explicit violence in the corpus, and 32 reach the maximum. Almost all are direct casualty imagery. A handful are propaganda memes so saturated with death symbolism that they reach the same score without a single body."
      >
        <Note label="Content warning">
          <p>
            The images below are among the most graphically violent in the
            dataset. They include casualties, visible trauma and remains. They
            appear because they are part of the evidentiary record, images that
            circulated to hundreds of thousands of Telegram subscribers.
          </p>
        </Note>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {extremeImages.map((image) => (
            <figure key={image.f} className="m-0">
              <Image
                src={`/media/${image.f}`}
                alt=""
                width={520}
                height={340}
                className="h-52 w-full border border-[color:var(--rule)] object-cover grayscale-[0.2]"
              />
              <figcaption className="mt-2.5">
                <p className="font-sans text-[0.7rem] uppercase tracking-[0.12em] text-[color:var(--accent)]">
                  Score {image.v} · {image.ct}
                </p>
                <p className="mt-1.5 text-[0.95rem] leading-6 text-[color:var(--text-dim)]">{image.desc}</p>
                <p className="mt-2 font-sans text-[0.7rem] text-[color:var(--text-muted)]">
                  {image.ch} · {image.date} · {formatViews(image.views)} views
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Movement>

      <Movement
        part="Part seven of seven"
        title="Does violence drive reach?"
        desc="With a view count on every post we can ask whether more graphic content travels further. The answer is more nuanced than expected."
      >
        <Figure title="Mean views by violence score">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewsByScore}>
                <CartesianGrid stroke={GRID} vertical={false} />
                <XAxis dataKey="score" tick={{ fill: TICK, fontSize: 12 }} />
                <YAxis tick={{ fill: TICK, fontSize: 12 }} tickFormatter={(value) => `${Number(value) / 1000}k`} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(236,231,218,0.04)" }} />
                <Bar dataKey="mean_views" fill={BLUE} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Figure>
        <Note label="Finding">
          <p>
            Engagement peaks at <strong>score four</strong>, moderate implied
            violence, averaging about 220,000 views per post. Extreme content at
            scores eight and nine actually draws <em>fewer</em> views, perhaps
            shared more narrowly, filtered by moderation, or posted by
            smaller-audience channels. The exception is striking:{" "}
            <strong>score-10 images average 303,000 views</strong>, though that
            rests on just 32 images, many from large channels such as RVvoenkor
            and rusich_army.
          </p>
        </Note>
      </Movement>

      <Movement
        part="Watching the war"
        title="The moving image"
        desc="The corpus holds 11,230 videos. This is a curated set of high-violence clips embedded from Telegram in the original report: drone strikes, explosions, combat, naval warfare, the ones that reached the largest audiences."
      >
        <nav className="index-list">
          {videoEmbeds.map((video) => (
            <a
              key={video.url}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="index-row group flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-7"
            >
              <span className="shrink-0 font-sans text-[0.74rem] uppercase tracking-[0.12em] text-[color:var(--text-muted)] sm:w-52">
                {video.cat} · {formatViews(video.views)} views
              </span>
              <span>
                <span className="text-[1.1rem] font-bold text-[color:var(--text)] transition-colors group-hover:text-[color:var(--accent)]">
                  {video.ch}
                </span>
                <span className="mt-1 block max-w-[58ch] text-[0.95rem] leading-6 text-[color:var(--text-dim)]">
                  {video.desc}
                </span>
              </span>
            </a>
          ))}
        </nav>
      </Movement>

      <p className="border-t border-[color:var(--rule)] pt-7 font-sans text-[0.72rem] leading-6 text-[color:var(--text-muted)]">
        Frontline violence in Telegram war imagery. 24,000+ images, 10 channels,
        February 2022 to February 2026. AI annotation across implied violence,
        gamification, dehumanisation, aestheticisation and narrative framing.
      </p>
    </div>
  );
}
