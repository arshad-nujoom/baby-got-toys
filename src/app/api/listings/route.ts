import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const status = searchParams.get("status") ?? "available";

  const listings = await prisma.listing.findMany({
    where: {
      ...(category ? { category } : {}),
      status,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ listings });
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  const listing = await prisma.listing.create({
    data: {
      title: data.title,
      description: data.description,
      category: data.category,
      condition: data.condition,
      area: data.area,
      donorName: data.donorName,
      donorPhone: data.donorPhone,
      donorWhatsapp: data.donorWhatsapp || null,
      ageGroup: data.ageGroup || "any",
      feeAmount: Number(data.feeAmount) || 10,
      photos: JSON.stringify(data.photos || []),
      feePaid: false,
    },
  });

  return NextResponse.json({ listing }, { status: 201 });
}
