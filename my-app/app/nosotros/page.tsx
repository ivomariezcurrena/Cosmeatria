"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NosotrosPage() {
  return (
    <main className="pt-[60px]">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center px-6 bg-gradient-to-br from-[#faf9f7] via-[#f5f1ed] to-[#ede8e3] relative overflow-hidden">
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
              Acerca de Mí
            </span>
          </motion.div>
          <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-light mb-6 leading-[1.1] text-[#2d2d2d] tracking-[-0.02em]">
            Tu piel, mi pasión
          </h1>
          <p className="text-[clamp(1rem,2vw,1.3rem)] text-[#6b6b6b] leading-relaxed max-w-2xl mx-auto">
            Experta en dermatología cosmética dedicada a realzar tu belleza
            natural
          </p>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#d4b5a0]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#a0826d]/10 rounded-full blur-3xl"></div>
      </section>

      {/* Historia Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-light text-[#2d2d2d] mb-6">
                Una vocación de servicio
              </h2>
              <div className="space-y-4 text-[#6b6b6b] leading-relaxed">
                <p>
                  Como dermatóloga cosmética certificada, mi compromiso es
                  ofrecerte tratamientos personalizados que respeten la
                  naturaleza única de tu piel.
                </p>
                <p>
                  Con más de 10 años de experiencia y formación continua en las
                  técnicas más avanzadas, me especializo en procedimientos no
                  invasivos que realzan tu belleza natural sin comprometer la
                  salud de tu piel.
                </p>
                <p>
                  Cada tratamiento es diseñado específicamente para ti,
                  combinando ciencia, arte y un profundo entendimiento de las
                  necesidades individuales de cada paciente.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] bg-gradient-to-br from-[#a0826d]/20 to-[#d4b5a0]/20 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80"
                  alt="Dra. Cosmeatría"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-24 px-6 bg-[#faf9f7]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-[#a0826d] text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Mis Valores
            </span>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-light text-[#2d2d2d] mb-4">
              Lo que me define
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                titulo: "Profesionalismo",
                descripcion:
                  "Formación continua y uso de tecnología de vanguardia para ofrecer los mejores resultados.",
                icon: "🎓",
              },
              {
                titulo: "Personalización",
                descripcion:
                  "Cada tratamiento es único, diseñado específicamente para tus necesidades y objetivos.",
                icon: "✨",
              },
              {
                titulo: "Cuidado Integral",
                descripcion:
                  "Una visión holística de la belleza que prioriza la salud y el bienestar de tu piel.",
                icon: "💚",
              },
            ].map((valor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-[#a0826d]/10"
              >
                <div className="text-4xl mb-4">{valor.icon}</div>
                <h3 className="text-xl font-medium text-[#2d2d2d] mb-3">
                  {valor.titulo}
                </h3>
                <p className="text-[#6b6b6b] leading-relaxed text-sm">
                  {valor.descripcion}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificaciones */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-[#a0826d] text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Formación
            </span>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-light text-[#2d2d2d] mb-4">
              Certificaciones y Estudios
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                titulo: "Médica Dermatóloga",
                institucion: "Universidad de Buenos Aires",
                año: "2012",
              },
              {
                titulo: "Especialización en Dermatología Cosmética",
                institucion: "Sociedad Argentina de Dermatología",
                año: "2015",
              },
              {
                titulo: "Certificación en Tratamientos con Láser",
                institucion: "Instituto Internacional de Láser",
                año: "2018",
              },
              {
                titulo: "Diplomado en Medicina Estética",
                institucion: "Asociación Mundial de Medicina Estética",
                año: "2020",
              },
            ].map((cert, index) => (
              <div
                key={index}
                className="bg-[#faf9f7] p-6 rounded-xl border-l-4 border-[#a0826d]"
              >
                <h3 className="text-lg font-medium text-[#2d2d2d] mb-2">
                  {cert.titulo}
                </h3>
                <div className="flex justify-between items-center text-sm text-[#6b6b6b]">
                  <span>{cert.institucion}</span>
                  <span className="font-medium text-[#a0826d]">{cert.año}</span>
                </div>
              </div>
            ))}
          </motion.div>
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
            ¿Lista para transformar tu piel?
          </h2>
          <p className="text-lg mb-10 opacity-90 leading-relaxed">
            Agenda tu consulta personalizada y descubre cómo puedo ayudarte a
            alcanzar tus objetivos de belleza
          </p>
          <Link
            href="https://wa.me/5491165874209"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#a0826d] py-4 px-10 rounded-full font-medium text-[15px] transition-all hover:bg-[#f5f1ed] hover:shadow-2xl hover:scale-105 active:scale-95 no-underline"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Contactar por WhatsApp
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
