import Image from "next/image";

export default function Navbar() {
  return (
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
  );
}
