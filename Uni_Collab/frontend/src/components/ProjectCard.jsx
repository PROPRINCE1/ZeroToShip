import { Link } from "react-router-dom";


function ProjectCard({
    project,
    preview = false,
    joined = false,
    owned = false
}) {

    const initials = project.creator
        ? project.creator
            .split(" ")
            .map(word => word[0])
            .join("")
        : "?";

    const canApply =
        !joined &&
        !owned &&
        project?.status === "Open";

    const Card = (

        <div>
            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden border-slate-700 hover:border-[#2772A0] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#2772A0]/20">

                <div className="h-2 bg-gradient-to-r from-[#2772A0] via-[#3B8BB8] to-[#2772A0]" />

                <div className="p-5 sm:p-6">

                    <div className="flex justify-between items-start">

                        <div>

                            <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#2772A0] transition">
                                {project.title}
                            </h2>

                            <p className="text-gray-400 mt-2 whitespace-pre-wrap break-words overflow-hidden">
                                {project.description}
                            </p>

                        </div>

                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === "Open"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                                }`}
                        >
                            {project.status}
                        </span>

                    </div>

                    <div className="gap-2 mt-6">

                        {project.skills?.length > 0 && (

                            <div className="flex flex-wrap gap-2 mt-6">

                                {project.skills.map(skill => (

                                    <span

                                        key={skill}

                                        className="
                bg-slate-700
                px-3
                py-1
                rounded-full
                text-sm
                text-[#CCDDEA]
                "

                                    >

                                        {skill}

                                    </span>

                                ))}

                            </div>

                        )}

                        {project.positions && project.positions.length > 0 && (

                            <div className="mt-5">

                                <p className="text-gray-400 text-sm mb-2">
                                    Looking for:
                                </p>


                                <div className="flex flex-wrap gap-2">

                                    {project.positions.map((position, index) => (

                                        <span

                                            key={index}

                                            className="
                    px-3
                    py-1
                    rounded-full
                    bg-[#2772A0]/10
                    text-[#CCDDEA]
                    text-sm
                    "

                                        >

                                            {position.role || "Role"}
                                            {" "}×{position.slots}

                                        </span>

                                    ))}

                                </div>

                            </div>

                        )}

                    </div>

                    <div className="flex gap-3 mt-4">

                        <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm">

                            {project.category}

                        </span>


                        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">

                            {project.difficulty}

                        </span>

                    </div>

                    <div className="border-t border-slate-700 mt-6 pt-6">

                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">



                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-full bg-[#2772A0] flex items-center justify-center font-bold">

                                    {initials}

                                </div>

                                <div>

                                    <p className="font-semibold">
                                        {project.creator}
                                    </p>

                                    <p className="text-sm text-gray-400">
                                        Project Creator
                                    </p>

                                </div>

                            </div>

                            {canApply ? (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    className={`
            bg-cyan-600
            hover:bg-cyan-500
            transition
            px-5
            py-2
            rounded-lg
            font-medium
            ${preview ? "ml-auto" : ""}
        `}
                                >
                                    Apply
                                </button>
                            ) : joined ? (
                                <button
                                    disabled
                                    className="bg-green-600 px-5 py-2 rounded-lg font-medium cursor-default"
                                >
                                    Joined ✓
                                </button>
                            ) : owned ? (
                                <button
                                    disabled
                                    className="bg-slate-700 px-5 py-2 rounded-lg font-medium cursor-default"
                                >
                                    Your Project
                                </button>
                            ) : (
                                <button
                                    disabled
                                    className="bg-red-600 px-5 py-2 rounded-lg font-medium cursor-default"
                                >
                                    Closed
                                </button>
                            )}

                        </div>

                    </div>



                </div>

            </div>
        </div>
    );

    if (preview) {
        return Card;
    }

    return (

        <Link
            to={`/project/${project.id}`}
            className="block"
        >

            {Card}

        </Link>


    );

}

export default ProjectCard;