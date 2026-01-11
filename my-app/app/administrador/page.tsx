"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import useAdmin from "../hooks/useAdmin";
import { CategoriaProducto, CATEGORIAS } from "../types/producto";

const LOCALE = "en-US";

export default function AdministradorPage() {
  const {
    productos,
    handleSubmit,
    formData,
    setFormData,
    limpiarFormulario,
    mostrarFormulario,
    setMostrarFormulario,
    editandoId,
    handleEditar,
    handleEliminar,
    handleImageUpload,
    uploadingImage,
    imagePreview,
    setImagePreview,
  } = useAdmin();
  return (
    <main className="pt-[60px] min-h-screen bg-[#f5f5f7]">
      {/* Header minimalista */}
      <section className="bg-white border-b border-[#d2d2d7]">
        <div className="max-w-[980px] mx-auto px-6 py-12">
          <h1 className="text-[40px] font-semibold text-[#1d1d1f] mb-2 tracking-[-0.02em] text-center">
            Administración
          </h1>
          <p className="text-[17px] text-[#86868b] text-center">
            Gestiona tu catálogo de productos
          </p>
        </div>
      </section>

      <div className="max-w-[980px] mx-auto px-6 py-10">
        {/* Botón minimalista */}
        <div className="mb-10">
          <button
            onClick={() => {
              setMostrarFormulario(!mostrarFormulario);
              if (mostrarFormulario) limpiarFormulario();
            }}
            className="bg-[#0071e3] text-white py-3 px-7 rounded-[980px] font-medium text-[15px] transition-all hover:bg-[#0077ed] active:scale-[0.97] shadow-sm"
          >
            {mostrarFormulario ? "Cancelar" : "+ Nuevo producto"}
          </button>
        </div>

        {/* Formulario */}
        {mostrarFormulario && (
          <div className="bg-white rounded-[18px] p-8 mb-10 shadow-sm border border-[#d2d2d7]">
            <h2 className="text-[28px] font-semibold text-[#1d1d1f] mb-8 tracking-[-0.01em]">
              {editandoId ? "Editar producto" : "Nuevo producto"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Nombre */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
                  Nombre del producto
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[#d2d2d7] rounded-[12px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all"
                  placeholder="iPhone 15 Pro Max"
                />
                <p className="text-[13px] text-[#86868b] mt-1.5">
                  Nombre completo y descriptivo del producto
                </p>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
                  Descripción
                </label>
                <textarea
                  required
                  value={formData.descripcion}
                  onChange={(e) =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[#d2d2d7] rounded-[12px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all resize-none"
                  placeholder="Describe las características principales del producto..."
                  rows={4}
                />
                <div className="flex justify-between items-center mt-1.5">
                  <p className="text-[13px] text-[#86868b]">
                    Máximo 500 caracteres
                  </p>
                  <span
                    className={`text-[13px] ${
                      formData.descripcion.length > 500
                        ? "text-red-500"
                        : "text-[#86868b]"
                    }`}
                  >
                    {formData.descripcion.length}/500
                  </span>
                </div>
              </div>

              {/* Precio */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
                  Precio (USD)
                </label>
                <input
                  type="number"
                  required
                  value={formData.precio}
                  onChange={(e) =>
                    setFormData({ ...formData, precio: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[#d2d2d7] rounded-[12px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all"
                  placeholder="150000"
                />
                <div className="flex justify-between items-center mt-1.5">
                  <p className="text-[13px] text-[#86868b]">
                    Ingresa el precio sin puntos ni comas
                  </p>
                  {formData.precio && (
                    <span className="text-[13px] font-medium text-[#0071e3]">
                      ≈{" "}
                      {parseFloat(formData.precio).toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}
                    </span>
                  )}
                </div>
              </div>

              {/* Categoría */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
                  Categoría
                </label>
                <select
                  required
                  value={formData.categoria}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      categoria: e.target.value as CategoriaProducto,
                    })
                  }
                  className="w-full px-4 py-3 border border-[#d2d2d7] rounded-[12px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all bg-white"
                >
                  {Object.entries(CATEGORIAS).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.nombre}
                    </option>
                  ))}
                </select>
                <p className="text-[13px] text-[#86868b] mt-1.5">
                  Clasifica tu producto para facilitar la búsqueda
                </p>
              </div>

              {/* Imagen - Drag & Drop o URL */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
                  Imagen del producto
                </label>

                {/* Zona de Drag & Drop */}
                <div
                  onClick={() => document.getElementById("fileInput")?.click()}
                  className="relative border-2 border-dashed border-[#d2d2d7] rounded-[12px] p-8 text-center cursor-pointer transition-all hover:border-[#0071e3] hover:bg-[#f5f5f7] group"
                >
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {uploadingImage ? (
                    <div className="py-4">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0071e3] mx-auto mb-3"></div>
                      <p className="text-[14px] text-[#86868b]">
                        Cargando imagen...
                      </p>
                    </div>
                  ) : imagePreview ? (
                    <div className="space-y-3">
                      <div className="relative w-full max-w-[200px] aspect-square mx-auto rounded-[12px] overflow-hidden">
                        <Image
                          src={imagePreview}
                          alt="Vista previa"
                          width={200}
                          height={200}
                          className="object-cover"
                        />
                      </div>
                      <p className="text-[13px] text-[#0071e3] font-medium">
                        ✓ Imagen cargada
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImagePreview("");
                          setFormData({ ...formData, imagen_url: "" });
                        }}
                        className="text-[13px] text-[#86868b] hover:text-red-500 transition-colors"
                      >
                        Cambiar imagen
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <svg
                        className="w-12 h-12 mx-auto text-[#86868b] group-hover:text-[#0071e3] transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-[15px] font-medium text-[#1d1d1f] mb-1">
                          Haz clic para seleccionar una imagen
                        </p>
                        <p className="text-[13px] text-[#86868b]">
                          o arrastra y suelta aquí
                        </p>
                      </div>
                      <p className="text-[12px] text-[#86868b]">
                        PNG, JPG o WEBP (máx. 5MB)
                      </p>
                    </div>
                  )}
                </div>

                {/* Opción alternativa: URL */}
                <div className="mt-4">
                  <details className="group">
                    <summary className="text-[13px] text-[#0071e3] cursor-pointer hover:underline list-none flex items-center gap-1">
                      <span>O usar URL de imagen</span>
                      <svg
                        className="w-4 h-4 transition-transform group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <div className="mt-3">
                      <input
                        type="url"
                        value={formData.imagen_url}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            imagen_url: e.target.value,
                          });
                          setImagePreview(e.target.value);
                        }}
                        className="w-full px-4 py-2.5 border border-[#d2d2d7] rounded-[12px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all"
                        placeholder="https://ejemplo.com/imagen.jpg"
                      />
                    </div>
                  </details>
                </div>
              </div>

              {/* Características */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
                  Características destacadas
                </label>
                <textarea
                  value={formData.caracteristicas}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      caracteristicas: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-[#d2d2d7] rounded-[12px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all resize-none"
                  placeholder="Diseño de titanio con Action Button&#10;Dynamic Island con notificaciones interactivas&#10;Zoom óptico 5x con lente tetraprismática&#10;Resistencia al agua IP68"
                  rows={5}
                />
                <p className="text-[13px] text-[#86868b] mt-1.5">
                  Una característica por línea
                </p>
              </div>

              {/* Especificaciones */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
                  Especificaciones técnicas
                </label>
                <textarea
                  value={formData.especificaciones}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      especificaciones: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-[#d2d2d7] rounded-[12px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all resize-none font-mono text-[13px]"
                  placeholder="Pantalla: 6.7 pulgadas OLED&#10;Procesador: A17 Pro&#10;Cámara: 48MP principal&#10;Batería: 4441 mAh"
                  rows={5}
                />
                <p className="text-[13px] text-[#86868b] mt-1.5">
                  Formato: <span className="font-mono">Clave: Valor</span> (una
                  por línea)
                </p>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#0071e3] text-white py-3.5 px-6 rounded-[12px] font-medium text-[15px] transition-all hover:bg-[#0077ed] active:scale-[0.98] shadow-sm"
                >
                  {editandoId ? "Actualizar producto" : "Crear producto"}
                </button>
                <button
                  type="button"
                  onClick={limpiarFormulario}
                  className="px-6 py-3.5 border border-[#d2d2d7] rounded-[12px] font-medium text-[15px] text-[#1d1d1f] transition-all hover:bg-[#f5f5f7] active:scale-[0.98]"
                >
                  Limpiar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de productos */}
        <div>
          <h2 className="text-[24px] font-semibold text-[#1d1d1f] mb-6 tracking-[-0.01em]">
            Productos ({productos.length})
          </h2>

          {productos.length === 0 ? (
            <div className="bg-white rounded-[18px] p-16 text-center border border-[#d2d2d7]">
              <h3 className="text-[21px] font-semibold text-[#1d1d1f] mb-2">
                No hay productos
              </h3>
              <p className="text-[15px] text-[#86868b]">
                Agrega tu primer producto para comenzar
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {productos.map((producto) => (
                <div
                  key={producto.id}
                  className="bg-white rounded-[18px] p-6 border border-[#d2d2d7] hover:shadow-md transition-all group"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Imagen */}
                    <div className="w-full md:w-28 h-28 bg-[#f5f5f7] rounded-[12px] flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <Image
                        src={producto.imagen_url}
                        alt={producto.nombre}
                        width={112}
                        height={112}
                        className="w-full h-full object-contain p-3"
                      />
                    </div>

                    {/* Información */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <span className="text-[12px] font-medium text-[#0071e3] uppercase tracking-wide">
                            {CATEGORIAS[producto.categoria].nombre}
                          </span>
                          <h3 className="text-[19px] font-semibold text-[#1d1d1f] mt-1 tracking-[-0.01em]">
                            {producto.nombre}
                          </h3>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[21px] font-semibold text-[#1d1d1f] tracking-[-0.01em]">
                            USD ${producto.precio.toLocaleString(LOCALE)}
                          </div>
                        </div>
                      </div>

                      <p className="text-[#86868b] text-[14px] mb-4 line-clamp-2 leading-relaxed">
                        {producto.descripcion}
                      </p>

                      {/* Acciones */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditar(producto)}
                          className="flex items-center gap-2 px-4 py-2 bg-[#0071e3] text-white rounded-[8px] text-[13px] font-medium hover:bg-[#0077ed] transition-all active:scale-[0.97]"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M11.5 2.5l2 2L6 12H4v-2l7.5-7.5z" />
                          </svg>
                          Editar
                        </button>
                        <button
                          onClick={() => handleEliminar(producto.id)}
                          className="flex items-center gap-2 px-4 py-2 text-red-500 border border-red-200 rounded-[8px] text-[13px] font-medium hover:bg-red-50 transition-all active:scale-[0.97]"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 4h10M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1m1 0v9a1 1 0 01-1 1H5a1 1 0 01-1-1V4h8z" />
                          </svg>
                          Eliminar
                        </button>
                        <a
                          href={`/productos/${producto.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-[#86868b] border border-[#d2d2d7] rounded-[8px] text-[13px] font-medium hover:bg-[#f5f5f7] transition-all active:scale-[0.97]"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" />
                            <circle cx="8" cy="8" r="2" />
                          </svg>
                          Ver
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
