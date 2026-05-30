import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalStructuredData from "@/components/seo/GlobalStructuredData";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SEO_KEYWORDS,
  SITE_URL,
} from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Helpaana",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: "Helpaana Premium Services", url: SITE_URL }],
  creator: "Helpaana",
  publisher: "Helpaana Premium Services",
  applicationName: "Helpaana",
  category: "Home Services",
  icons: {
    icon: "/favicon.ico",
    apple: "/image/logo.png",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Helpaana",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/image/logo.png",
        width: 800,
        height: 600,
        alt: "Helpaana - Trusted Home Service Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/image/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add tokens from Google Search Console when available:
    // google: "your-google-verification-code",
  },
  other: {
    "geo.region": "IN-UP",
    "geo.placename": "Noida",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href={SITE_URL} />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-[#F8F9FA]`}
      >
        <GlobalStructuredData />
        <ReduxProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
