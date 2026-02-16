"use client";

import Link from "next/link";
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";
import Logo from "./Logo.jsx";

const Footer = () => {
  const serviceLinks = [
    { name: "Book a Attendant For Your Parents", href: "/pages/Attendant" },
    { name: "Book Guardian For Your Kids", href: "/pages/GuardianKids" },
    { name: "Book a Female Attendant For Droping Airport", href: "/pages/Attendant" },
    { name: "Book a Pandit Ji", href: "/pages/Pandit" },
    { name: "Mehndi Artist", href: "/pages/Mehndi" },
    { name: "Resort Booking For Wedding & Function", href: "/pages/Hotel" }, 
    { name: "School Uniform & Accessories", href: "/pages/School" },
    { name: "Cosmetic", href: "/pages/Cosmetic" },
    { name: "Groceries", href: "/pages/Groceries" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Join Us (Career)", href: "/career" },
    { name: "Business Collerabation", href: "#" },
    { name: "For Investors", href: "#" },
    { name: "Become a Partner", href: "#" }, 
    
    
  ];

  const otherLinks = [
    { name: "Blog", href: "/blog" },
    { name: "Admin Login", href: "/admin/login" },
    { name: "  Achievements & Appearances", href: "" },
    { name: "Our Official Business Partner", href: "" },
    
  ];

  return (
    <footer className="bg-[#457B9D] pt-12 pb-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto mb-10 border-b border-white/10 pb-8">
        <Logo size="lg" light={true} />
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Services Section */}
        <div className="col-span-1">
          <h3 className="text-black font-bold text-lg mb-4">Services</h3>
          <ul className="space-y-2">
            {serviceLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-white hover:underline transition-all">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Section */}
        <div className="col-span-1">
          <h3 className="text-black font-bold text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            {companyLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-white hover:underline transition-all">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Links Section */}
        <div className="col-span-1">
          <h3 className="text-black font-bold text-lg mb-4">Other Links</h3>
          <ul className="space-y-2">
            {otherLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-white hover:underline transition-all">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Details Section */}
        <div className="col-span-2 lg:col-span-1">
          <h3 className="text-black font-bold text-lg mb-4">Contact Details</h3>
          <div className="text-white space-y-3">
            {/* <p className="font-semibold">Helpaana unit of Sylish Him PRIVATE LIMITED</p> */}
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 shrink-0" />
              <span>B-25, 2nd floor, Sector 2 Noida - 201301</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 shrink-0" />
              <span>+91 8887796224</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 shrink-0" />
              <span>0120 - 4978652</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 shrink-0" />
              <a href="mailto:support@helpaana.com" className="hover:underline">support@helpaana.com</a>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-black font-bold mb-3">Follow Us</h4>
            <div className="flex gap-4">
             
              <Link href="https://www.instagram.com/helpaana?utm_source=qr&igsh=MXE3ZWt2dHUycjZpNw%3D%3D" className="text-white hover:text-black transition-colors">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="https://www.youtube.com/@helpaana?si=try2DdrCGa4JpNfl" className="text-white hover:text-black transition-colors">
                <Youtube className="w-6 h-6" />
              </Link>  <Link href="https://facebook.com/helpaana" className="text-white hover:text-black transition-colors">
                <Facebook className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-white/20 text-center text-white text-sm">
        <p>&copy; {new Date().getFullYear()} Helpaana. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
