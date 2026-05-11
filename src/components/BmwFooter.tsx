"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { logoPlain } from "@/utils";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  Models: ["M3 Sedan", "M4 Coupe", "M4 Convertible", "M4 CSL", "M4 GT3"],
  Performance: [
    "M xDrive",
    "M Sport",
    "M TwinPower Turbo",
    "M Carbon Package",
    "Adaptive M Suspension",
  ],
  Company: ["About BMW M", "Motorsport", "Careers", "Press", "Investors"],
  Support: [
    "Book a Test Drive",
    "Find a Dealer",
    "Ownership",
    "M Service",
    "Warranty",
  ],
};

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

const BmwFooter = () => {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".footer-col",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".footer-links-grid",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".footer-bottom-bar",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-bottom-bar",
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative bg-[#040404] w-screen overflow-hidden border-t border-white/[0.05]"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808] to-[#040404] pointer-events-none" />

      {/* Top section: logo + tagline + newsletter */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 pt-16 lg:pt-20 pb-12 border-b border-white/[0.05]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          {/* Logo + tagline */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image
                src={logoPlain}
                alt="BMW logo"
                width={44}
                height={44}
                className="opacity-90"
              />
              <div>
                <p className="text-white font-black text-xl tracking-widest uppercase">
                  BMW
                </p>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] -mt-0.5">
                  M Performance
                </p>
              </div>
            </div>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed mt-4">
              The Ultimate Driving Machine. Born on the track, bred for the
              road.
            </p>
          </div>

          {/* Newsletter */}
          <div className="w-full lg:w-auto">
            <p className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-3">
              Stay in the fast lane
            </p>
            <div className="flex items-center gap-2">
              <input
                id="footer-email"
                type="email"
                placeholder="your@email.com"
                className="bg-white/[0.05] border border-white/[0.1] text-white placeholder-white/25 text-sm px-4 py-3 rounded-xl outline-none focus:border-blue-500/60 focus:bg-blue-600/5 transition-all duration-300 w-64"
              />
              <button
                id="footer-subscribe"
                className="group relative overflow-hidden bg-blue-600 hover:bg-blue-500 active:scale-[0.97] text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-xl border border-blue-500/60 hover:border-blue-400/80 hover:shadow-[0_0_28px_-6px_rgba(59,130,246,0.5)] transition-all duration-300 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.16] to-transparent opacity-0 transition-all duration-700 group-hover:left-[140%] group-hover:opacity-100"
                />
                <span className="relative inline-flex overflow-hidden">
                  <span className="block transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">Subscribe</span>
                  <span className="absolute block translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">Subscribe</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 py-14">
        <div className="footer-links-grid grid grid-cols-2 md:grid-cols-4 gap-10">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="footer-col opacity-0">
              <p className="text-[10px] text-white/50 uppercase tracking-[0.25em] font-bold mb-5">
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/35 text-sm hover:text-white transition-colors duration-200 hover:translate-x-1 inline-flex items-center gap-1.5 group"
                    >
                      <span className="w-0 h-[1px] bg-blue-500 group-hover:w-3 transition-all duration-300 rounded-full" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom-bar relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 py-6 border-t border-white/[0.05] opacity-0">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Left */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="text-white/20 text-xs">
              © 2024 BMW M GmbH. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {["Privacy", "Legal", "Cookies", "Accessibility"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white/25 text-xs hover:text-white/60 transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-white/30 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/40 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Big watermark text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <p className="text-white/[0.018] font-black text-[10vw] uppercase tracking-tighter leading-none text-center">
          BMW M4 Competition
        </p>
      </div>
    </footer>
  );
};

export default BmwFooter;
