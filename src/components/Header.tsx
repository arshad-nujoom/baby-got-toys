import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-amber-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🧸</span>
          <div>
            <span className="font-bold text-lg text-amber-700 leading-none block">Baby Got Toys</span>
            <span className="text-xs text-gray-400 leading-none">Trivandrum Community</span>
          </div>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link href="/browse" className="text-sm text-gray-600 hover:text-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-50 transition-colors">
            Browse
          </Link>
          <Link href="/about" className="text-sm text-gray-600 hover:text-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-50 transition-colors hidden sm:block">
            About
          </Link>
          <Link href="/donate" className="text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white px-4 py-1.5 rounded-lg transition-colors">
            Donate an item
          </Link>
        </nav>
      </div>
    </header>
  );
}
