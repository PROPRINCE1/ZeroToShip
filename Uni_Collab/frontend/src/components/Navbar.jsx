import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-8 h-16 flex justify-between items-center">

                <h1 className="text-2xl font-bold text-[#2772A0]">
                    Uni Collab
                </h1>

                <div className="flex gap-8 text-gray-300">

                    <Link
                        to="/"
                        className="hover:text-[#2772A0] transition"
                    >
                        Marketplace
                    </Link>

                    <Link
                        to="/Portal"
                        className="hover:text-[#2772A0] transition"
                    >
                        Portal
                    </Link>

                    <button className="hover:text-[#2772A0] transition">
                        Create Project
                    </button>

                    <button className="hover:text-[#2772A0] transition">
                        Profile
                    </button>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;