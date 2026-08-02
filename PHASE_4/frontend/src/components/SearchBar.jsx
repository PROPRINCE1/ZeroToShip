function SearchBar() {
    return (
        <div className="mt-8">
            <input
                type="text"
                placeholder="Search projects..."
                className="w-full bg-slate-800 rounded-xl px-5 py-4 text-white outline-none border border-slate-700 focus:border-[#2772A0] transition"
            />
        </div>
    );
}

export default SearchBar;