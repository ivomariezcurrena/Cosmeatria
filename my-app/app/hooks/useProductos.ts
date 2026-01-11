import { useEffect, useState, useCallback } from "react";
import { CATEGORIAS, Producto, CategoriaProducto } from "../types/producto";

const PRODUCTOS_POR_PAGINA = 12;

export default function useProductos() {
      const [productos, setProductos] = useState<Producto[]>([]);
      const [todosLosProductos, setTodosLosProductos] = useState<Producto[]>([]);
      const [error, setError] = useState<string>("");
      const [searchTerm, setSearchTerm] = useState("");
      const [categoriaActiva, setCategoriaActiva] = useState<string>("todos");
      const [paginaActual, setPaginaActual] = useState(1);
      const [cargando, setCargando] = useState(false);
      const [hayMas, setHayMas] = useState(true);
      const [cargaInicial, setCargaInicial] = useState(true);


// Función para obtener productos filtrados
  const obtenerProductosFiltrados = useCallback(() => {
    let productosFiltrados = todosLosProductos;

    // Filtrar por categoría
    if (categoriaActiva !== "todos") {
      productosFiltrados = productosFiltrados.filter(
        (p) => p.categoria === categoriaActiva
      );
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      productosFiltrados = productosFiltrados.filter((producto) =>
        producto.nombre.toLowerCase().includes(searchLower) ||
        producto.descripcion.toLowerCase().includes(searchLower) ||
        CATEGORIAS[producto.categoria].nombre
          .toLowerCase()
          .includes(searchLower)
      );
    }

    return productosFiltrados;
  }, [todosLosProductos, categoriaActiva, searchTerm]);

  // Efecto para cargar productos iniciales
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargando(true);
        // Cargar primera página desde la API
        const response = await fetch(`/api/productos?page=1&limit=${PRODUCTOS_POR_PAGINA}`);
        if (!response.ok) throw new Error("Error al cargar productos");
        const data = await response.json();
        
        // Convertir _id de MongoDB a id
        const productosFormateados = data.productos.map((p: any) => ({
          ...p,
          id: p._id,
        }));
        
        setProductos(productosFormateados);
        setTodosLosProductos(productosFormateados);
        setHayMas(data.hasMore);
        setPaginaActual(1);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setError("Error al cargar los productos");
      } finally {
        setCargando(false);
        setCargaInicial(false);
      }
    };

    cargarProductos();
  }, []);

  // Reset paginación cuando cambia búsqueda o categoría
  useEffect(() => {
    if (!cargaInicial) {
      setPaginaActual(1);
      const productosFiltrados = obtenerProductosFiltrados();
      setProductos(productosFiltrados.slice(0, PRODUCTOS_POR_PAGINA));
      setHayMas(productosFiltrados.length > PRODUCTOS_POR_PAGINA);
    }
  }, [searchTerm, categoriaActiva, cargaInicial, obtenerProductosFiltrados]);

  const cargarMasProductos = useCallback(async () => {
    if (cargando || !hayMas || !cargaInicial) return;

    // Si hay búsqueda o filtro activo, usar filtrado local
    if (searchTerm || categoriaActiva !== "todos") {
      const productosFiltrados = obtenerProductosFiltrados();
      const siguientePagina = paginaActual + 1;
      const fin = siguientePagina * PRODUCTOS_POR_PAGINA;
      
      if (fin < productosFiltrados.length) {
        setPaginaActual(siguientePagina);
        setHayMas(fin < productosFiltrados.length);
      } else {
        setHayMas(false);
      }
      return;
    }

    // Sin filtros: cargar desde la API
    try {
      setCargando(true);
      const siguientePagina = paginaActual + 1;
      const response = await fetch(
        `/api/productos?page=${siguientePagina}&limit=${PRODUCTOS_POR_PAGINA}`
      );
      
      if (!response.ok) throw new Error("Error al cargar más productos");
      
      const data = await response.json();
      const productosFormateados = data.productos.map((p: any) => ({
        ...p,
        id: p._id,
      }));
      
      setProductos((prev) => [...prev, ...productosFormateados]);
      setTodosLosProductos((prev) => [...prev, ...productosFormateados]);
      setPaginaActual(siguientePagina);
      setHayMas(data.hasMore);
    } catch (error) {
      console.error("Error al cargar más productos:", error);
    } finally {
      setCargando(false);
    }
  }, [cargando, hayMas, paginaActual, searchTerm, categoriaActiva, obtenerProductosFiltrados, cargaInicial]);

  const productosPorCategoria = productos.reduce((acc, producto) => {
    if (!acc[producto.categoria]) {
      acc[producto.categoria] = [];
    }
    acc[producto.categoria].push(producto);
    return acc;
  }, {} as Record<CategoriaProducto, Producto[]>);

  // Obtener productos según categoría activa
  const obtenerProductosVisibles = () => {
    if (categoriaActiva === "todos") {
      return Object.entries(productosPorCategoria).map(([key, productos]) => ({
        categoria: key as CategoriaProducto,
        productos: productos,
      }));
    } else {
      const productosCategoria =
        productosPorCategoria[categoriaActiva as CategoriaProducto] || [];
      return [
        {
          categoria: categoriaActiva as CategoriaProducto,
          productos: productosCategoria,
        },
      ];
    }
  };


  return {
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
  };
}