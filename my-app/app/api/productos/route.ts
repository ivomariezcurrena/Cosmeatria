// app/api/productos/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    const { db } = await connectToDatabase();
    
    // Obtener productos paginados
    const items = await db
      .collection("products")
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    // Obtener total de productos para saber si hay más
    const total = await db.collection("products").countDocuments();
    
    return NextResponse.json({
      productos: items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    });
  } catch (error) {
    console.error("Error en GET /api/productos:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Error al obtener productos", detail: message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { db } = await connectToDatabase();
    const doc = { ...body, createdAt: new Date() };
    const result = await db.collection("products").insertOne(doc);
    return NextResponse.json({ insertedId: result.insertedId, ...doc });
  } catch (error) {
    console.error("Error en POST /api/productos:", error);
    return NextResponse.json(
      { error: "Error al crear producto" },
      { status: 500 }
    );
  }
}