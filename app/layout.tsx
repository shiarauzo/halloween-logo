import type { Metadata, Viewport } from "next";
import { Geist, Newsreader } from "next/font/google";
import { DESCRIPTION, SITE_NAME, TITLE } from "@/lib/copy";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const OG_VIDEO_PATH = "/og/landing.mp4";
const OG_VIDEO_URL = `${SITE_URL}${OG_VIDEO_PATH}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: DESCRIPTION,
  applicationCategory: "DesignApplication",
  operatingSystem: "Any",
  inLanguage: "en",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "PEN",
  },
  creator: {
    "@type": "Person",
    name: "Shiara Arauzo",
    url: "https://github.com/shiarauzo",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Shiara Arauzo", url: "https://github.com/shiarauzo" }],
  creator: "Shiara Arauzo",
  alternates: { canonical: "/" },
  keywords: [
    "halloween logo",
    "witch hat logo",
    "pumpkin logo",
    "bat logo",
    "ghost logo",
    "custom logo",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    videos: [
      {
        url: OG_VIDEO_URL,
        secureUrl: OG_VIDEO_URL,
        type: "video/mp4",
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${newsreader.variable} h-full touch-manipulation antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
