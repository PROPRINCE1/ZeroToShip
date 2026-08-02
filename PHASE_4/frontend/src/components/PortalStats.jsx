function PortalStats() {

    const stats = [
        { title: "Projects", value: 4 },
        { title: "Applications", value: 23 },
        { title: "Accepted", value: 8 },
        { title: "Pending", value: 15 }
    ];

    return (
        <div className="grid md:grid-cols-4 gap-6">

            {stats.map((item) => (

                <div
                    key={item.title}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow"
                >
                    <h2 className="text-3xl font-bold text-[#2772A0]">
                        {item.value}
                    </h2>

                    <p className="text-gray-400 mt-2">
                        {item.title}
                    </p>
                </div>

            ))}

        </div>
    );

}

export default PortalStats;