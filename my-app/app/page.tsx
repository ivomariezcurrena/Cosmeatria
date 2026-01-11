"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Producto, CATEGORIAS } from "./types/producto";

const LOCALE = "en-US";

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await fetch("/api/productos?page=1&limit=6");
        if (!response.ok) throw new Error("Error al cargar productos");
        const data = await response.json();
        const productosFormateados = data.productos.map((p: any) => ({
          ...p,
          id: p._id,
        }));
        setProductos(productosFormateados);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  return (
    <main className="pt-[60px]">
      <section className="min-h-[85vh] grid grid-cols-1 items-center gap-12 py-16 px-8 bg-[#f5f5f7] relative md:[grid-template-columns:1fr_1.2fr] md:py-16 md:px-16">
        <div className="text-center z-10 md:text-left">
          <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-bold mb-4 leading-[1.1] text-[#1d1d1f] tracking-[-0.02em]">
            El mundo del celular
          </h1>
          <p className="text-[clamp(1.1rem,2.5vw,1.75rem)] text-[#6e6e73] leading-6 max-w-[600px] mx-auto md:mx-0">
            iPhone, fundas, AirPods y más en un solo lugar
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/apl.svg"
            alt="iPhones"
            width={900}
            height={600}
            className="w-full h-auto max-w-[900px] md:max-w-[750px] lg:max-w-[900px]"
          />
        </div>
      </section>

      <section id="products" className="py-24 px-8 bg-[var(--color-bg)]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-center mb-4">
            Ultimos ingresos
          </h2>
          <p className="text-center text-[#86868b] text-lg mb-16">
            Descubre nuestra selección de productos premium
          </p>

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0071e3] mx-auto mb-4"></div>
              <p className="text-[#86868b]">Cargando productos...</p>
            </div>
          ) : productos.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#86868b] text-lg mb-4">
                No hay productos disponibles
              </p>
              <p className="text-[#86868b]">
                Próximamente agregaremos nuevos productos increíbles
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {productos.map((producto) => (
                  <Link
                    key={producto.id}
                    href={`/productos/${producto.id}`}
                    className="bg-[var(--color-surface)] rounded-2xl shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:shadow-lg overflow-hidden no-underline group"
                  >
                    <div className="aspect-square bg-[#f5f5f7] flex items-center justify-center p-8">
                      <img
                        src={producto.imagen_url}
                        alt={producto.nombre}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-[#0071e3] font-medium mb-2 uppercase tracking-wide">
                        {CATEGORIAS[producto.categoria].nombre}
                      </div>
                      <h3 className="text-xl mb-2 font-semibold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
                        {producto.nombre}
                      </h3>
                      <p className="text-[#86868b] leading-6 text-sm mb-4 line-clamp-2">
                        {producto.descripcion}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-semibold text-[#1d1d1f]">
                          USD ${producto.precio.toLocaleString(LOCALE)}
                        </span>
                        <span className="text-[#0071e3] text-sm font-medium">
                          Ver más →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  href="/productos"
                  className="inline-block bg-[#0071e3] text-white py-3 px-8 rounded-[980px] font-medium text-[15px] transition-all hover:bg-[#0077ed] active:scale-[0.97] shadow-sm no-underline"
                >
                  Ver todos los productos
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="py-24 px-8 bg-[var(--color-surface)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-8">
              Más que una tienda, una familia
            </h2>
            <p className="text-lg text-[#86868b] mb-8 leading-8">
              En El Mundo del Celular nos apasiona conectarte con la mejor
              tecnología. Somos tu destino de confianza para productos de
              calidad, con atención personalizada y el compromiso de hacer que
              cada compra sea una experiencia excepcional.
            </p>
            <a
              href="/nosotros"
              className="text-[var(--color-accent)] no-underline text-lg font-medium transition-transform transform inline-block hover:translate-x-2"
            >
              Conoce nuestra historia →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
