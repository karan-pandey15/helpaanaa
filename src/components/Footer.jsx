"use client";

import Link from "next/link";
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
import Logo from "./Logo.jsx";

const Footer = () => {
  const serviceLinks = [
    { name: "Attendant For Parents", href: "/pages/Attendant" },
    { name: "Guardian For Kids", href: "/pages/GuardianKids" },
    { name: "Pet Walker", href: "/pages/petwalker" },
    { name: "Booking for Pandit Ji", href: "/pages/Pandit" },
    { name: "Mehndi Artist", href: "/pages/Mehndi" },
    { name: "School", href: "/pages/School" },
    { name: "Healthy Food", href: "/pages/Groceries" },
    { name: "Hotel & Resort Booking", href: "/pages/Hotel" },
    { name: "Cosmetic", href: "/pages/Cosmetic" },
    { name: "Nurse For First Aid", href: "/pages/nurse" },
    { name: "Gym MemberShip", href: "/pages/Gym" },
    { name: "Tiffin Service", href: "/pages/tiffinservice" },
    { name: "Groceries", href: "/pages/Groceries" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },  
    { name: "For Business Collaboration", href: "#" },
    { name: "For Investors", href: "#" },
    { name: "Become a Partner", href: "#" },  
    { name: "Join Us (Career)", href: "/career" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" }, 
  ];

  const otherLinks = [
    { name: "Blog", href: "/blog" },
    { name: "Admin Login", href: "/admin/login" },
    { name: "Partner Login", href: "/admin/login" },
    { name: "Achievements & Appearances", href: "#" },
    { name: "Our Official Business Partner", href: "#" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#1d4e6e] to-[#0f2a3c] text-white pt-16 pb-8 px-4 md:px-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-50" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          {/* Brand & App Downloads Section */}
          <div className="lg:col-span-4 space-y-8">
            <Logo size="lg" light={true} />
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Helpaana is your trusted partner for premium doorstep services. From caregiving to professional artistry, we bring convenience to your home.
            </p>
            
            <div className="space-y-4">
              <h4 className="text-yellow-400 font-bold uppercase tracking-wider text-xs">Experience our App</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Helpaana App Badge */}
                <Link 
                  href="https://play.google.com/store/apps/details?id=com.marasappnew&hl=en_IN" 
                  target="_blank"
                  className="flex items-center gap-3 bg-black/40 hover:bg-black/60 border border-white/10 p-3 rounded-xl transition-all group"
                >
                  <FaGooglePlay className="text-3xl text-green-400 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-medium text-gray-400">Get it on</span>
                    <span className="text-sm font-bold">Helpaana App</span>
                  </div>
                </Link>

                {/* Partner App Badge */}
                <Link 
                  href="https://play.google.com/store/apps/details?id=com.Helpaana &hl=en_IN" 
                  target="_blank"
                  className="flex items-center gap-3 bg-black/40 hover:bg-black/60 border border-white/10 p-3 rounded-xl transition-all group"
                >
                  <FaGooglePlay className="text-3xl text-blue-400 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-medium text-gray-400">Download Partner</span>
                    <span className="text-sm font-bold">Helpaana Partner</span>
                  </div>
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-yellow-400 font-bold uppercase tracking-wider text-xs">Follow Our Journey</h4>
              <div className="flex gap-4">
                {[
                  { icon: Facebook, href: "https://facebook.com/helpaana", color: "hover:bg-blue-600" },
                  { icon: Instagram, href: "https://www.instagram.com/helpaana?utm_source=qr&igsh=MXE3ZWt2dHUycjZpNw%3D%3D", color: "hover:bg-pink-600" },
                  { icon: Youtube, href: "https://www.youtube.com/@helpaana?si=try2DdrCGa4JpNfl", color: "hover:bg-red-600" }
                ].map((social, i) => (
                  <Link key={i} href={social.href} className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all ${social.color}`}>
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                Services
                <div className="h-1 w-6 bg-yellow-400 rounded-full" />
              </h3>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-yellow-400 text-sm transition-colors flex items-center group">
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                Company
                <div className="h-1 w-6 bg-yellow-400 rounded-full" />
              </h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-yellow-400 text-sm transition-colors flex items-center group">
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                Other Links
                <div className="h-1 w-6 bg-yellow-400 rounded-full" />
              </h3>
              <ul className="space-y-3">
                {otherLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-yellow-400 text-sm transition-colors flex items-center group">
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                Contact Us
                <div className="h-1 w-6 bg-yellow-400 rounded-full" />
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-yellow-400 text-black shrink-0 shadow-lg shadow-yellow-400/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 uppercase font-bold mb-1">Office Location</span>
                    <span className="text-sm">NX One T3 - B111, Noida Extension - 201318</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-orange-500 text-white shrink-0 shadow-lg shadow-orange-500/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 uppercase font-bold mb-1">Helpline</span>
                    <a href="tel:+918887796224" className="text-sm block hover:text-yellow-400">+91 8887796224</a>
                    <a href="tel:01204978652" className="text-sm block hover:text-yellow-400">0120 - 4978652</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-500 text-white shrink-0 shadow-lg shadow-blue-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 uppercase font-bold mb-1">Email Support</span>
                    <a href="mailto:support@helpaana.com" className="text-sm hover:text-yellow-400">support@helpaana.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs">
          <p>&copy; {new Date().getFullYear()} Helpaana Services. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-yellow-400">Terms of Use</Link>
            <Link href="/privacy-policy" className="hover:text-yellow-400">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-yellow-400">Cookies Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
