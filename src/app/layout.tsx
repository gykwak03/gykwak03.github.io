import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { RevealInit } from "@/components/RevealInit";

const pagesBasePath = process.env.PAGES_BASE_PATH ?? "";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://gykwak03.github.io${pagesBasePath}/`),
  title: {
    default: "Gayoung Kwak — Data Science × Healthcare AI",
    template: "%s · Gayoung Kwak",
  },
  description:
    "Gayoung Kwak — connecting nutrition & health domain knowledge with AI and data science. Clinical prediction, LLM-based feature selection, and data-driven health tools.",
  keywords: [
    "Gayoung Kwak",
    "곽가영",
    "Data Science",
    "Healthcare AI",
    "Machine Learning",
    "LLM",
    "Kyung Hee University",
  ],
  openGraph: {
    title: "Gayoung Kwak — Data Science × Healthcare AI",
    description:
      "Connecting nutrition & health domain knowledge with AI and data science.",
    type: "website",
  },
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
