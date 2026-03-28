import Link from "next/link";
import Image from "next/image";
import { Listing } from "@/generated/prisma/client";
import { CATEGORIES, CONDITIONS } from "@/lib/constants";

type Props = { listing: Listing };

export default function ListingCard({ listing }: Props) {
  const photos: string[] = JSON.parse(listing.photos || "[]");
  const category = CATEGORIES.find((c) => c.slug === listing.category);
  const condition = CONDITIONS.find((c) => c.value === listing.condition);

  const conditionColor =
    listing.condition === "like-new"
      ? "bg-green-100 text-green-700"
      : listing.condition === "good"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <Link href={`/listing/${listing.id}`} className="group block bg-white rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all overflow-hidden">
      <div className="relative aspect-[4/3] bg-amber-50 flex items-center justify-center">
        {photos.length > 0 ? (
          <Image
            src={photos[0]}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-5xl opacity-40">{category?.emoji ?? "📦"}</span>
        )}
        <span className={`absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full ${conditionColor}`}>
          {condition?.label ?? listing.condition}
        </span>
        {listing.status === "claimed" && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <span className="bg-white text-gray-700 text-sm font-semibold px-3 py-1 rounded-full">Claimed</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs text-amber-600 font-medium mb-0.5">{category?.label ?? listing.category} · {listing.area}</p>
        <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors">
          {listing.title}
        </h3>
        <p className="text-xs text-gray-400 mt-1.5 line-clamp-2">{listing.description}</p>
      </div>
    </Link>
  );
}
