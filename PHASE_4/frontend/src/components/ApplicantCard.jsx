function ApplicantCard({ applicant }) {

    const initials = applicant.name
        .split(" ")
        .map(word => word[0])
        .join("");

    return (

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 flex items-center justify-between shadow">

            <div className="flex items-center gap-5">

                <div className="w-12 h-12 rounded-full bg-[#2772A0] flex items-center justify-center font-bold">
                    {initials}
                </div>

                <div>

                    <h3 className="text-lg font-semibold">
                        {applicant.name}
                    </h3>

                    <p className="text-gray-400">
                        {applicant.level}
                    </p>

                    <div className="flex gap-2 mt-2">

                        {applicant.skills.map(skill => (

                            <span
                                key={skill}
                                className="bg-slate-700 px-2 py-1 rounded text-sm"
                            >
                                {skill}
                            </span>

                        ))}

                    </div>

                </div>

            </div>

            <div className="flex gap-3">

                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
                    Accept
                </button>

                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
                    Reject
                </button>

            </div>

        </div>

    );

}

export default ApplicantCard;