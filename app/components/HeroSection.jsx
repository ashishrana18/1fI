export default function HeroSection() {
  return (
    <div className="bg-[#F8FAFC]">
      <header className="relative bg-white pt-8 pb-10 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-indigo-50/50 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-50 rounded-full blur-3xl opacity-60" />

        <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-8 border border-indigo-100">
            ✨ The Future of Consumer Credit
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Don&apos;t just spend. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-500">
              Grow while you buy.
            </span>
          </h1>

          <p className="text-slate-500 mt-8 text-xl max-w-2xl leading-relaxed">
            Experience India&apos;s first{" "}
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
  );
}
