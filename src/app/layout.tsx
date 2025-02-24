import { Poppins, Tajawal } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import type { Metadata } from "next";
import { fetchGuide } from "@/services/guides.service";

const primaryFont = Poppins({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-primary",
});

const secondaryFont = Tajawal({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-secondary",
});

export async function generateMetadata(): Promise<Metadata> {
  const nextHeaders = await headers();
  const pageUrl = nextHeaders.get("x-url") || "/";
  const split = pageUrl.split("/");
  const guideUrl = split[split.length - 1];
  let guide = {
    name: "Noor Registry Guides",
    description: "Noor Registry Guides",
    bannerImage: "/",
  };
  if (guideUrl) {
    guide = await fetchGuide(guideUrl);
  }

  return {
    title: guide.name,
    description: guide.description,
    openGraph: {
      images: {
        url: `${process.env.NEXT_PUBLIC_ASSET_URL}${guide.bannerImage}`,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextHeaders = await headers();
  const language = nextHeaders.get("Accept-Language");
  const direction = language == "en" ? "ltr" : "rtl";
  return (
    // @ts-expect-error language
    <html lang={language} dir={direction}>
      <body
        className={`${primaryFont.variable} ${secondaryFont.variable} antialiased font-sans container m-auto`}
      >
        {children}
      </body>
    </html>
  );
}
