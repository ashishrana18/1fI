"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {Spinner} from "../../../components/ui/spinner";
import {toast} from "sonner"
import Image from "next/image";
import Link from "next/link";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    async function getProduct() {
      const res = await fetch(`/api/products/${slug}`);
      const data = await res.json();
      setProduct(data);
      setSelectedVariant(data.variants[0]);
    }
    if (slug) getProduct();
  }, [slug]);

  if (!product || !selectedVariant) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-5rem)] px-4">
        <Spinner className="w-16 h-16 text-orange-500" />
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 md:p-12 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        {/* LEFT: Product Image Section */}
        <div className="flex flex-col items-center lg:sticky lg:top-24 h-fit order-1">
          <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 w-full flex justify-center aspect-square items-center shadow-sm relative">
            <Link
              href="/"
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={selectedVariant.imageUrl}
                fill
                alt={product.name}
                className="max-h-full object-contain transition-transform duration-500 hover:scale-105"
              />
            </Link>
          </div>
        </div>

        {/* RIGHT: Details Section */}
        <div className="flex flex-col space-y-6 sm:space-y-8 order-2">
          <section>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 mt-2 line-clamp-2 sm:line-clamp-none">
              {product.description}
            </p>
            <p className="text-sm md:text-base text-blue-500 font-medium mt-2">
              Color variant: {selectedVariant.color}
            </p>
          </section>

          {/* Price Display */}
          <section className="bg-orange-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-orange-100">
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-4">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                ₹{selectedVariant.currentPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-base sm:text-lg md:text-xl text-gray-400 line-through">
                ₹{selectedVariant.mrp.toLocaleString("en-IN")}
              </span>
              <span className="bg-orange-500 text-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold shrink-0">
                {Math.round(
                  ((selectedVariant.mrp - selectedVariant.currentPrice) /
                    selectedVariant.mrp) *
                    100
                )}
                % OFF
              </span>
            </div>
          </section>

          {/* Variant Selector */}
          <section className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-bold">Choose Storage</h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => {
                    setSelectedVariant(variant);
                    setSelectedPlanId(null); // Reset EMI selection when variant changes
                  }}
                  className={`px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl border-2 font-semibold text-sm sm:text-base transition-all ${
                    selectedVariant.id === variant.id
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {variant.storage}
                </button>
              ))}
            </div>
          </section>

          {/* EMI Plans Section */}
          <section className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <h3 className="text-base sm:text-lg font-bold">
                EMI plans backed by Mutual Funds
              </h3>
              <span className="text-sm text-blue-600 font-medium cursor-pointer hover:underline shrink-0">
                How it works?
              </span>
            </div>

            <div className="grid gap-3 sm:gap-4">
              {selectedVariant.emiPlans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`relative p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedPlanId === plan.id
                      ? "border-black bg-gray-50 shadow-md"
                      : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div
                        className={`mt-0.5 sm:mt-1 w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${selectedPlanId === plan.id ? "border-black bg-black" : "border-gray-300"}`}
                      >
                        {selectedPlanId === plan.id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-lg sm:text-xl font-bold">
                          ₹{plan.monthlyAmount.toLocaleString("en-IN")} / mo
                        </p>
                        <p className="text-sm sm:text-base text-gray-500 font-medium">
                          for {plan.tenureMonths} months
                        </p>
                      </div>
                    </div>
                    <div className="sm:text-right shrink-0">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded uppercase ${plan.interestRate === 0 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                      >
                        {plan.interestRate === 0
                          ? "No Cost EMI"
                          : `${plan.interestRate}% Interest`}
                      </span>
                    </div>
                  </div>

                  {plan.additionalCashback > 0 && (
                    <div className="mt-3 flex items-center gap-2 text-green-700 bg-green-50 p-2 sm:p-2.5 rounded-lg text-xs sm:text-sm font-semibold">
                      <span className="text-lg">💰</span>₹
                      {plan.additionalCashback.toLocaleString("en-IN")} Extra
                      Cashback on this plan
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Checkout Button */}
          <button
            onClick={() => toast.success("Order placed", { position: "top-center" })}
            className={`w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl font-extrabold text-base sm:text-xl transition-all shadow-lg active:scale-[0.98] ${
              selectedPlanId
                ? "bg-black text-white hover:bg-gray-800 sm:hover:scale-[1.01]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {selectedPlanId ? "Buy Now" : "Select an EMI Plan"}
          </button>
        </div>
      </div>
    </main>
  );
}
