"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {Spinner} from "../../../components/ui/spinner";
import Image from "next/image";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  useEffect(() => {
    async function getProduct() {
      const res = await fetch(`/api/products/${slug}`);
      const data = await res.json();
      setProduct(data);
      // Default to the first variant (usually the cheapest/base model)
      setSelectedVariant(data.variants[0]);
    }
    if (slug) getProduct();
  }, [slug]);

  if (!product || !selectedVariant) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="w-16 h-screen mx-auto my-auto text-orange-500" />
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-12 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* LEFT: Product Image Section */}
        <div className="flex flex-col items-center sticky top-10 h-fit">
          <div className="bg-gray-50 rounded-3xl p-12 w-full flex justify-center aspect-square items-center shadow-sm">
            <Image
              src={selectedVariant.imageUrl}
                fill
                alt={product.name}
                className="max-h-full object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* RIGHT: Details Section */}
        <div className="flex flex-col space-y-8">
          <section>
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
              {product.name}
            </h1>
            <p className="text-xl text-gray-500 mt-2">{product.description}</p>
            <p className="text-md text-blue-500 font-medium mt-2">Color variant: {selectedVariant.color}</p>
          </section>

          {/* Price Display */}
          <section className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-gray-900">
                ₹{selectedVariant.currentPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-xl text-gray-400 line-through">
                ₹{selectedVariant.mrp.toLocaleString("en-IN")}
              </span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
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
          <section className="space-y-4">
            <h3 className="text-lg font-bold">Choose Storage</h3>
            <div className="flex flex-wrap gap-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => {
                    setSelectedVariant(variant);
                    setSelectedPlanId(null); // Reset EMI selection when variant changes
                  }}
                  className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
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
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                EMI plans backed by Mutual Funds
              </h3>
              <span className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">
                How it works?
              </span>
            </div>

            <div className="grid gap-4">
              {selectedVariant.emiPlans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedPlanId === plan.id
                      ? "border-black bg-gray-50 shadow-md"
                      : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div
                        className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlanId === plan.id ? "border-black bg-black" : "border-gray-300"}`}
                      >
                        {selectedPlanId === plan.id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <div>
                        <p className="text-xl font-bold">
                          ₹{plan.monthlyAmount.toLocaleString("en-IN")} / mo
                        </p>
                        <p className="text-gray-500 font-medium">
                          for {plan.tenureMonths} months
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
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
                    <div className="mt-3 flex items-center gap-2 text-green-700 bg-green-50 p-2 rounded-lg text-sm font-semibold">
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
            className={`w-full py-5 rounded-2xl font-extrabold text-xl transition-all shadow-lg ${
              selectedPlanId
                ? "bg-black text-white hover:bg-gray-800 scale-[1.02]"
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
