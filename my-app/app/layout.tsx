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
  title: "El Mundo del Celular - iPhone, Fundas, AirPods y más",
  description:
    "Encuentra los mejores productos Apple en un solo lugar. iPhone, fundas, AirPods y accesorios.",
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
          <div className="bg-[#1d1d1f] text-white py-6 px-8 text-center">
            <div className="max-w-[1400px] mx-auto px-8">
              <p className="text-sm opacity-80">
                Echo por Marz Software&copy; con ❤️ para El Mundo del Celular
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
