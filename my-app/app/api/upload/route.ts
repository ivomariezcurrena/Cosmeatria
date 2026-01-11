import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.warn("Cloudinary env vars missing or incomplete. Check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.");
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo" },
        { status: 400 }
      );
    }

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "El archivo debe ser una imagen" },
        { status: 400 }
      );
    }

    // Validar tamaño (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "La imagen no debe superar los 5MB" },
        { status: 400 }
      );
    }

    // Convertir el archivo a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Subir a Cloudinary usando un Promise
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "productos", // Carpeta en Cloudinary
            resource_type: "auto",
            transformation: [
              { width: 1000, height: 1000, crop: "limit" }, // Limitar tamaño
              { quality: "auto:good" }, // Optimizar calidad
              { fetch_format: "auto" }, // Formato automático (webp si es soportado)
            ],
          },
          (error, result) => {
            if (error) {
              try {
                const errObj = JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)));
                console.error("Cloudinary upload error object:", errObj);
              } catch (e) {
                console.error("Cloudinary upload error (could not serialize):", error);
              }
              reject(error);
            } else resolve(result);
          }
        )
        .end(buffer);
    });

    const uploadResult = result as any;

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
  } catch (error) {
    console.error("Error al subir imagen:", error);
    let detail: string;
    try {
      detail = typeof error === "object" ? JSON.stringify(error, Object.getOwnPropertyNames(error)) : String(error);
    } catch (e) {
      detail = error instanceof Error ? error.message : String(error);
    }
    return NextResponse.json(
      { error: "Error al subir la imagen", detail },
      { status: 500 }
    );
  }
}

// Endpoint opcional para eliminar imágenes
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const publicId = searchParams.get("publicId");

    if (!publicId) {
      return NextResponse.json(
        { error: "No se proporcionó publicId" },
        { status: 400 }
      );
    }

    await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({
      success: true,
      message: "Imagen eliminada correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar imagen:", error);
    return NextResponse.json(
      { error: "Error al eliminar la imagen" },
      { status: 500 }
    );
  }
}
