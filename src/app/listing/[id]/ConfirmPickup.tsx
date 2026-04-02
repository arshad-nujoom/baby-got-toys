"use client";

import { useState } from "react";
import { FEE_OPTIONS } from "@/lib/constants";

type Props = {
  listingId: string;
  donorName: string;
  donorPhone: string;
  donorWhatsapp: string | null;
  area: string;
  title: string;
};

export default function ConfirmPickup({ listingId, donorName, donorPhone, donorWhatsapp, area, title }: Props) {
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [feeAmount, setFeeAmount] = useState(10);

  const whatsappMsg = encodeURIComponent(
    `Hi! I saw your listing on Baby Got Toys — "${title}". Is it still available? I'd love to collect it.`
  );

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    try {
      if (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
        const orderRes = await fetch("/api/payment/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: feeAmount, listingId }),
        });
        const order = await orderRes.json();
        const Razorpay = (window as unknown as { Razorpay: new (opts: unknown) => { open: () => void } }).Razorpay;
        const rzp = new Razorpay({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: "INR",
          name: "Baby Got Toys",
          description: `Pickup confirmation for: ${title}`,
          order_id: order.id,
          handler: async (response: { razorpay_payment_id: string }) => {
            await fetch(`/api/listings/${listingId}/pay`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId: response.razorpay_payment_id }),
            });
            setRevealed(true);
          },
          theme: { color: "#d97706" },
        });
        rzp.open();
      } else {
        // Dev mode: simulate payment
        setRevealed(true);
      }
    } catch {
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (revealed) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-green-600 text-lg">✓</span>
          <h3 className="font-semibold text-gray-800 text-sm">Pickup confirmed! Here are the donor&apos;s details</h3>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Contact {donorName} to fix a time to collect from their home in {area}.
        </p>
        <div className="flex flex-col gap-2">
          <a
            href={`tel:${donorPhone}`}
            className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
          >
            <span>📞</span> Call {donorName}
          </a>
          {donorWhatsapp && (
            <a
              href={`https://wa.me/91${donorWhatsapp.replace(/\D/g, "")}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
            >
              <span>💬</span> WhatsApp {donorName}
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
      <h3 className="font-semibold text-gray-800 mb-1 text-sm">Interested? Confirm your pickup</h3>
      <p className="text-xs text-gray-500 mb-4">
        Pay a small token fee to confirm your pickup slot. This unlocks the donor&apos;s contact details and guarantees your reservation. The donor pays nothing.
      </p>

      <div className="mb-4">
        <p className="text-xs font-medium text-gray-600 mb-2">Choose your token fee</p>
        <div className="flex gap-2">
          {FEE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFeeAmount(opt.value)}
              className={`flex-1 py-2 rounded-xl border text-sm font-semibold transition-all ${
                feeAmount === opt.value
                  ? "border-amber-500 bg-amber-100 text-amber-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-amber-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-xs mb-3">{error}</p>
      )}

      <button
        type="button"
        onClick={handleConfirm}
        disabled={loading}
        className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
      >
        {loading ? "Processing…" : `Confirm pickup & pay ₹${feeAmount}`}
      </button>

      {!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && (
        <p className="text-center text-xs text-gray-400 mt-2">Dev mode: payment is simulated</p>
      )}
    </div>
  );
}
