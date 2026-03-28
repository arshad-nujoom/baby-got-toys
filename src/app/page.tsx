import Link from "next/link";
import { getRecentListings, getCategoryCounts } from "@/lib/actions";
import { CATEGORIES } from "@/lib/constants";
import ListingCard from "@/components/ListingCard";

export default async function HomePage() {
  const [recentListings, categoryCounts] = await Promise.all([
    getRecentListings(8),
    getCategoryCounts(),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-4">🧸</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-amber-800 mb-4 leading-tight">
            Pass it on.<br />Help a family.
          </h1>
          <p className="text-lg text-amber-700 mb-2 max-w-xl mx-auto leading-relaxed">
            A community platform in Trivandrum where parents donate kids&apos; toys, clothes, books, cradles and shoes — and new parents collect them for free.
          </p>
          <p className="text-sm text-amber-600 mb-8 max-w-lg mx-auto">
            Inspired by Nordic circular economy values. No overheads. No warehouses. Go directly to the donor&apos;s home and collect.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/browse" className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-md shadow-amber-200">
              Browse items
            </Link>
            <Link href="/donate" className="bg-white hover:bg-amber-50 text-amber-700 font-semibold px-8 py-3 rounded-xl border border-amber-200 transition-colors">
              Donate an item
            </Link>
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-white border-y border-amber-100 py-4 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-amber-700">{Object.values(categoryCounts).reduce((a, b) => a + b, 0)}</div>
            <div className="text-xs text-gray-500 mt-0.5">items available</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-700">₹0</div>
            <div className="text-xs text-gray-500 mt-0.5">cost for recipients</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-700">5</div>
            <div className="text-xs text-gray-500 mt-0.5">categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-700">TVM</div>
            <div className="text-xs text-gray-500 mt-0.5">pilot city</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Browse by category</h2>
          <p className="text-gray-500 text-sm mb-6">Find what your little one needs — or donate what they&apos;ve outgrown.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/browse?category=${cat.slug}`}
                className="group bg-white hover:bg-amber-50 border border-gray-100 hover:border-amber-200 rounded-2xl p-4 text-center transition-all hover:shadow-sm"
              >
                <div className="text-3xl mb-2">{cat.emoji}</div>
                <div className="font-semibold text-gray-700 group-hover:text-amber-700 text-sm">{cat.label}</div>
                <div className="text-xs text-amber-500 mt-1">
                  {categoryCounts[cat.slug] ?? 0} available
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-amber-50 py-12 px-4 border-y border-amber-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">How it works</h2>
          <p className="text-gray-500 text-sm mb-10 text-center">Simple, zero-overhead, community-first</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", icon: "📦", title: "Donor lists an item", desc: "Post photos, describe the condition, and set your Trivandrum area. Pay a small ₹10–30 listing fee." },
              { step: "2", icon: "🔍", title: "Recipient browses", desc: "Browse by category or area. Totally free. No account needed." },
              { step: "3", icon: "📞", title: "Direct contact", desc: "Reach out to the donor directly via phone or WhatsApp to fix a pickup time." },
              { step: "4", icon: "🏠", title: "Collect at home", desc: "Visit the donor's address at the agreed time and collect the item. No middlemen, no delivery." },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl p-5 border border-amber-100 relative">
                <div className="absolute -top-3 -left-1 w-7 h-7 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                  {step}
                </div>
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-semibold text-gray-800 mb-1 text-sm">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent listings */}
      {recentListings.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Recently added</h2>
                <p className="text-sm text-gray-500 mt-0.5">Fresh donations from the community</p>
              </div>
              <Link href="/browse" className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {recentListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {recentListings.length === 0 && (
        <section className="py-16 px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Be the first donor!</h3>
            <p className="text-gray-500 text-sm mb-6">
              This community is just getting started. List an item your child has outgrown and help a family in Trivandrum.
            </p>
            <Link href="/donate" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors">
              Donate an item
            </Link>
          </div>
        </section>
      )}

      {/* Mission quote */}
      <section className="bg-amber-700 text-white py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg font-medium leading-relaxed italic opacity-95">
            &ldquo;Children are financially unviable only if we keep buying everything new. A community that shares makes every child affordable.&rdquo;
          </p>
          <p className="text-amber-200 text-sm mt-4">— The Baby Got Toys philosophy</p>
        </div>
      </section>
    </div>
  );
}
export const dynamic = 'force-dynamic';
