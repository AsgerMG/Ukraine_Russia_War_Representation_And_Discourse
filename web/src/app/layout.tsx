import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Representation and Discourse — Ukraine War",
  description:
    "A visual and analytical exploration of how the Ukraine war is represented across digital platforms.",
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
              opacity: 0.07,
              filter: "grayscale(1) contrast(1.2)",
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
                "linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.7) 100%)",
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
