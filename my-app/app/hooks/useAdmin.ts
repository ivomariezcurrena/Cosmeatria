import { useState, useEffect } from "react";
import { Producto, ProductoFormData } from "../types/producto";

export default function useAdmin() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formData, setFormData] = useState<ProductoFormData>({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen_url: "",
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
    
  // Cargar productos desde la API
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const response = await fetch("/api/productos?limit=1000");
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Error al cargar productos: ${response.status}`);
      }
      const data = await response.json();
      // Convertir _id de MongoDB a id
      const productosFormateados = data.productos.map((p: any) => ({
        id: p._id,
        nombre: p.nombre,
        descripcion: p.descripcion,
        precio: p.precio,
        imagen_url: p.imagen_url || "",
      }));
      setProductos(productosFormateados);
    } catch (error) {
      console.error("Error completo:", error);
      if (productos.length > 0) {
        alert("Error al cargar productos");
      }
    }
  };

  const limpiarFormulario = () => {
    setFormData({
      nombre: "",
      descripcion: "",
      precio: "",
      imagen_url: "",
    });
    setImagePreview(null);
    setEditandoId(null);
    setMostrarFormulario(false);
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        const msg = data?.error || data?.message || JSON.stringify(data);
        console.error("Upload error:", msg);
        throw new Error(msg || "Error al subir imagen");
      }

      setFormData((prev) => ({ ...prev, imagen_url: data.url }));
      setImagePreview(data.url);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al subir la imagen");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación mínima en cliente
    if (!formData.nombre || !formData.descripcion || !formData.precio) {
      alert("Completa todos los campos del formulario antes de guardar.");
      return;
    }

    const productoData = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: parseFloat(formData.precio),
      imagen_url: formData.imagen_url,
    };

    try {
      if (editandoId) {
        // Actualizar producto existente
        const response = await fetch(`/api/productos/${editandoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productoData),
        });

        if (!response.ok) {
          const text = await response.text();
          let msg = text;
          try {
            const parsed = JSON.parse(text);
            msg = parsed.error || parsed.message || text;
          } catch {}
          throw new Error(msg || "Error al actualizar producto");
        }

        alert("Producto actualizado correctamente");
      } else {
        // Crear nuevo producto
        const response = await fetch("/api/productos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productoData),
        });

        if (!response.ok) {
          const text = await response.text();
          let msg = text;
          try {
            const parsed = JSON.parse(text);
            msg = parsed.error || parsed.message || text;
          } catch {}
          throw new Error(msg || "Error al crear producto");
        }

        alert("Producto creado correctamente");
      }

      await cargarProductos();
      limpiarFormulario();
    } catch (error) {
      console.error("Error al guardar servicio:", error);
      alert(`Error al guardar el servicio: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleEditar = (producto: Producto) => {
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio.toString(),
      imagen_url: producto.imagen_url,
    });
    setImagePreview(producto.imagen_url || null);
    setEditandoId(producto.id);
    setMostrarFormulario(true);
  };

  const handleEliminar = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este servicio?")) {
      try {
        const response = await fetch(`/api/productos/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Error al eliminar servicio");
        alert("Servicio eliminado correctamente");
        await cargarProductos();
      } catch (error) {
        console.error("Error:", error);
        alert("Error al eliminar el servicio");
      }
    }
  };

  return {
    productos,
    editandoId,
    mostrarFormulario,
    formData,
    setMostrarFormulario,
    setFormData,
    handleSubmit,
    handleEditar,
    handleEliminar,
    limpiarFormulario,
    cargarProductos,
    handleImageUpload,
    uploadingImage,
    imagePreview,
  };
}