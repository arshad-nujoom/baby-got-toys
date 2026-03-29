import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-amber-50 border-t border-amber-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🧸</span>
              <span className="font-bold text-amber-700">Baby Got Toys</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              A community platform in Trivandrum for passing on kids&apos; things to families who need them — inspired by Nordic circular economy values.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Browse</h4>
            <ul className="space-y-1 text-sm text-gray-500">
              <li><Link href="/browse?category=toys" className="hover:text-amber-700">Toys</Link></li>
              <li><Link href="/browse?category=cradles" className="hover:text-amber-700">Cradles & Cots</Link></li>
              <li><Link href="/browse?category=shoes" className="hover:text-amber-700">Shoes</Link></li>
              <li><Link href="/browse?category=clothes" className="hover:text-amber-700">Clothes</Link></li>
              <li><Link href="/browse?category=books" className="hover:text-amber-700">Books</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">About</h4>
            <ul className="space-y-1 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-amber-700">Our mission</Link></li>
              <li><Link href="/donate" className="hover:text-amber-700">Donate an item</Link></li>
            </ul>
            <p className="text-xs text-gray-400 mt-4">
              A small ₹10–30 maintenance fee from recipients helps keep the platform running. Donors pay nothing.
            </p>
          </div>
        </div>
        <div className="border-t border-amber-100 mt-6 pt-4 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Baby Got Toys · Trivandrum Pilot · Made with love for the community
        </div>
      </div>
    </footer>
  );
}
