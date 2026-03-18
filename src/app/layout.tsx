import type { Metadata } from "next";
import { Suspense } from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import PostHogProvider from "@/components/PostHogProvider";
import "@/styles/globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VENUE — Book Private Spaces for Any Occasion | Miami",
  description:
    "Find and book private event spaces in Miami. From baby showers to boardrooms — we handle the venue, setup, and staff. Free for consumers.",
  keywords: [
    "private event space miami",
    "baby shower venue miami",
    "birthday party venue miami",
    "corporate event space miami",
    "private dining miami",
    "venue booking miami",
  ],
  openGraph: {
    title: "VENUE — Book Private Spaces for Any Occasion",
    description:
      "Find and book private event spaces in Miami. Free to browse, no credit card required.",
    url: "https://venue.georg.miami",
    siteName: "VENUE",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'VENUE',
    description: 'Find and book private event spaces in Miami.',
    url: 'https://venue.georg.miami',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free to browse and request venues',
    },
    areaServed: {
      '@type': 'City',
      name: 'Miami',
      '@id': 'https://www.wikidata.org/wiki/Q8652',
    },
    provider: {
      '@type': 'Organization',
      name: 'VENUE',
      url: 'https://venue.georg.miami',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable}`}>
        <Suspense fallback={null}>
          <PostHogProvider>
            {children}
          </PostHogProvider>
        </Suspense>
      </body>
    </html>
  );
}
