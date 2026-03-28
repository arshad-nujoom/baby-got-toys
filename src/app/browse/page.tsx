import Link from "next/link";
import { getListings } from "@/lib/actions";
import { CATEGORIES } from "@/lib/constants";
import ListingCard from "@/components/ListingCard";

type Props = {
  searchParams: Promise<{ category?: string; area?: string }>;
};

export default async function BrowsePage({ searchParams }: Props) {
  const { category, area } = await searchParams;
  const listings = await getListings(category);
  const filteredListings = area
    ? listings.filter((l) => l.area === area)
    : listings;

  const selectedCategory = CATEGORIES.find((c) => c.slug === category);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {selectedCategory ? `${selectedCategory.emoji} ${selectedCategory.label}` : "All items"}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {filteredListings.length} item{filteredListings.length !== 1 ? "s" : ""} available
          {area ? ` in ${area}` : " in Trivandrum"}
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        <Link
          href="/browse"
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
            !category
              ? "bg-amber-500 text-white border-amber-500"
              : "bg-white text-gray-600 border-gray-200 hover:border-amber-200 hover:text-amber-700"
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/browse?category=${cat.slug}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              category === cat.slug
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-white text-gray-600 border-gray-200 hover:border-amber-200 hover:text-amber-700"
            }`}
          >
            {cat.emoji} {cat.label}
          </Link>
        ))}
      </div>

      {/* Listings grid */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">{selectedCategory?.emoji ?? "📦"}</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Nothing here yet</h3>
          <p className="text-gray-400 text-sm mb-6">
            Be the first to donate {selectedCategory?.label.toLowerCase() ?? "an item"} in this category.
          </p>
          <Link href="/donate" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2 rounded-xl text-sm transition-colors">
            Donate an item
          </Link>
        </div>
      )}
    </div>
  );
}
