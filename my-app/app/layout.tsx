import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andrea Hernandez Zdravcoff - Dermatología Cosmética Especializada",
  description:
    "Tratamientos dermatológicos personalizados con tecnología de vanguardia. Cuida tu piel con la mejor atención profesional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <footer>
          <div className="bg-[#2d2d2d] text-white py-12 px-8">
            <div className="max-w-[1400px] mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-light mb-4 text-[#a0826d]">
                    Andrea Hernandez Zdravcoff
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed">
                    Dermatología cosmética especializada con tecnología de
                    vanguardia para el cuidado integral de tu piel.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-4 uppercase tracking-wider text-[#a0826d]">
                    Enlaces
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="/"
                        className="opacity-70 hover:opacity-100 transition-opacity no-underline"
                      >
                        Inicio
                      </a>
                    </li>
                    <li>
                      <a
                        href="#servicios"
                        className="opacity-70 hover:opacity-100 transition-opacity no-underline"
                      >
                        Servicios
                      </a>
                    </li>
                    <li>
                      <a
                        href="#trabajos"
                        className="opacity-70 hover:opacity-100 transition-opacity no-underline"
                      >
                        Portafolio
                      </a>
                    </li>
                    <li>
                      <a
                        href="/nosotros"
                        className="opacity-70 hover:opacity-100 transition-opacity no-underline"
                      >
                        Acerca de
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-4 uppercase tracking-wider text-[#a0826d]">
                    Contacto
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="opacity-70">Puerto Madryn, Argentina</li>
                    <li>
                      <a
                        href="https://wa.me/5491165874209"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-70 hover:opacity-100 transition-opacity no-underline"
                      >
                        WhatsApp: +54 9 11 6587-4209
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-white/10 pt-6 text-center">
                <p className="text-sm opacity-60">
                  Echo por Marz Software&copy; con ❤️ para Andrea Hernandez
                  Zdravcoff. Te amo Ma! · {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
