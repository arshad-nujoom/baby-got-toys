"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, CONDITIONS, AGE_GROUPS, TRIVANDRUM_AREAS } from "@/lib/constants";

type Step = "details" | "contact" | "done";

export default function DonateForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("details");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    area: "",
    ageGroup: "any",
    donorName: "",
    donorPhone: "",
    donorWhatsapp: "",
  });

  const set = (k: keyof typeof form, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 4);
    setPreviewUrls(files.map((f) => URL.createObjectURL(f)));
    const uploaded: string[] = [];
    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const { url } = await res.json();
        uploaded.push(url);
      }
    }
    setUploadedPhotos(uploaded);
  };

  const validateDetails = () => {
    if (!form.title.trim()) return "Please add a title";
    if (!form.category) return "Please select a category";
    if (!form.condition) return "Please select the condition";
    if (!form.area) return "Please select your area";
    if (!form.description.trim()) return "Please add a short description";
    return null;
  };

  const validateContact = () => {
    if (!form.donorName.trim()) return "Please enter your name";
    if (!/^\d{10}$/.test(form.donorPhone.trim())) return "Enter a valid 10-digit phone number";
    return null;
  };

  const handleDetailsNext = () => {
    const err = validateDetails();
    if (err) { setError(err); return; }
    setError("");
    setStep("contact");
  };

  const handleSubmit = async () => {
    const err = validateContact();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, feeAmount: 10, photos: uploadedPhotos }),
      });
      if (!res.ok) throw new Error("Failed to create listing");
      const { listing } = await res.json();
      // Donors list for free — activate immediately
      await fetch(`/api/listings/${listing.id}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId: "donor_free" }),
      });
      setStep("done");
      setTimeout(() => router.push(`/listing/${listing.id}`), 2000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "done") {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Item listed!</h2>
        <p className="text-gray-500 text-sm">Your item is now live. Redirecting to your listing…</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      {/* Step indicator */}
      <div className="flex border-b border-gray-100">
        {(["details", "contact"] as Step[]).map((s, i) => (
          <div key={s} className={`flex-1 py-3 text-center text-xs font-medium border-b-2 transition-colors ${
            step === s ? "border-amber-500 text-amber-600" :
            ["details", "contact"].indexOf(step) > i ? "border-green-400 text-green-600" :
            "border-transparent text-gray-400"
          }`}>
            {i + 1}. {s === "details" ? "Item details" : "Your contact"}
          </div>
        ))}
      </div>

      <div className="p-6">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-3 mb-4">
            {error}
          </div>
        )}

        {/* Step 1: Item details */}
        {step === "details" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => set("category", cat.slug)}
                    className={`p-3 rounded-xl border text-center text-xs transition-all ${
                      form.category === cat.slug
                        ? "border-amber-400 bg-amber-50 text-amber-700 font-semibold"
                        : "border-gray-200 hover:border-amber-200 text-gray-600"
                    }`}
                  >
                    <div className="text-2xl mb-1">{cat.emoji}</div>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. Fisher-Price Activity Gym, 6-month girl dresses set"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Describe the item — size, colour, what's included, any minor wear etc."
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition *</label>
                <select
                  value={form.condition}
                  onChange={(e) => set("condition", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                >
                  <option value="">Select condition</option>
                  {CONDITIONS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age group</label>
                <select
                  value={form.ageGroup}
                  onChange={(e) => set("ageGroup", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                >
                  {AGE_GROUPS.map((a) => (
                    <option key={a.value} value={a.value}>{a.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your area in Trivandrum *</label>
              <select
                value={form.area}
                onChange={(e) => set("area", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="">Select area</option>
                {TRIVANDRUM_AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Photos (optional, max 4)</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 hover:border-amber-300 rounded-xl p-6 text-center cursor-pointer transition-colors"
              >
                {previewUrls.length > 0 ? (
                  <div className="flex gap-2 flex-wrap justify-center">
                    {previewUrls.map((url, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={i} src={url} alt="" className="w-16 h-16 object-cover rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="text-2xl mb-1">📷</div>
                    <p className="text-xs text-gray-400">Click to add photos</p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <button
              type="button"
              onClick={handleDetailsNext}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Next: Your contact details →
            </button>
          </div>
        )}

        {/* Step 2: Contact info */}
        {step === "contact" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Your contact details will be shown to recipients after they confirm pickup. Listing is completely free for you.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your name *</label>
              <input
                type="text"
                value={form.donorName}
                onChange={(e) => set("donorName", e.target.value)}
                placeholder="e.g. Asha Nair"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone number *</label>
              <div className="flex">
                <span className="bg-gray-50 border border-r-0 border-gray-200 px-3 py-2.5 rounded-l-xl text-sm text-gray-500">+91</span>
                <input
                  type="tel"
                  value={form.donorPhone}
                  onChange={(e) => set("donorPhone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="9876543210"
                  className="flex-1 border border-gray-200 rounded-r-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp number (optional)</label>
              <div className="flex">
                <span className="bg-gray-50 border border-r-0 border-gray-200 px-3 py-2.5 rounded-l-xl text-sm text-gray-500">+91</span>
                <input
                  type="tel"
                  value={form.donorWhatsapp}
                  onChange={(e) => set("donorWhatsapp", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="Same as phone or different"
                  className="flex-1 border border-gray-200 rounded-r-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-xs text-green-800 space-y-1">
              <div>✓ Listing is completely free for donors</div>
              <div>✓ Recipients pay a small ₹10–30 token fee when they confirm pickup</div>
              <div>✓ Your item goes live immediately after submission</div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep("details")}
                className="flex-1 border border-gray-200 text-gray-600 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                {loading ? "Listing…" : "List for free →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
