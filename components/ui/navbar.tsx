import Link from "next/link";

export default function Navbar() {
  return (
    <Link href="/">
      <nav className="bg-red-600 text-white sticky top-0 z-50 shadow-lg h-10 p-1">
        <div className="text-center">
          <h4 className="text-xl font-extrabold inline-block uppercase transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
            <span className="inline-block mr-2 text-blue-700 transition-transform duration-300 hover:scale-125">
              ★
            </span>
            United States Congress
            <span className="inline-block ml-2 text-blue-700 transition-transform duration-300 hover:scale-125">
              ★
            </span>
          </h4>
        </div>
      </nav>
    </Link>
  );
}
