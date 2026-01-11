"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import useProductos from "../hooks/useProductos";
import { CATEGORIAS } from "../types/producto";

const LOCALE = "en-US";

export default function ProductosPage() {
  const {
    productos,
    error,
    searchTerm,
    setSearchTerm,
    categoriaActiva,
    setCategoriaActiva,
    obtenerProductosVisibles,
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
    <main className="pt-[60px] min-h-screen bg-[#fbfbfd]">
      {/* Hero Section */}
      <section className="bg-[#1d1d1f] text-white py-16 px-8 text-center">
        <div className="max-w-[1400px] mx-auto px-8">
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-semibold mb-2 tracking-[-0.01em]">
            Nuestra colección
          </h1>
          <p className="text-[clamp(1.1rem,2vw,1.5rem)] opacity-80 font-normal">
            Encuentra el producto perfecto para ti
          </p>
        </div>
      </section>

      {/* Error Section */}
      {error && (
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="bg-[#fff3cd] border border-[#ffc107] rounded-2xl p-8 text-center text-[#856404]">
              <p className="mb-2">⚠️ {error}</p>
              <p className="text-sm opacity-80">Error al cargar productos </p>
            </div>
          </div>
        </section>
      )}

      {/* Buscador y Categorías - Siempre visibles cuando no hay error */}
      {!error && (
        <>
          {/* Buscador */}
          <section className="py-8 bg-white border-b border-[#d2d2d7]">
            <div className="max-w-[1400px] mx-auto px-8">
              <div className="relative max-w-[600px] mx-auto">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3.5 pr-12 pl-5 border border-[#d2d2d7] rounded-xl text-base bg-[#f5f5f7] transition-all focus:outline-none focus:bg-white focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.1)]"
                  placeholder="Buscar productos..."
                />
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#86868b] pointer-events-none"
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

          {/* Pestañas de categorías */}
          <section className="bg-white border-b border-[#d2d2d7] sticky top-[60px] z-[100] hidden md:block">
            <div className="max-w-[1400px] mx-auto px-8">
              <div className="flex gap-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <button
                  onClick={() => setCategoriaActiva("todos")}
                  className={`bg-transparent border-0 border-b-2 py-5 px-6 text-sm font-normal cursor-pointer transition-all whitespace-nowrap tracking-[-0.01em] ${
                    categoriaActiva === "todos"
                      ? "text-[var(--color-text)] border-b-[var(--color-text)]"
                      : "text-[#6e6e73] border-b-transparent hover:text-[var(--color-text)]"
                  }`}
                >
                  Todos
                </button>
                {Object.entries(CATEGORIAS).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setCategoriaActiva(key)}
                    className={`bg-transparent border-0 border-b-2 py-5 px-6 text-sm font-normal cursor-pointer transition-all whitespace-nowrap tracking-[-0.01em] ${
                      categoriaActiva === key
                        ? "text-[var(--color-text)] border-b-[var(--color-text)]"
                        : "text-[#6e6e73] border-b-transparent hover:text-[var(--color-text)]"
                    }`}
                  >
                    {value.nombre}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Empty State */}
      {!error && productos.length === 0 && (
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="text-center py-16 px-8">
              <h2 className="text-[1.8rem] mb-4 text-[var(--color-text)]">
                No hay productos disponibles
              </h2>
              <p className="text-[#86868b] text-lg">
                Próximamente agregaremos nuevos productos increíbles
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Secciones de productos */}
      {!error && productos.length > 0 && (
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-8">
            {obtenerProductosVisibles().map(
              ({ categoria, productos: productosCategoria }) => {
                if (productosCategoria.length === 0) return null;

                return (
                  <div key={categoria} className="mb-0">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5">
                      {productosCategoria.map((producto) => (
                        <article
                          key={producto.id}
                          className="bg-white rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] border border-[#d2d2d7] md:border-transparent hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:border-[#d2d2d7]"
                        >
                          <a
                            href={`/productos/${producto.id}`}
                            className="no-underline text-inherit block"
                          >
                            <div className="w-full aspect-square bg-white md:bg-[#fbfbfd] flex items-center justify-center p-8 overflow-hidden">
                              <Image
                                src={producto.imagen_url}
                                alt={producto.nombre}
                                width={800}
                                height={800}
                                loading="lazy"
                                className="w-full h-full object-contain transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.04]"
                              />
                            </div>
                            <div className="py-5 px-6">
                              <p className="text-xs font-medium text-[#f56300] uppercase tracking-[0.05em] mb-1 md:mb-2">
                                {CATEGORIAS[producto.categoria].nombre}
                              </p>
                              <h3 className="text-[1.0625rem] md:text-lg font-semibold mb-1 md:mb-2 text-[var(--color-text)] leading-[1.3] tracking-[-0.01em]">
                                {producto.nombre}
                              </h3>
                              <p className="text-[#86868b] text-sm leading-[1.5] md:leading-[1.4] mb-4 line-clamp-3 md:line-clamp-2 md:min-h-[2.4rem]">
                                {producto.descripcion}
                              </p>
                              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#f5f5f7]">
                                <span className="text-lg md:text-xl font-semibold text-[var(--color-text)] tracking-[-0.01em]">
                                  USD ${producto.precio.toLocaleString(LOCALE)}
                                </span>
                              </div>
                            </div>
                          </a>
                          <div className="px-6 pb-5 hidden md:block">
                            <a
                              href={`https://wa.me/5492804191184?text=Hola!%20Estoy%20interesado%20en%20${encodeURIComponent(
                                producto.nombre
                              )}%20-%20USD%20$${
                                producto.precio
                              }%0A%0A${encodeURIComponent(
                                `${window.location.origin}/productos/${producto.id}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block w-full bg-[#25D366] text-white text-center border-0 py-2 px-5 rounded-[980px] font-medium text-sm cursor-pointer transition-all no-underline hover:bg-[#20BA5A] active:scale-[0.96]"
                            >
                              Contactar por WhatsApp
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                );
              }
            )}

            {/* Indicador de carga y sentinel para infinite scroll */}
            <div ref={observerTarget} className="w-full py-8">
              {cargando && (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0071e3] mx-auto mb-3"></div>
                  <p className="text-[#86868b] text-sm">
                    Cargando más productos...
                  </p>
                </div>
              )}
              {!cargando && !hayMas && productos.length > 0 && (
                <div className="text-center">
                  <p className="text-[#86868b] text-sm">
                    Has visto todos los productos
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
