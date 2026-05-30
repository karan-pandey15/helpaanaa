import { SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Elder Care Companion & Senior Citizen Assistance",
  description:
    "Book elder care companion service and senior citizen assistance on Helpaana — trusted attendants for parents and seniors at home.",
  keywords: [
    "elder care companion service",
    "senior citizen assistance",
    "senior care at home",
    "book attendant for parents",
    "helpaana attendant",
  ],
  alternates: { canonical: "/pages/Attendant" },
  openGraph: {
    url: `${SITE_URL}/pages/Attendant`,
    title: "Elder Care & Senior Assistance | Helpaana",
  },
};

export default function AttendantLayout({ children }) {
  return children;
}
