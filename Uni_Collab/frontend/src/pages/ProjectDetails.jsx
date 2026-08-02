import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";
import ApplyModal from "../components/ApplyModal";

function ProjectDetails() {

    const [applyOpen, setApplyOpen] = useState(false);

    const { projects, applications, addApplication } = useContext(ProjectContext);

    const { id } = useParams();

    const project = projects.find(
        p => p.id === Number(id)
    );


    if (!project) {

        return (

            <div className="text-white p-10">

                Project not found.

            </div>

        );

    }

    const alreadyApplied = applications.some(
        app => app.projectId === project.id
    );

    const owned = project.creator === "You";

    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, []);




    return (

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-28 lg:pb-10"> 
               {/* Hero Card */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10">

                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">

                        <div>

                            <div className="flex flex-wrap gap-3 mb-4 min-w-0">

                                {project.skills.map(skill => (

                                    <span

                                        key={skill}

                                        className="
px-4
py-1
rounded-full
bg-[#2772A0]/20
text-[#CCDDEA]
text-sm
max-w-full
break-all
"

                                    >

                                        {skill}

                                    </span>

                                ))}

                            </div>

                            <h1 className="text-5xl font-bold break-words overflow-wrap-anywhere">

                                {project.title}

                            </h1>

                            <p className="text-gray-400 mt-5 break-all overflow-wrap-anywhere whitespace-pre-wrap max-w-3xl leading-8 overflow-hidden">

                                {project.description}

                            </p>

                        </div>

                        <div>

                            <span

                                className={`

                    px-5

                    py-2

                    rounded-full

                    font-semibold

                    ${project.status === "Open"

                                        ? "bg-green-500/20 text-green-400"

                                        : "bg-red-500/20 text-red-400"}

                    `}

                            >

                                {project.status}

                            </span>

                        </div>

                    </div>

                </div>

            </div>

            <div className="grid lg:grid-cols-3 gap-8 mt-10">

                <div className="lg:col-span-2">
                    {/* Left column */}
                    <div className="bg-white/5 rounded-3xl border border-white/10 p-8">

                        <h2 className="text-2xl font-bold">

                            About this Project

                        </h2>

                        <p className="text-gray-300 mt-6 leading-8 break-all overflow-wrap-anywhere whitespace-pre-wrap overflow-hidden">

                            {project.description}

                        </p>

                    </div>

                    <div className="bg-white/5 rounded-3xl border border-white/10 p-8 mt-8">

                        <h2 className="text-2xl font-bold">
                            Required Roles
                        </h2>


                        <div className="grid md:grid-cols-2 gap-5 mt-8">

                            {project.positions && project.positions.length > 0 ? (

                                project.positions.map((position, index) => (

                                    <div
                                        key={index}
                                        className="
                    rounded-xl
                    bg-slate-800/60
                    p-5
                    "
                                    >

                                        <h3 className="font-semibold text-[#2772A0]">

                                            {position.role}

                                        </h3>


                                        {position.skills && (

                                            <p className="text-gray-400 mt-2">

                                                {position.skills.join(" • ")}

                                            </p>

                                        )}


                                        <span className="text-sm text-green-400">

                                            {position.slots} Position
                                            {position.slots > 1 ? "s" : ""} Open

                                        </span>


                                    </div>

                                ))

                            ) : (

                                <p className="text-gray-400">
                                    No roles specified.
                                </p>

                            )}

                        </div>

                    </div>

                    <div className="bg-white/5 rounded-3xl border border-white/10 p-8 mt-8">

                        <div className="flex justify-between items-center">

                            <h2 className="text-2xl font-bold">
                                Current Tasks
                            </h2>

                            <span className="text-sm text-[#2772A0]">
                                2 / 5 Completed
                            </span>

                        </div>

                        <div className="space-y-4 mt-8">

                            <div className="flex items-center gap-4">

                                <input type="checkbox" checked readOnly />

                                <span className="line-through text-gray-500">
                                    Database Schema
                                </span>

                            </div>

                            <div className="flex items-center gap-4">

                                <input type="checkbox" checked readOnly />

                                <span className="line-through text-gray-500">
                                    Authentication System
                                </span>

                            </div>

                            <div className="flex items-center gap-4">

                                <input type="checkbox" readOnly />

                                <span>
                                    Build Marketplace UI
                                </span>

                            </div>

                            <div className="flex items-center gap-4">

                                <input type="checkbox" readOnly />

                                <span>
                                    Connect Backend API
                                </span>

                            </div>

                            <div className="flex items-center gap-4">

                                <input type="checkbox" readOnly />

                                <span>
                                    Deploy MVP
                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="bg-white/5 rounded-3xl border border-white/10 p-8 mt-8">

                        <h2 className="text-2xl font-bold">

                            Technologies

                        </h2>

                        <div className="flex flex-wrap gap-4 mt-8">
                            {[
                                "React",
                                "Tailwind",
                                "Flask",
                                "PostgreSQL",
                                "Python",
                                "Git"
                            ].map(tech => (

                                <div

                                    key={tech}

                                    className="

                px-5
                py-3

                rounded-xl

                bg-slate-800

                border

                border-[#2772A0]/20

                "

                                >

                                    {tech}

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

                {/* Right column */}
                <div>

                    <div className="bg-white/5 rounded-3xl border border-white/10 p-8">

                        <h2 className="text-xl font-bold">

                            Project Info

                        </h2>

                        <div className="space-y-5 mt-8">

                            <div>

                                <p className="text-gray-400">

                                    Creator

                                </p>

                                <p className="font-semibold">

                                    {project.creator}

                                </p>

                            </div>

                            <div>

                                <p className="text-gray-400">

                                    Deadline

                                </p>

                                <p className="font-semibold">

                                    {project.deadline}

                                </p>

                            </div>

                            <div>

                                <p className="text-gray-400">

                                    Applicants

                                </p>

                                <p className="font-semibold">

                                    {project.applicants}

                                </p>

                            </div>

                        </div>
                        <div className="mt-8">
                            <button
                                disabled={alreadyApplied || owned}
                                onClick={() => setApplyOpen(true)}
                                className={`
        px-6
        py-3
        rounded-xl
        font-semibold
        transition
        ${owned
                                        ? "bg-slate-700 cursor-not-allowed"
                                        : alreadyApplied
                                            ? "bg-green-600 cursor-default"
                                            : "bg-cyan-600 hover:bg-cyan-500"
                                    }
    `}
                            >
                                {owned
                                    ? "Your Project"
                                    : alreadyApplied
                                        ? "Applied ✓"
                                        : "Apply to Project"}
                            </button>
                        </div>

                    </div>

                    <div className="bg-white/5 rounded-3xl border border-white/10 p-8 mt-8">

                        <h2 className="text-xl font-bold">

                            Team Members

                        </h2>

                        <div className="space-y-5 mt-8">
                                {/* Dummy data for only demo */}
                            {[
                                "Abdullah Irshad",
                                "Ahmed Ali",
                                "Sarah Khan"
                            ].map(member => (

                                <div
                                    key={member}
                                    className="flex items-center gap-4"
                                >

                                    <div className="w-12 h-12 rounded-full bg-[#2772A0] flex items-center justify-center font-bold">

                                        {member
                                            .split(" ")
                                            .map(n => n[0])
                                            .join("")
                                        }

                                    </div>

                                    <div>

                                        <p className="font-semibold">

                                            {member}

                                        </p>

                                        <p className="text-sm text-gray-400">

                                            Contributor

                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>
                    <div className="bg-white/5 rounded-3xl border border-white/10 p-8 mt-8">

                        <div className="flex justify-between">

                            <h2 className="text-xl font-bold">

                                Progress

                            </h2>

                            <span className="text-[#2772A0]">

                                65%

                            </span>

                        </div>

                        <div className="w-full h-3 rounded-full bg-slate-700 mt-6 overflow-hidden">

                            <div

                                className="h-full bg-[#2772A0] rounded-full"

                                style={{ width: "65%" }}

                            />

                        </div>

                    </div>

                    <div className="bg-white/5 rounded-3xl border border-white/10 p-8 mt-8">

                        <h2 className="text-xl font-bold">

                            Contact Creator

                        </h2>

                        <p className="text-gray-400 mt-4">

                            Have questions before applying?

                        </p>

                        <button

                            className="

        w-full

        mt-8

        rounded-xl

        py-3

        bg-[#2772A0]

        hover:bg-indigo-500

        transition

        "

                        >

                            Send Message

                        </button>

                    </div>

                    <ApplyModal

                        open={applyOpen}

                        project={project}

                        onClose={() => setApplyOpen(false)}

                        onSubmit={(applicationData) => {
                            addApplication({

                                id: Date.now(),

                                projectId: project.id,

                                projectTitle: project.title,

                                applicant: "You",

                                status: "Pending",

                                position: applicationData.position,

                                message: applicationData.message,

                            });

                            setApplyOpen(false);

                        }}

                    />
                </div>

            </div>

        </div>

    );

}

export default ProjectDetails;