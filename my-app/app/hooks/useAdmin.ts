import { useState, useEffect } from "react";
import { Producto } from "../types/producto";

interface ProductoFormData {
  nombre: string;
  descripcion: string;
  precio: string;
  imagen_url: string;
  categoria: string;
  caracteristicas: string;
  especificaciones: string;
}

export default function useAdmin() {
      const [productos, setProductos] = useState<Producto[]>([]);
      const [editandoId, setEditandoId] = useState<string | null>(null);
      const [mostrarFormulario, setMostrarFormulario] = useState(false);
      const [imagePreview, setImagePreview] = useState<string>("");
      const [uploadingImage, setUploadingImage] = useState(false);
      const [formData, setFormData] = useState<ProductoFormData>({
        nombre: "",
        descripcion: "",
        precio: "",
        imagen_url: "",
        categoria: "iphone",
        caracteristicas: "",
        especificaciones: "",
      });
    
      // Cargar productos desde la API
      useEffect(() => {
        cargarProductos();
      }, []);
    
      const cargarProductos = async () => {
        try {
          const response = await fetch("/api/productos");
          if (!response.ok) {
            const errorText = await response.text();
            console.error("Error response:", errorText);
            throw new Error(`Error al cargar productos: ${response.status}`);
          }
          const data = await response.json();
          // Convertir _id de MongoDB a id
          const productosFormateados = data.map((p: any) => ({
            ...p,
            id: p._id,
          }));
          setProductos(productosFormateados);
        } catch (error) {
          console.error("Error completo:", error);
          // No mostrar alert si no hay productos aún
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
          categoria: "iphone",
          caracteristicas: "",
          especificaciones: "",
        });
        setEditandoId(null);
        setMostrarFormulario(false);
        setImagePreview("");
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Parsear características y especificaciones
        const caracteristicas = formData.caracteristicas
          .split("\n")
          .filter((c) => c.trim() !== "");
    
        const especificaciones: Record<string, string> = {};
        formData.especificaciones.split("\n").forEach((line) => {
          const [key, value] = line.split(":").map((s) => s.trim());
          if (key && value) {
            especificaciones[key] = value;
          }
        });
    
        const productoData = {
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          precio: parseFloat(formData.precio),
          imagen_url: formData.imagen_url,
          categoria: formData.categoria,
          caracteristicas: caracteristicas.length > 0 ? caracteristicas : undefined,
          especificaciones:
            Object.keys(especificaciones).length > 0 ? especificaciones : undefined,
        };
    
        try {
          if (editandoId) {
            // Actualizar producto existente
            const response = await fetch(`/api/productos/${editandoId}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(productoData),
            });
            if (!response.ok) throw new Error("Error al actualizar producto");
            alert("Producto actualizado correctamente");
          } else {
            // Crear nuevo producto
            const response = await fetch("/api/productos", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(productoData),
            });
            if (!response.ok) throw new Error("Error al crear producto");
            alert("Producto creado correctamente");
          }
    
          // Recargar productos
          await cargarProductos();
          limpiarFormulario();
        } catch (error) {
          console.error("Error:", error);
          alert("Error al guardar el producto");
        }
      };
    
      const handleEditar = (producto: Producto) => {
        setFormData({
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio.toString(),
          imagen_url: producto.imagen_url,
          categoria: producto.categoria,
          caracteristicas: producto.caracteristicas?.join("\n") || "",
          especificaciones: producto.especificaciones
            ? Object.entries(producto.especificaciones)
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n")
            : "",
        });
        setImagePreview(producto.imagen_url);
        setEditandoId(producto.id);
        setMostrarFormulario(true);
      };
    
      const handleEliminar = async (id: string) => {
        if (confirm("¿Estás seguro de eliminar este producto?")) {
          try {
            const response = await fetch(`/api/productos/${id}`, {
              method: "DELETE",
            });
            if (!response.ok) throw new Error("Error al eliminar producto");
            alert("Producto eliminado correctamente");
            await cargarProductos();
          } catch (error) {
            console.error("Error:", error);
            alert("Error al eliminar el producto");
          }
        }
      };
    
      const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          // Validar tipo de archivo
          if (!file.type.startsWith("image/")) {
            alert("Por favor selecciona un archivo de imagen válido");
            return;
          }
    
          // Validar tamaño (max 5MB)
          if (file.size > 5 * 1024 * 1024) {
            alert("La imagen no debe superar los 5MB");
            return;
          }
    
          setUploadingImage(true);
    
          // Crear preview local
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result as string);
          };
          reader.readAsDataURL(file);
    
          // Subir a Cloudinary
          const uploadImage = async () => {
            try {
              const formDataUpload = new FormData();
              formDataUpload.append("file", file);
    
              const response = await fetch("/api/upload", {
                method: "POST",
                body: formDataUpload,
              });
    
              if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al subir:", errorData);
                throw new Error(errorData.error || "Error al subir imagen");
              }
    
              const data = await response.json();
              setFormData((prev) => ({ ...prev, imagen_url: data.url }));
              console.log("Imagen subida:", data.url);
            } catch (error) {
              console.error("Error:", error);
              alert(
                error instanceof Error ? error.message : "Error al subir la imagen"
              );
            } finally {
              setUploadingImage(false);
            }
          };
    
          uploadImage();
        }
      };

      return{
        productos,
        editandoId,
        mostrarFormulario,
        imagePreview,
        uploadingImage,
        formData,
        setMostrarFormulario,
        setFormData,
        handleSubmit,
        handleEditar,
        handleEliminar,
        handleImageUpload,
        limpiarFormulario,
        cargarProductos,
        setImagePreview,
      }
}