"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const servicios = [
  {
    id: 1,
    titulo: "Tratamientos Faciales",
    descripcion: "Tratamientos personalizados para rejuvenecer y revitalizar tu piel con tecnología de última generación.",
    icon: "✨",
  },
  {
    id: 2,
    titulo: "Dermatología Cosmética",
    descripcion: "Procedimientos especializados para tratar manchas, cicatrices y mejorar la textura de tu piel.",
    icon: "💎",
  },
  {
    id: 3,
    titulo: "Tratamientos Corporales",
    descripcion: "Soluciones integrales para el cuidado de tu piel corporal, contorneo y rejuvenecimiento.",
    icon: "🌸",
  },
  {
    id: 4,
    titulo: "Peeling Químico",
    descripcion: "Renovación profunda de la piel para un aspecto luminoso y uniforme.",
    icon: "✨",
  },
  {
    id: 5,
    titulo: "Rellenos y Botox",
    descripcion: "Procedimientos estéticos para suavizar líneas de expresión y realzar tu belleza natural.",
    icon: "💫",
  },
  {
    id: 6,
    titulo: "Láser Dermatológico",
    descripcion: "Tecnología láser avanzada para rejuvenecimiento, eliminación de manchas y más.",
    icon: "⚡",
  },
];

const trabajosDestacados = [
  {
    id: 1,
    titulo: "Rejuvenecimiento Facial",
    imagen: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
  },
  {
    id: 2,
    titulo: "Tratamiento de Acné",
    imagen: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",
  },
  {
    id: 3,
    titulo: "Hidratación Profunda",
    imagen: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80",
  },
];

export default function Home() {
  return (
    <main className="pt-[60px]">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center px-6 bg-gradient-to-br from-[#faf9f7] via-[#f5f1ed] to-[#ede8e3] relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block text-[#a0826d] text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Dermatología Cosmética
            </span>
          </motion.div>
          <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-light mb-6 leading-[1.1] text-[#2d2d2d] tracking-[-0.02em]">
            Realza tu belleza natural
          </h1>
          <p className="text-[clamp(1rem,2vw,1.3rem)] text-[#6b6b6b] leading-relaxed max-w-2xl mx-auto mb-10">
            Tratamientos dermatológicos personalizados con tecnología de vanguardia para el cuidado integral de tu piel
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link
              href="#servicios"
              className="inline-block bg-[#a0826d] text-white py-4 px-10 rounded-full font-medium text-[15px] transition-all hover:bg-[#8b6f5e] hover:shadow-lg hover:scale-105 active:scale-95 no-underline"
            >
              Ver Servicios
            </Link>
            <Link
              href="#trabajos"
              className="inline-block bg-white text-[#a0826d] py-4 px-10 rounded-full font-medium text-[15px] transition-all hover:bg-[#f5f1ed] hover:shadow-lg hover:scale-105 active:scale-95 no-underline border border-[#a0826d]/20"
            >
              Ver Trabajo
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#d4b5a0]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#a0826d]/10 rounded-full blur-3xl"></div>
      </section>

      {/* Trabajos Destacados Section */}
      <section id="trabajos" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-[#a0826d] text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Portafolio
            </span>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-light text-[#2d2d2d] mb-4">
              Resultados que transforman
            </h2>
            <p className="text-[#6b6b6b] text-lg max-w-2xl mx-auto">
              Descubre el impacto de nuestros tratamientos especializados
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trabajosDestacados.map((trabajo, index) => (
              <motion.div
                key={trabajo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-4">
                  <img
                    src={trabajo.imagen}
                    alt={trabajo.titulo}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2d2d2d]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <h3 className="text-xl font-light text-[#2d2d2d] text-center group-hover:text-[#a0826d] transition-colors">
                  {trabajo.titulo}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="py-24 px-6 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-[#a0826d] text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Servicios
            </span>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-light text-[#2d2d2d] mb-4">
              Cuidado personalizado
            </h2>
            <p className="text-[#6b6b6b] text-lg max-w-2xl mx-auto">
              Tratamientos diseñados especialmente para tus necesidades
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicios.map((servicio, index) => (
              <motion.div
                key={servicio.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-[#a0826d]/10"
              >
                <div className="text-4xl mb-4">{servicio.icon}</div>
                <h3 className="text-xl font-medium text-[#2d2d2d] mb-3">
                  {servicio.titulo}
                </h3>
                <p className="text-[#6b6b6b] leading-relaxed text-sm">
                  {servicio.descripcion}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#a0826d] to-[#8b6f5e] text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-light mb-6">
            Agenda tu consulta
          </h2>
          <p className="text-lg mb-10 opacity-90 leading-relaxed">
            Comienza tu camino hacia una piel saludable y radiante. Estoy aquí para ayudarte a alcanzar tus objetivos de belleza y bienestar.
          </p>
          <Link
            href="/nosotros"
            className="inline-block bg-white text-[#a0826d] py-4 px-10 rounded-full font-medium text-[15px] transition-all hover:bg-[#f5f1ed] hover:shadow-2xl hover:scale-105 active:scale-95 no-underline"
          >
            Conocer más
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
