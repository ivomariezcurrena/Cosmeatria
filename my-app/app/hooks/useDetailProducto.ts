import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Producto } from "../types/producto";




export default function useDetailProducto() {
      const params = useParams();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const response = await fetch(`/api/productos/${params.id}`);
        if (!response.ok) throw new Error("Producto no encontrado");
        const data = await response.json();

        // Convertir _id a id
        const productoFormateado = {
          ...data,
          id: data._id,
        };

        setProducto(productoFormateado);
      } catch (error) {
        console.error("Error al cargar producto:", error);
        setError("No se pudo cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, [params.id]);

  return { producto, error, loading };

}