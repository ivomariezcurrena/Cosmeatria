import Link from "next/link";

export default function NosotrosPage() {
  return (
    <main className="pt-[60px] min-h-screen bg-[#fbfbfd]">
      {/* Hero Section */}
      <section className="bg-[#1d1d1f] text-white py-16 px-8 text-center">
        <div className="max-w-[1400px] mx-auto px-8">
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-semibold mb-2 tracking-[-0.01em]">
            Nosotros
          </h1>
          <p className="text-[clamp(1.1rem,2vw,1.5rem)] opacity-80 font-normal">
            Tu destino de confianza para productos Apple de calidad
          </p>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-20 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#1d1d1f] mb-6 tracking-[-0.01em]">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-lg text-[#1d1d1f] leading-relaxed">
                <p>
                  Desde nuestros inicios, nos hemos dedicado a ofrecer lo mejor
                  del ecosistema Apple a nuestros clientes. Comenzamos como un
                  pequeño emprendimiento con una gran pasión por la tecnología y
                  el diseño.
                </p>
                <p>
                  Hoy, somos el punto de referencia para quienes buscan iPhones
                  de la más alta calidad. Cada producto que ofrecemos es
                  seleccionado cuidadosamente para garantizar la mejor
                  experiencia.
                </p>
                <p>
                  Nuestro compromiso es simple: brindarte productos auténticos,
                  precios justos y un servicio al cliente excepcional.
                </p>
              </div>
            </div>
            <div className="bg-[#f5f5f7] rounded-2xl p-12 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="text-8xl mb-6">📱</div>
                <p className="text-xl font-semibold text-[#1d1d1f]">
                  Más de 1000 clientes satisfechos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#1d1d1f] mb-12 text-center tracking-[-0.01em]">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Valor 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#0071e3] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">
                Calidad Garantizada
              </h3>
              <p className="text-[#86868b] leading-relaxed">
                Solo ofrecemos productos originales y de la más alta calidad. Tu
                satisfacción es nuestra prioridad.
              </p>
            </div>

            {/* Valor 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#0071e3] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">
                Atención Personalizada
              </h3>
              <p className="text-[#86868b] leading-relaxed">
                Cada cliente es único. Te asesoramos para que encuentres
                exactamente lo que necesitas.
              </p>
            </div>

            {/* Valor 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#0071e3] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">
                Rapidez y Confianza
              </h3>
              <p className="text-[#86868b] leading-relaxed">
                Respuestas rápidas y un servicio confiable. Estamos aquí para
                ayudarte en todo momento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-20 px-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#1d1d1f] mb-12 text-center tracking-[-0.01em]">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Beneficio 1 */}
            <div className="bg-white rounded-2xl p-8 border border-[#d2d2d7]">
              <div className="flex items-start gap-4">
                <div className="text-3xl">✓</div>
                <div>
                  <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">
                    Productos Verificados
                  </h3>
                  <p className="text-[#86868b]">
                    Todos nuestros productos son auténticos y están en perfectas
                    condiciones.
                  </p>
                </div>
              </div>
            </div>

            {/* Beneficio 2 */}
            <div className="bg-white rounded-2xl p-8 border border-[#d2d2d7]">
              <div className="flex items-start gap-4">
                <div className="text-3xl">✓</div>
                <div>
                  <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">
                    Precios Competitivos
                  </h3>
                  <p className="text-[#86868b]">
                    Ofrecemos los mejores precios del mercado sin comprometer la
                    calidad.
                  </p>
                </div>
              </div>
            </div>

            {/* Beneficio 3 */}
            <div className="bg-white rounded-2xl p-8 border border-[#d2d2d7]">
              <div className="flex items-start gap-4">
                <div className="text-3xl">✓</div>
                <div>
                  <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">
                    Asesoramiento Experto
                  </h3>
                  <p className="text-[#86868b]">
                    Nuestro equipo conoce cada producto y te ayuda a elegir el
                    mejor.
                  </p>
                </div>
              </div>
            </div>

            {/* Beneficio 4 */}
            <div className="bg-white rounded-2xl p-8 border border-[#d2d2d7]">
              <div className="flex items-start gap-4">
                <div className="text-3xl">✓</div>
                <div>
                  <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">
                    Respuesta Inmediata
                  </h3>
                  <p className="text-[#86868b]">
                    Respondemos tus consultas rápidamente por WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-8 bg-[#1d1d1f] text-white">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-6 tracking-[-0.01em]">
            ¿Listo para encontrar tu próximo dispositivo?
          </h2>
          <p className="text-xl opacity-80 mb-8">
            Explora nuestra colección y descubre productos increíbles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/productos"
              className="inline-flex items-center justify-center bg-[#0071e3] text-white py-4 px-8 rounded-xl font-semibold text-base transition-all hover:bg-[#0077ed] active:scale-[0.98] no-underline"
            >
              Ver Productos
            </Link>
            <a
              href="https://wa.me/5491165874209"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 px-8 rounded-xl font-semibold text-base transition-all hover:bg-[#20BA5A] active:scale-[0.98] no-underline"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Contactar
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
