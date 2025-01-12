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
  console.log('guideUrl', guideUrl);
  
  const guide = await fetchGuide(guideUrl);

  return {
    title: guide.name || "Noor Registry Guide",
    description: guide.description || "Noor Registry Guide",
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
