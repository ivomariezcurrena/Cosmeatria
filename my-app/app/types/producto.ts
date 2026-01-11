export type CategoriaProducto = "iphone" | "airpods" | "varios";

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen_url: string;
  categoria: CategoriaProducto;
  caracteristicas?: string[];
  especificaciones?: Record<string, string>;
}

export const CATEGORIAS: Record<
  CategoriaProducto,
  { nombre: string; icono?: string }
> = {
  iphone: { nombre: "iPhone"},
  airpods: { nombre: "AirPods"},
  varios: { nombre: "Varios"},
};

export interface ProductoFormData {
  nombre: string;
  descripcion: string;
  precio: string;
  imagen_url: string;
  categoria: CategoriaProducto;
  caracteristicas: string;
  especificaciones: string;
}