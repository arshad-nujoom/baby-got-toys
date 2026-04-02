import Link from "next/link";

export const metadata = {
  title: "About — Baby Got Toys",
  description: "Why we built Baby Got Toys and how it works for Trivandrum families.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">🌍</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Our mission</h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          Making childhood affordable — and the planet a little better.
        </p>
      </div>

      <div className="prose prose-gray max-w-none space-y-8">
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-amber-800 mb-3">Why Baby Got Toys?</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Kids grow fast. Faster than we buy things, and much faster than things wear out. A cradle that costs ₹8,000 might be used for six months. A bag of 3-month baby clothes might be worn for exactly 90 days. New parents in Trivandrum — especially young families — are spending enormous amounts on things that are barely used by the time their child is done with them.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mt-3">
            Meanwhile, the same items are piling up in storage rooms, gathering dust, when another family in the next neighbourhood desperately needs them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">The Nordic model, in Trivandrum</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            In countries like Sweden, Finland, and Denmark, community sharing of children&apos;s items is deeply embedded in culture. Facebook groups, local swap meets, and second-hand shops for kids are ubiquitous — and proudly used. There&apos;s no stigma in getting a pre-loved toy; it&apos;s the smart, environmentally-conscious thing to do.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mt-3">
            We want to bring that culture to Trivandrum. And we&apos;re starting here because Trivandrum is a city of connected communities, educated families, and a real awareness of sustainability. The conditions are perfect.
          </p>
        </section>

        <section className="bg-white border border-gray-100 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">How it works — simply</h2>
          <div className="space-y-4">
            {[
              { icon: "📦", title: "Donors list items", desc: "Parents post items their child has outgrown — toys, cradles, shoes, clothes, drawing books — with photos and a description. Free to list." },
              { icon: "🔍", title: "Recipients browse for free", desc: "Browse by category and find what you need. No account needed." },
              { icon: "📞", title: "Direct contact", desc: "The recipient contacts the donor via phone or WhatsApp and pays a small ₹10–30 token fee to confirm the pickup — a guarantee of intent for both sides." },
              { icon: "🏠", title: "Collect at home", desc: "The recipient comes to the donor's home and collects the item. Zero overhead. Zero delivery cost. Zero warehouse." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="text-2xl flex-shrink-0 mt-0.5">{icon}</div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm mb-1">{title}</div>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">The economics</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Recipients pay a small ₹10–30 token fee when confirming a pickup — that's it. Donors list for free. This model means:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li className="flex gap-2"><span className="text-amber-500">✓</span> Donors are incentivised to list thoughtfully (not spam)</li>
            <li className="flex gap-2"><span className="text-amber-500">✓</span> Recipients face zero barrier to access</li>
            <li className="flex gap-2"><span className="text-amber-500">✓</span> No need for paid staff, warehouses, or delivery logistics</li>
            <li className="flex gap-2"><span className="text-amber-500">✓</span> The platform is sustainable with even modest volume</li>
          </ul>
        </section>

        <section className="bg-amber-700 text-white rounded-2xl p-6 text-center">
          <h2 className="text-xl font-bold mb-2">This is just the beginning</h2>
          <p className="text-amber-100 text-sm leading-relaxed mb-4">
            We&apos;re starting with Trivandrum as a pilot. If this works — and we believe it will — we&apos;ll expand to Kochi, Kozhikode, and eventually every city in Kerala where young families need this.
          </p>
          <p className="text-amber-200 text-sm">
            You can help right now by donating an item or by spreading the word to new parents you know.
          </p>
        </section>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
        <Link href="/donate" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-center">
          Donate an item
        </Link>
        <Link href="/browse" className="bg-white hover:bg-amber-50 text-amber-700 font-semibold px-8 py-3 rounded-xl border border-amber-200 transition-colors text-center">
          Browse items
        </Link>
      </div>
    </div>
  );
}
