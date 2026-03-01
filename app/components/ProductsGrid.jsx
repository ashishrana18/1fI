"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { Spinner } from "../../components/ui/spinner";

export default function ProductsGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-6 pt-8 pb-12 min-h-[400px] flex items-center justify-center">
        <Spinner className="w-16 h-16 text-orange-500" />
      </main>
    );
  }
  return (
    <div>
      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-6 pt-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center">
          {products &&
            products.length > 0 &&
            products.map((product) => {
              const minPrice = Math.min(
                ...product.variants.map((v) => v.currentPrice)
              );

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Product Image */}
                <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center overflow-hidden mb-6">
                  <Image
                    src={product.variants[0]?.imageUrl}
                    width={500}
                    height={500}
                    alt={product.name}
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {product.name}
                    </h2>
                    <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded">
                      NEW
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {product.description}
                  </p>

                  <div className="pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                        Starting from
                      </p>
                      <p className="text-2xl font-black text-black">
                        ₹{minPrice.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="bg-orange-500 p-3 rounded-full text-white group-hover:bg-orange-600 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex gap-2 pt-2">
                    {product.variants.map((v) => (
                      <span
                        key={v.id}
                        className="text-[10px] border border-gray-200 px-2 py-0.5 rounded-md text-gray-400"
                      >
                        {v.storage}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {products && products.length === 0 && (
          <p className="text-2xl font-bold mt-5 text-center mx-auto justify-center items-center text-gray-500">
            No products found
          </p>
        )}
      </main>
    </div>
  );
}
