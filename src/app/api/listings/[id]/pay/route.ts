import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { paymentId } = await request.json();

  const listing = await prisma.listing.update({
    where: { id },
    data: { feePaid: true, paymentId, status: "available" },
  });

  revalidatePath("/");
  revalidatePath("/browse");

  return NextResponse.json({ listing });
}
