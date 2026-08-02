function Stats() {

    const stats = [
        {
            title: "Projects",
            value: "128"
        },
        {
            title: "Students",
            value: "642"
        },
        {
            title: "Skills",
            value: "74"
        }
    ];

    return (

        <div className="grid md:grid-cols-3 gap-6 mt-10">

            {stats.map((stat) => (

                <div
                    key={stat.title}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center shadow"
                >

                    <h2 className="text-4xl font-bold text-[#2772A0]">
                        {stat.value}
                    </h2>

                    <p className="text-gray-400 mt-2">
                        {stat.title}
                    </p>

                </div>

            ))}

        </div>

    );

}

export default Stats;