import { SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Hospital Visit Helper & Nurse at Home",
  description:
    "Book a hospital visit helper and nurse for first aid on Helpaana — home nursing, injections, and patient care support.",
  keywords: [
    "hospital visit helper",
    "nurse at home booking",
    "patient care helper",
    "home nursing service",
    "helpaana nurse",
  ],
  alternates: { canonical: "/pages/nurse" },
  openGraph: {
    url: `${SITE_URL}/pages/nurse`,
    title: "Hospital Visit Helper | Helpaana",
  },
};

export default function NurseLayout({ children }) {
  return children;
}
