import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getListing } from "@/lib/actions";
import { CATEGORIES, CONDITIONS, AGE_GROUPS } from "@/lib/constants";
import ConfirmPickup from "./ConfirmPickup";

type Props = { params: Promise<{ id: string }> };

export default async function ListingPage({ params }: Props) {
  const { id } = await params;
  const listing = await getListing(id);

  if (!listing) notFound();

  const photos: string[] = JSON.parse(listing.photos || "[]");
  const category = CATEGORIES.find((c) => c.slug === listing.category);
  const condition = CONDITIONS.find((c) => c.value === listing.condition);
  const ageGroup = AGE_GROUPS.find((a) => a.value === listing.ageGroup);

  const conditionColor =
    listing.condition === "like-new"
      ? "bg-green-100 text-green-700"
      : listing.condition === "good"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-amber-600">Home</Link>
        <span>/</span>
        <Link href="/browse" className="hover:text-amber-600">Browse</Link>
        <span>/</span>
        {category && (
          <>
            <Link href={`/browse?category=${category.slug}`} className="hover:text-amber-600">{category.label}</Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-600 truncate max-w-[200px]">{listing.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Photos */}
        <div>
          <div className="bg-amber-50 rounded-2xl aspect-[4/3] relative overflow-hidden flex items-center justify-center">
            {photos.length > 0 ? (
              <Image src={photos[0]} alt={listing.title} fill className="object-cover" />
            ) : (
              <span className="text-7xl opacity-30">{category?.emoji ?? "📦"}</span>
            )}
          </div>
          {photos.length > 1 && (
            <div className="flex gap-2 mt-2">
              {photos.slice(1).map((photo, i) => (
                <div key={i} className="w-16 h-16 rounded-lg overflow-hidden relative bg-amber-50 flex-shrink-0">
                  <Image src={photo} alt={`Photo ${i + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-start gap-2 mb-2">
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${conditionColor}`}>
              {condition?.label ?? listing.condition}
            </span>
            {listing.status === "claimed" && (
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500">Claimed</span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-1">{listing.title}</h1>
          <p className="text-amber-600 text-sm font-medium mb-4">
            {category?.emoji} {category?.label} · {listing.area}, Trivandrum
          </p>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">{listing.description}</p>

          <div className="flex flex-wrap gap-3 text-xs mb-6">
            {ageGroup && (
              <span className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full">
                Age: {ageGroup.label}
              </span>
            )}
            <span className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full">
              Area: {listing.area}
            </span>
            <span className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full">
              Listed {new Date(listing.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          </div>

          {listing.status === "available" ? (
            <ConfirmPickup
              listingId={listing.id}
              donorName={listing.donorName}
              donorPhone={listing.donorPhone}
              donorWhatsapp={listing.donorWhatsapp ?? null}
              area={listing.area}
              title={listing.title}
            />
          ) : (
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-center">
              <p className="text-gray-500 text-sm font-medium">This item has been claimed</p>
              <Link href="/browse" className="mt-2 inline-block text-amber-600 text-sm hover:underline">
                Browse more items →
              </Link>
            </div>
          )}

          <div className="bg-amber-50 rounded-xl p-4 text-xs text-amber-700 border border-amber-100 mt-4">
            <strong>How pickup works:</strong> Pay a small ₹10–30 token fee to confirm your pickup and unlock the donor&apos;s contact details. Then agree on a time and collect the item directly from their home in {listing.area}. Donors always list for free.
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-100">
        <Link href="/browse" className="text-sm text-gray-500 hover:text-amber-600 flex items-center gap-1">
          ← Back to browse
        </Link>
      </div>
    </div>
  );
}
