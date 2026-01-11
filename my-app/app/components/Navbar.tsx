"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white/80 backdrop-blur-xl border-b border-[#d2d2d7]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-semibold text-[#1d1d1f] no-underline hover:opacity-70 transition-opacity"
          >
            El Mundo del Celular
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-normal text-[#1d1d1f] no-underline hover:text-[#0071e3] transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/productos"
              className="text-sm font-normal text-[#1d1d1f] no-underline hover:text-[#0071e3] transition-colors"
            >
              Productos
            </Link>
            <Link
              href="/nosotros"
              className="text-sm font-normal text-[#1d1d1f] no-underline hover:text-[#0071e3] transition-colors"
            >
              Nosotros
            </Link>
            <Link
              href="https://wa.me/5491165874209"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-normal text-[#1d1d1f] no-underline hover:text-[#0071e3] transition-colors"
            >
              Contacto
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center bg-transparent border-0 cursor-pointer"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-[#1d1d1f] transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-[#1d1d1f] transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-[#1d1d1f] transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t border-[#d2d2d7] transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-[300px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-base font-normal text-[#1d1d1f] no-underline hover:text-[#0071e3] transition-colors py-2"
          >
            Inicio
          </Link>
          <Link
            href="/productos"
            onClick={() => setMenuOpen(false)}
            className="text-base font-normal text-[#1d1d1f] no-underline hover:text-[#0071e3] transition-colors py-2"
          >
            Productos
          </Link>
          <Link
            href="/nosotros"
            onClick={() => setMenuOpen(false)}
            className="text-base font-normal text-[#1d1d1f] no-underline hover:text-[#0071e3] transition-colors py-2"
          >
            Nosotros
          </Link>
          <Link
            href="https://wa.me/5491165874209"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="text-base font-normal text-[#1d1d1f] no-underline hover:text-[#0071e3] transition-colors py-2"
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}
