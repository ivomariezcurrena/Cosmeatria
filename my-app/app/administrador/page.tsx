"use client";

import useAdmin from "../hooks/useAdmin";

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
  } = useAdmin();
  return (
    <main className="pt-[60px] min-h-screen bg-[#faf9f7]">
      {/* Header minimalista */}
      <section className="bg-white border-b border-[#e0d8d0]">
        <div className="max-w-[980px] mx-auto px-6 py-12">
          <h1 className="text-[40px] font-light text-[#2d2d2d] mb-2 tracking-[-0.02em] text-center">
            Panel de Administración
          </h1>
          <p className="text-[17px] text-[#6b6b6b] text-center">
            Gestiona tus servicios y tratamientos
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
            className="bg-[#a0826d] text-white py-3 px-7 rounded-full font-medium text-[15px] transition-all hover:bg-[#8b6f5e] active:scale-[0.97] shadow-sm"
          >
            {mostrarFormulario ? "Cancelar" : "+ Nuevo servicio"}
          </button>
        </div>

        {/* Formulario */}
        {mostrarFormulario && (
          <div className="bg-white rounded-[18px] p-8 mb-10 shadow-sm border border-[#e0d8d0]">
            <h2 className="text-[28px] font-light text-[#2d2d2d] mb-8 tracking-[-0.01em]">
              {editandoId ? "Editar servicio" : "Nuevo servicio"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Nombre */}
              <div>
                <label className="block text-[14px] font-medium text-[#2d2d2d] mb-2">
                  Nombre del servicio
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[#e0d8d0] rounded-[12px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#a0826d] focus:border-transparent transition-all"
                  placeholder="Tratamiento facial rejuvenecedor"
                />
                <p className="text-[13px] text-[#6b6b6b] mt-1.5">
                  Nombre completo y descriptivo del servicio
                </p>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-[14px] font-medium text-[#2d2d2d] mb-2">
                  Descripción
                </label>
                <textarea
                  required
                  value={formData.descripcion}
                  onChange={(e) =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[#e0d8d0] rounded-[12px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#a0826d] focus:border-transparent transition-all resize-none"
                  placeholder="Describe las características principales del servicio..."
                  rows={4}
                />
                <div className="flex justify-between items-center mt-1.5">
                  <p className="text-[13px] text-[#6b6b6b]">
                    Máximo 500 caracteres
                  </p>
                  <span
                    className={`text-[13px] ${
                      formData.descripcion.length > 500
                        ? "text-red-500"
                        : "text-[#6b6b6b]"
                    }`}
                  >
                    {formData.descripcion.length}/500
                  </span>
                </div>
              </div>

              {/* Imagen del servicio */}
              <div>
                <label className="block text-[15px] font-medium text-[#2d2d2d] mb-2">
                  Imagen del servicio
                </label>
                <div className="space-y-3">
                  {imagePreview && (
                    <div className="relative w-full h-48 rounded-[12px] overflow-hidden border border-[#e0d8d0]">
                      <img
                        src={imagePreview}
                        alt="Vista previa"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    className="block w-full text-[15px] text-[#6b6b6b] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#a0826d] file:text-white hover:file:bg-[#8b6f5e] file:cursor-pointer"
                    disabled={uploadingImage}
                  />
                  {uploadingImage && (
                    <p className="text-sm text-[#a0826d]">Subiendo imagen...</p>
                  )}
                </div>
              </div>

              {/* Precio */}
              <div>
                <label className="block text-[14px] font-medium text-[#2d2d2d] mb-2">
                  Precio (ARS)
                </label>
                <input
                  type="number"
                  required
                  value={formData.precio}
                  onChange={(e) =>
                    setFormData({ ...formData, precio: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[#e0d8d0] rounded-[12px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#a0826d] focus:border-transparent transition-all"
                  placeholder="15000"
                />
                <div className="flex justify-between items-center mt-1.5">
                  <p className="text-[13px] text-[#6b6b6b]">
                    Ingresa el precio sin puntos ni comas
                  </p>
                  {formData.precio && (
                    <span className="text-[13px] font-medium text-[#a0826d]">
                      ≈{" "}
                      {parseFloat(formData.precio).toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}
                    </span>
                  )}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#a0826d] text-white py-3.5 px-6 rounded-[12px] font-medium text-[15px] transition-all hover:bg-[#8b6f5e] active:scale-[0.98] shadow-sm"
                >
                  {editandoId ? "Actualizar servicio" : "Crear servicio"}
                </button>
                <button
                  type="button"
                  onClick={limpiarFormulario}
                  className="px-6 py-3.5 border border-[#e0d8d0] rounded-[12px] font-medium text-[15px] text-[#2d2d2d] transition-all hover:bg-[#faf9f7] active:scale-[0.98]"
                >
                  Limpiar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de productos */}
        <div>
          <h2 className="text-[24px] font-light text-[#2d2d2d] mb-6 tracking-[-0.01em]">
            Servicios ({productos.length})
          </h2>

          {productos.length === 0 ? (
            <div className="bg-white rounded-[18px] p-16 text-center border border-[#e0d8d0]">
              <h3 className="text-[21px] font-light text-[#2d2d2d] mb-2">
                No hay servicios
              </h3>
              <p className="text-[15px] text-[#6b6b6b]">
                Agrega tu primer servicio para comenzar
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {productos.map((producto) => (
                <div
                  key={producto.id}
                  className="bg-white rounded-[18px] p-6 border border-[#e0d8d0] hover:shadow-md transition-all group"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Información */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <h3 className="text-[19px] font-medium text-[#2d2d2d] mt-1 tracking-[-0.01em]">
                            {producto.nombre}
                          </h3>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[21px] font-medium text-[#2d2d2d] tracking-[-0.01em]">
                            ${producto.precio.toLocaleString("es-AR")}
                          </div>
                        </div>
                      </div>

                      <p className="text-[#6b6b6b] text-[14px] mb-4 line-clamp-2 leading-relaxed">
                        {producto.descripcion}
                      </p>

                      {/* Acciones */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditar(producto)}
                          className="flex items-center gap-2 px-4 py-2 bg-[#a0826d] text-white rounded-[8px] text-[13px] font-medium hover:bg-[#8b6f5e] transition-all active:scale-[0.97]"
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
