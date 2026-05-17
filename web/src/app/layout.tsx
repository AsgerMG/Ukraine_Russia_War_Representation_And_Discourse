import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Picturing the War — Visual Representation on Telegram, 2022–2026",
  description:
    "Visual representation and discourse on Telegram, 2022–2026. A comparative study of ten Russian and Ukrainian channels, combining channel content, frontline violence, technical means, correlatory effects, and methodology.",
};

const BG_IMAGES = [
  "RVvoenkor_18875.jpg","RVvoenkor_47049.jpg","RVvoenkor_76401.jpg","RVvoenkor_8007.jpg",
  "ZA_FROHT_22503.jpg","ZA_FROHT_51639.jpg","a_shtirlitz_19686.jpg","a_shtirlitz_29156.jpg",
  "donbassrealii_15275.jpg","donbassrealii_23474.jpg","hyevuy_dnepr_56016.jpg","hyevuy_dnepr_90567.jpg",
  "kherson_non_fake_18777.jpg","kherson_non_fake_22751.jpg","rusich_army_1439.jpg","rusich_army_7242.jpg",
  "voenacher_27355.jpg","voenacher_43679.jpg","voenkorKotenok_35266.jpg","voenkorKotenok_48734.jpg",
  "wargonzo_14716.jpg","wargonzo_16044.jpg","voenacher_78145.jpg","rusich_army_21234.jpg",
];


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="relative min-h-full flex flex-col antialiased">

        {/* ── faded image background ── */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div
            className="grid w-full h-full"
            style={{
              gridTemplateColumns: "repeat(6, 1fr)",
              gridTemplateRows: "repeat(4, 1fr)",
              opacity: 0.18,
              filter: "grayscale(0.82) contrast(1.25) saturate(0.75)",
            }}
          >
            {BG_IMAGES.map((img) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={img}
                src={`/media/${img}`}
                alt=""
                className="w-full h-full object-cover"
              />
            ))}
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 18% 8%, rgba(0,87,183,0.24), transparent 30%), radial-gradient(circle at 80% 10%, rgba(255,221,0,0.1), transparent 24%), linear-gradient(to bottom, rgba(8,9,11,0.74) 0%, rgba(8,9,11,0.84) 44%, rgba(8,9,11,0.93) 100%)",
            }}
          />
        </div>

        {/* ── page content ── */}
        <div className="relative z-10 flex flex-col flex-1">
          {children}
        </div>

      </body>
    </html>
  );
}
