"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white/90 backdrop-blur-xl border-b border-[#e0d8d0]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-light text-[#2d2d2d] no-underline hover:text-[#a0826d] transition-colors tracking-tight"
          >
            Andrea Hernandez Zdravcoff
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-normal text-[#2d2d2d] no-underline hover:text-[#a0826d] transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/productos"
              className="text-sm font-normal text-[#2d2d2d] no-underline hover:text-[#a0826d] transition-colors"
            >
              Servicios
            </Link>
            <Link
              href="/nosotros"
              className="text-sm font-normal text-[#2d2d2d] no-underline hover:text-[#a0826d] transition-colors"
            >
              Acerca de
            </Link>
            <Link
              href="https://wa.me/5492805058054"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#a0826d] text-white py-2 px-6 rounded-full text-sm font-medium no-underline hover:bg-[#8b6f5e] transition-all hover:shadow-md"
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
                className={`block h-0.5 bg-[#2d2d2d] transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-[#2d2d2d] transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-[#2d2d2d] transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t border-[#e0d8d0] transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-[350px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-base font-normal text-[#2d2d2d] no-underline hover:text-[#a0826d] transition-colors py-2"
          >
            Inicio
          </Link>
          <Link
            href="/productos"
            onClick={() => setMenuOpen(false)}
            className="text-base font-normal text-[#2d2d2d] no-underline hover:text-[#a0826d] transition-colors py-2"
          >
            Servicios
          </Link>
          <Link
            href="/nosotros"
            onClick={() => setMenuOpen(false)}
            className="text-base font-normal text-[#2d2d2d] no-underline hover:text-[#a0826d] transition-colors py-2"
          >
            Acerca de
          </Link>
          <Link
            href="https://wa.me/5492805058054"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="bg-[#a0826d] text-white text-center py-3 px-6 rounded-full text-base font-medium no-underline hover:bg-[#8b6f5e] transition-all"
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}
