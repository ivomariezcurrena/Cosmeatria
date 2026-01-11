"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import useDetailProducto from "@/app/hooks/useDetailProducto";
import { CATEGORIAS } from "@/app/types/producto";

const LOCALE = "en-US";

export default function ProductoDetallePage() {
  const { producto, error, loading } = useDetailProducto();

  if (loading) {
    return (
      <main className="pt-[60px] min-h-screen bg-[#fbfbfd] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0071e3] mx-auto mb-4"></div>
          <p className="text-[#86868b]">Cargando producto...</p>
        </div>
      </main>
    );
  }

  if (error || !producto) {
    return (
      <main className="pt-[60px] min-h-screen bg-[#fbfbfd]">
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="bg-[#fff3cd] border border-[#ffc107] rounded-2xl p-8 text-center text-[#856404]">
              <p className="mb-2">⚠️ Producto no encontrado</p>
              <Link
                href="/productos"
                className="text-[#0071e3] underline hover:no-underline"
              >
                Volver a productos
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const mensajeWhatsApp = `Hola! Estoy interesado en ${
    producto.nombre
  } - USD $${producto.precio.toLocaleString(LOCALE)}

${typeof window !== "undefined" ? window.location.href : ""}`;

  return (
    <main className="pt-[60px] min-h-screen bg-[#fbfbfd]">
      {/* Breadcrumb */}
      <section className="bg-white border-b border-[#d2d2d7] py-4">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-[#0071e3] no-underline hover:underline"
            >
              Inicio
            </Link>
            <span className="text-[#86868b]">/</span>
            <Link
              href="/productos"
              className="text-[#0071e3] no-underline hover:underline"
            >
              Productos
            </Link>
            <span className="text-[#86868b]">/</span>
            <span className="text-[#1d1d1f]">{producto.nombre}</span>
          </div>
        </div>
      </section>

      {/* Producto Detail */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Imagen del producto */}
            <div className="bg-white rounded-2xl p-8 md:p-12 flex items-center justify-center">
              <div className="w-full max-w-[500px]">
                <Image
                  src={producto.imagen_url}
                  alt={producto.nombre}
                  width={800}
                  height={800}
                  priority
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Información del producto */}
            <div className="flex flex-col">
              <div className="mb-4">
                <p className="text-sm font-medium text-[#f56300] uppercase tracking-[0.05em] mb-2">
                  {CATEGORIAS[producto.categoria].nombre}
                </p>
                <h1 className="text-[2.5rem] md:text-[3rem] font-bold text-[#1d1d1f] leading-[1.1] tracking-[-0.02em] mb-4">
                  {producto.nombre}
                </h1>
                <p className="text-lg text-[#86868b] leading-[1.6] mb-6">
                  {producto.descripcion}
                </p>
                <div className="text-[2.5rem] font-bold text-[#1d1d1f] tracking-[-0.02em] mb-8">
                  USD ${producto.precio.toLocaleString(LOCALE)}
                </div>
              </div>

              {/* Botón de WhatsApp */}
              <div className="mb-12">
                <a
                  href={`https://wa.me/5492804191184?text=Hola!%20Estoy%20interesado%20en%20${encodeURIComponent(
                    producto.nombre
                  )}%20-%20USD%20$${producto.precio}%0A%0A${encodeURIComponent(
                    `${window.location.origin}/productos/${producto.id}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] text-white text-center border-0 py-4 px-8 rounded-xl font-semibold text-base cursor-pointer transition-all no-underline hover:bg-[#20BA5A] active:scale-[0.98]"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Consultar por WhatsApp
                </a>
              </div>

              {/* Características */}
              {producto.caracteristicas &&
                producto.caracteristicas.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-4">
                      Características principales
                    </h2>
                    <ul className="space-y-3">
                      {producto.caracteristicas.map((caracteristica, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-[#1d1d1f]"
                        >
                          <span className="text-[#0071e3] mt-1">✓</span>
                          <span>{caracteristica}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Especificaciones */}
              {producto.especificaciones && (
                <div>
                  <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-4">
                    Especificaciones técnicas
                  </h2>
                  <div className="bg-white rounded-xl p-6 space-y-4">
                    {Object.entries(producto.especificaciones).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex flex-col sm:flex-row sm:justify-between gap-2 pb-4 border-b border-[#f5f5f7] last:border-0 last:pb-0"
                        >
                          <span className="font-medium text-[#1d1d1f]">
                            {key}
                          </span>
                          <span className="text-[#86868b]">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Volver a productos */}
      <section className="py-8 border-t border-[#d2d2d7]">
        <div className="max-w-[1400px] mx-auto px-8">
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 text-[#0071e3] no-underline hover:underline"
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
            Volver a todos los productos
          </Link>
        </div>
      </section>
    </main>
  );
}
