"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import {Spinner} from "../components/ui/spinner";

export default function HomePage() {
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
    return <Spinner className="w-16 h-screen mx-auto my-auto text-orange-500" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#F8FAFC]">
        {/* Navigation Bar */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
          <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center">
            {/* logo */}
            <div className="flex items-center gap-3 cursor-pointer">
              <Image
                src="https://res.cloudinary.com/ashishrana/image/upload/v1771570685/1fi_u6z7so.svg"
                alt="1Fi Logo"
                width={50}
                height={50}
              />
            </div>

            {/* nav links */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 text-sm font-bold text-slate-600">
              <a href="#" className="hover:text-indigo-600 transition-colors">
                Products
              </a>
              <a href="#" className="hover:text-indigo-600 transition-colors">
                How 1Fi Works
              </a>
              <a href="#" className="hover:text-indigo-600 transition-colors">
                My Investments
              </a>
            </div>

            {/* auth buttons */}
            <div className="ml-auto flex items-center gap-4">
              <button className="text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                Log In
              </button>
              <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all">
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="relative bg-white pt-20 pb-10 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-50/50 to-transparent pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-50 rounded-full blur-3xl opacity-60" />

          <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-8 border border-indigo-100">
              ✨ The Future of Consumer Credit
            </div>

            <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Don't just spend. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500">
                Grow while you buy.
              </span>
            </h1>

            <p className="text-slate-500 mt-8 text-xl max-w-2xl leading-relaxed">
              Experience India's first{" "}
              <span className="text-slate-900 font-semibold">
                Asset-Backed EMI
              </span>
              . Use your Mutual Funds to power your next flagship purchase at
              1Fi.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-5">
              <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 w-40">
                <span className="text-indigo-600 font-black text-2xl">0%</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  Processing Fee
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 w-40">
                <span className="text-indigo-600 font-black text-2xl">
                  Instant
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  Credit Limit
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 w-40">
                <span className="text-indigo-600 font-black text-2xl">
                  100%
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  Digital Process
                </span>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-6 pt-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
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
      </main>
    </div>
  );
}
