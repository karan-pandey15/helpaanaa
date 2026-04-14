import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "HELPAANA PREMIUM SERVICES",
  description: "Helpaana - Your complete solution platform for premium services. Book attendants, pandits, pet walkers, nurses & 10+ premium services in under 30 seconds.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["premium services", "attendant booking", "noida home services", "helpaana services"],
  openGraph: {
    title: "HELPAANA PREMIUM SERVICES",
    description: "Book premium services in under 30 seconds.",
    url: "https://helpaana.com",
    siteName: "Helpaana",
    images: [
      {
        url: "/image/logo.png", // Assuming logo exists
        width: 800,
        height: 600,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-[#F8F9FA]`}
      >
        <ReduxProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
