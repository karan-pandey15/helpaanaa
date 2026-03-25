"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ChevronRight
} from "lucide-react";
import Logo from "./Logo";

const categories = [
  { name: "Attendant For Parents", path: "/pages/Attendant" },
  { name: "Guardian For Kids", path: "/pages/GuardianKids" },
  { name: "Pet Walker", path: "/pages/petwalker" },
  { name: "Booking for Pandit Ji", path: "/pages/Pandit" },
  { name: "Mehndi Artist", path: "/pages/Mehndi" },
  { name: "School Uniform & Accessories", path: "/pages/School" },
  { name: "Healthy Food", path: "/pages/Groceries" },
  { name: "Resort & Farmhouse Booking", path: "/pages/Hotel" },
  { name: "Cosmetic", path: "/pages/Cosmetic" },
  { name: "Nurse For First Aid", path: "/pages/nurse" },
  { name: "Premium Gym MemberShip", path: "/pages/Gym" },
  { name: "Food For Patient & Tiffin Service", path: "/pages/tiffinservice" },
  { name: "Physiotherapist", path: "/pages/physiotherapist" },
  { name: "Groceries", path: "/pages/Groceries" },
];

const companyLinks = [
  { name: "About Us", path: "/about" },
  { name: "For Business Collaboration", path: "/collaboration" },
  { name: "For Investors", path: "/investors" },
  { name: "Become a Partner", path: "/partner" },
  { name: "Join Us (Career)", path: "/career" },
  { name: "Contact Us", path: "/contact" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms & Conditions", path: "/terms" },
];

const otherLinks = [
  { name: "Blog", path: "/blog" },
  { name: "Admin Login", path: "/admin/login" },
  { name: "Partner Login", path: "/partner/login" },
  { name: "Achievements & Appearances", path: "/achievements" },
  { name: "Our Official Business Partner", path: "/official-partner" },
];

export default function Footer() {
  const pathname = usePathname();

  if (
    pathname.includes("/pages/ServiceDetail") || 
    pathname.includes("/pages/ladies") || 
    pathname.includes("/pages/Mehndi")
  ) {
    return null;
  }
  return (
    <footer className="bg-[#004090] text-white pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12 mb-12">
          
          {/* Column 1: About */}
          <div className="space-y-6">
            <Logo size="md" className="brightness-110" />
            <p className="text-white/70 text-sm leading-relaxed">
              Helpaana Premium Services is India's leading doorstep service provider, 
              connecting households with verified professionals for over 10+ services. 
              Quality, trust, and convenience at your fingertips.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Youtube].map((Icon, idx) => (
                <Link key={idx} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F5A623] hover:text-[#004090] transition-all">
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              Our Services
              <span className="w-8 h-1 bg-[#F5A623] rounded-full" />
            </h3>
            <ul className="grid grid-cols-1 gap-3">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <Link 
                    href={cat.path} 
                    className="text-white/70 hover:text-[#F5A623] text-sm flex items-center gap-2 transition-colors group"
                  >
                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              Company
              <span className="w-8 h-1 bg-[#F5A623] rounded-full" />
            </h3>
            <ul className="space-y-4">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.path} 
                    className="text-white/70 hover:text-[#F5A623] text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Other Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              Other Links
              <span className="w-8 h-1 bg-[#F5A623] rounded-full" />
            </h3>
            <ul className="space-y-4">
              {otherLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.path} 
                    className="text-white/70 hover:text-[#F5A623] text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              Contact Us
              <span className="w-8 h-1 bg-[#F5A623] rounded-full" />
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623] shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white/50 uppercase">OFFICE</p>
                  <p className="text-sm text-white/80">NX One T3 - B111, Noida Extension - 201318</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623] shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white/50 uppercase">HELPLINE</p>
                  <p className="text-sm text-white/80">+91 8887796224</p>
                  <p className="text-sm text-white/80">0120 - 4978652</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623] shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white/50 uppercase">EMAIL</p>
                  <p className="text-sm text-white/80">helpaanaworld@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs">
          <p>© {new Date().getFullYear()} HELPAANA PREMIUM SERVICES. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Facebook</Link>
            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
