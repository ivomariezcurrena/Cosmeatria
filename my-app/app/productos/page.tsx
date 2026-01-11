"use client";

import { useState, useEffect, useRef } from "react";
import useProductos from "../hooks/useProductos";

export default function ProductosPage() {
  const {
    productos,
    error,
    searchTerm,
    setSearchTerm,
    cargarMasProductos,
    cargando,
    hayMas,
  } = useProductos();

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hayMas && !cargando) {
          cargarMasProductos();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hayMas, cargando, cargarMasProductos]);

  return (
    <main className="pt-[60px] min-h-screen bg-[#faf9f7]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#a0826d] to-[#8b6f5e] text-white py-12 sm:py-16 md:py-20 px-4 md:px-8 text-center">
        <div className="max-w-[1400px] mx-auto">
          <span className="inline-block text-white/80 text-xs md:text-sm font-medium tracking-[0.15em] md:tracking-[0.2em] uppercase mb-3 md:mb-4">
            Nuestros Servicios
          </span>
          <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-light mb-3 md:mb-4 tracking-[-0.01em] leading-[1.1]">
            Tratamientos especializados
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-[1.3rem] opacity-90 font-normal max-w-2xl mx-auto px-4">
            Descubre nuestros servicios de dermatología cosmética
          </p>
        </div>
      </section>

      {/* Error Section */}
      {error && (
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="bg-[#fff3cd] border border-[#ffc107] rounded-2xl p-8 text-center text-[#856404]">
              <p className="mb-2">⚠️ {error}</p>
              <p className="text-sm opacity-80">Error al cargar servicios </p>
            </div>
          </div>
        </section>
      )}

      {/* Buscador - Siempre visible cuando no hay error */}
      {!error && (
        <section className="py-4 md:py-8 bg-white border-b border-[#e0d8d0]">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="relative max-w-[600px] mx-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 md:py-3.5 pr-12 pl-4 md:pl-5 border border-[#e0d8d0] rounded-lg md:rounded-xl text-sm md:text-base bg-[#faf9f7] transition-all focus:outline-none focus:bg-white focus:border-[#a0826d] focus:shadow-[0_0_0_3px_rgba(160,130,109,0.1)]"
                placeholder="Buscar servicios..."
              />
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a0826d]/50 pointer-events-none"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!error && productos.length === 0 && (
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="text-center py-16 px-8">
              <h2 className="text-[1.8rem] mb-4 text-[#2d2d2d] font-light">
                No hay servicios disponibles
              </h2>
              <p className="text-[#6b6b6b] text-lg">
                {searchTerm
                  ? "No se encontraron servicios con ese término de búsqueda"
                  : "Próximamente agregaremos nuevos tratamientos"}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Grid de servicios */}
      {!error && productos.length > 0 && (
        <section className="py-8 md:py-12 lg:py-16">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
              {productos.map((producto) => (
                <article
                  key={producto.id}
                  className="bg-white rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] border border-[#e0d8d0]/50 hover:shadow-[0_8px_24px_rgba(160,130,109,0.15)] hover:border-[#a0826d]/30"
                >
                  <a
                    href={`/productos/${producto.id}`}
                    className="no-underline text-inherit block"
                  >
                    {/* Imagen del servicio */}
                    <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#f5f1ed]">
                      {producto.imagen_url ? (
                        <img
                          src={producto.imagen_url}
                          alt={producto.nombre}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#a0826d]/30">
                          <svg
                            width="80"
                            height="80"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="py-4 px-4 sm:py-5 sm:px-5 md:px-6">
                      <h3 className="text-base sm:text-[1.0625rem] md:text-lg font-medium mb-2 text-[#2d2d2d] leading-[1.3] tracking-[-0.01em]">
                        {producto.nombre}
                      </h3>
                      <p className="text-[#6b6b6b] text-sm leading-[1.5] md:leading-[1.4] mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                        {producto.descripcion}
                      </p>
                      <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[#e0d8d0]/50">
                        <span className="text-base sm:text-lg md:text-xl font-semibold text-[#2d2d2d] tracking-[-0.01em]">
                          ${producto.precio.toLocaleString("es-AR")}
                        </span>
                        <span className="text-[#a0826d] text-xs sm:text-sm font-medium transition-all hover:translate-x-1">
                          Ver más →
                        </span>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>

            {/* Indicador de scroll infinito */}
            <div ref={observerTarget} className="py-8 text-center">
              {cargando && (
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#a0826d]"></div>
              )}
              {!hayMas && productos.length > 0 && (
                <p className="text-[#6b6b6b] text-sm">
                  Todos los servicios cargados
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
