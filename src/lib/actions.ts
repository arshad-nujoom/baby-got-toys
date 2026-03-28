"use server";

import { prisma } from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ListingInput = {
  title: string;
  description: string;
  category: string;
  condition: string;
  area: string;
  donorName: string;
  donorPhone: string;
  donorWhatsapp?: string;
  ageGroup?: string;
  feeAmount: number;
  photos?: string[];
};

export async function createListing(data: ListingInput) {
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
      feeAmount: data.feeAmount,
      photos: JSON.stringify(data.photos || []),
      feePaid: false,
    },
  });
  revalidatePath("/");
  revalidatePath("/browse");
  return listing;
}

export async function markListingClaimed(id: string) {
  await prisma.listing.update({
    where: { id },
    data: { status: "claimed" },
  });
  revalidatePath("/browse");
  revalidatePath(`/listing/${id}`);
}

export async function getListings(category?: string, status = "available") {
  return prisma.listing.findMany({
    where: {
      ...(category ? { category } : {}),
      status,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getListing(id: string) {
  return prisma.listing.findUnique({ where: { id } });
}

export async function getRecentListings(limit = 8) {
  return prisma.listing.findMany({
    where: { status: "available" },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getCategoryCounts() {
  const counts = await prisma.listing.groupBy({
    by: ["category"],
    where: { status: "available" },
    _count: { category: true },
  });
  return Object.fromEntries(counts.map((c) => [c.category, c._count.category]));
}
