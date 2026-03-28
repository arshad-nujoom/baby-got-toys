export const CATEGORIES = [
  { slug: "toys", label: "Toys", emoji: "🧸", description: "Stuffed animals, puzzles, blocks, and play sets" },
  { slug: "cradles", label: "Cradles & Cots", emoji: "🛏️", description: "Bassinets, cradles, cribs, and baby beds" },
  { slug: "shoes", label: "Shoes", emoji: "👟", description: "Tiny feet grow fast — pass them on" },
  { slug: "clothes", label: "Clothes", emoji: "👕", description: "Onesies, frocks, rompers, and more" },
  { slug: "books", label: "Books", emoji: "📚", description: "Story books, drawing books, activity books" },
] as const;

export const CONDITIONS = [
  { value: "like-new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair (minor wear)" },
] as const;

export const AGE_GROUPS = [
  { value: "0-1", label: "0–1 year" },
  { value: "1-3", label: "1–3 years" },
  { value: "3-6", label: "3–6 years" },
  { value: "6-12", label: "6–12 years" },
  { value: "any", label: "Any age" },
] as const;

export const TRIVANDRUM_AREAS = [
  "Pattom", "Kowdiar", "Vazhuthacaud", "Sasthamangalam", "Kesavadasapuram",
  "Ulloor", "Sreekaryam", "Kazhakuttom", "Technopark", "Vattiyoorkavu",
  "Thiruvallam", "Shangumugham", "Manacaud", "Thampanoor", "East Fort",
  "Chalai", "Palayam", "PMG", "Vellayambalam", "Museum",
  "Nanthancode", "Kawdiar", "Statue", "Bakery Junction", "Kuravankonam",
  "Nemom", "Kaniyapuram", "Attingal", "Chirayinkeezhu", "Navaikulam",
  "Nedumangad", "Varkala", "Perumathura", "Other",
];

export const FEE_OPTIONS = [
  { value: 10, label: "₹10" },
  { value: 20, label: "₹20" },
  { value: 30, label: "₹30" },
];
