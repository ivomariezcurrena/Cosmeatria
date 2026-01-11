"use client";

import Link from "next/link";
import useDetailProducto from "@/app/hooks/useDetailProducto";

export default function ProductoDetallePage() {
  const { producto, error, loading } = useDetailProducto();

  if (loading) {
    return (
      <main className="pt-[60px] min-h-screen bg-[#faf9f7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a0826d] mx-auto mb-4"></div>
          <p className="text-[#6b6b6b]">Cargando servicio...</p>
        </div>
      </main>
    );
  }

  if (error || !producto) {
    return (
      <main className="pt-[60px] min-h-screen bg-[#faf9f7]">
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="bg-[#fff3cd] border border-[#ffc107] rounded-2xl p-8 text-center text-[#856404]">
              <p className="mb-2">⚠️ Servicio no encontrado</p>
              <Link
                href="/productos"
                className="text-[#a0826d] underline hover:no-underline"
              >
                Volver a servicios
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-[60px] min-h-screen bg-[#faf9f7]">
      {/* Breadcrumb */}
      <section className="bg-white border-b border-[#e0d8d0] py-3 md:py-4">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 text-xs md:text-sm overflow-x-auto">
            <Link
              href="/"
              className="text-[#a0826d] no-underline hover:underline whitespace-nowrap"
            >
              Inicio
            </Link>
            <span className="text-[#6b6b6b]">/</span>
            <Link
              href="/productos"
              className="text-[#a0826d] no-underline hover:underline whitespace-nowrap"
            >
              Servicios
            </Link>
            <span className="text-[#6b6b6b]">/</span>
            <span className="text-[#2d2d2d] truncate">{producto.nombre}</span>
          </div>
        </div>
      </section>

      {/* Producto Detail */}
      <section className="py-6 md:py-12 lg:py-16">
        <div className="max-w-[980px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-[#e0d8d0]/30">
            {/* Imagen del servicio */}
            {producto.imagen_url && (
              <div className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] overflow-hidden bg-[#f5f1ed]">
                <img
                  src={producto.imagen_url}
                  alt={producto.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Información del producto */}
            <div className="p-5 sm:p-6 md:p-8 lg:p-12">
              <div className="mb-6 md:mb-8">
                <h1 className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-light text-[#2d2d2d] leading-[1.2] md:leading-[1.1] tracking-[-0.02em] mb-3 md:mb-4">
                  {producto.nombre}
                </h1>
                <p className="text-base md:text-lg text-[#6b6b6b] leading-[1.6] mb-5 md:mb-6">
                  {producto.descripcion}
                </p>
                <div className="text-[2rem] sm:text-[2.25rem] md:text-[2.5rem] font-light text-[#2d2d2d] tracking-[-0.02em] mb-6 md:mb-8">
                  ${producto.precio.toLocaleString("es-AR")}
                </div>
              </div>

              {/* Botón de WhatsApp */}
              <div className="mb-8 md:mb-12">
                <a
                  href={`https://wa.me/5492805058054?text=${encodeURIComponent(
                    `Hola! Me interesa el servicio de ${
                      producto.nombre
                    } - $${producto.precio.toLocaleString("es-AR")}\n\n${
                      typeof window !== "undefined" ? window.location.href : ""
                    }`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 md:gap-3 w-full bg-[#a0826d] text-white text-center border-0 py-3.5 md:py-4 px-6 md:px-8 rounded-full font-medium text-sm md:text-base cursor-pointer transition-all no-underline hover:bg-[#8b6f5e] hover:shadow-lg active:scale-[0.98]"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="md:w-6 md:h-6"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Agendar Consulta
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Volver a productos */}
      <section className="py-6 md:py-8 border-t border-[#e0d8d0]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 text-sm md:text-base text-[#a0826d] no-underline hover:underline font-medium"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10 2L4 8l6 6" />
            </svg>
            Volver a todos los servicios
          </Link>
        </div>
      </section>
    </main>
  );
}
