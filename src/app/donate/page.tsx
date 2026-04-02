import DonateForm from "./DonateForm";

export const metadata = {
  title: "Donate an item — Baby Got Toys",
  description: "List a kids' item for donation in Trivandrum. Free to list — recipients pay a small ₹10–30 pickup confirmation fee.",
};

export default function DonatePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <div className="text-4xl mb-3">📦</div>
        <h1 className="text-3xl font-bold text-gray-800">Donate an item</h1>
        <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
          List something your child has outgrown — completely free. Recipients pay a small ₹10–30 token fee when they confirm pickup.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6 text-sm text-amber-800">
        <strong>Before you list:</strong> Only items in usable condition (toys, cradles, shoes, clothes, books). No torn, broken, or unsafe items. The recipient will collect directly from your home.
      </div>

      <DonateForm />
    </div>
  );
}
