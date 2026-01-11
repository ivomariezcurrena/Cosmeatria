export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen_url: string;
}

export interface ProductoFormData {
  nombre: string;
  descripcion: string;
  precio: string;
  imagen_url: string;
}