import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { RevealInit } from "@/components/RevealInit";
import { siteUrl } from "@/lib/site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: {
    default: "Gayoung Kwak (곽가영) — AI & Data Science for Healthcare",
    template: "%s · Gayoung Kwak",
  },
  description:
    "Gayoung Kwak (곽가영) is a data science and AI developer working across machine learning, deep learning, healthcare data, computer vision, and clinical EMR.",
  keywords: [
    "Gayoung Kwak",
    "곽가영",
    "Data Science",
    "Healthcare AI",
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Clinical EMR",
    "LLM",
    "Kyung Hee University",
  ],
  authors: [{ name: "Gayoung Kwak", url: siteUrl }],
  creator: "Gayoung Kwak",
  verification: {
    google: "B1wbrRGLe07KxQBcgN22Z45pDybmW1C4LUQDoB0lhHo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Gayoung Kwak (곽가영) — AI & Data Science for Healthcare",
    description:
      "Data science and AI across healthcare data, machine learning, deep learning, and computer vision.",
    url: siteUrl,
    siteName: "Gayoung Kwak Portfolio",
    type: "website",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gayoung Kwak",
  alternateName: "곽가영",
  url: siteUrl,
  email: "mailto:gykwak03@khu.ac.kr",
  sameAs: [
    "https://github.com/gykwak03",
    "https://www.linkedin.com/in/gayoungkwak",
    "https://ganuyaa.tistory.com",
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Kyung Hee University" },
    { "@type": "CollegeOrUniversity", name: "Instituto Superior Técnico" },
  ],
  knowsAbout: [
    "Data Science",
    "Machine Learning",
    "Deep Learning",
    "Healthcare AI",
    "Clinical EMR",
    "Computer Vision",
    "Large Language Models",
  ],
};

// Runs before first paint so the saved language is applied without a flash.
const initScript = `
(function(){
  try {
    localStorage.removeItem('theme');
    document.documentElement.classList.remove('dark');
    var l = localStorage.getItem('lang');
    if (l === 'ko') {
      document.documentElement.setAttribute('data-lang', 'ko');
      document.documentElement.setAttribute('lang', 'ko');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
        {/* If JS is unavailable, don't leave reveal content hidden. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <RevealInit />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
