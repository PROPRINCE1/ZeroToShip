import Navbar from "../components/Navbar";
import PortalStats from "../components/PortalStats";
import ApplicantCard from "../components/ApplicantCard";
import applicants from "../data/applicants";
import TopStatus from "../components/TopStatus";
import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";
import ProjectCard from "../components/ProjectCard";

function Portal({ showNotifications, setShowNotifications }) {

    const { projects, applications } = useContext(ProjectContext);


    return (
        <div className="min-h-screen bg-slate-900 pb-24 lg:pb-0">
            <TopStatus
                showNotifications={showNotifications}
                setShowNotifications={setShowNotifications}
            />
            {/* <Navbar /> */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                    Project Manager Portal
                </h1>

                <p className="text-gray-400 mt-3">
                    Manage your projects and review student applications.
                </p>

                <div className="mt-10">
                    <PortalStats />
                </div>

                <div className="mt-14">

                    <h2 className="text-3xl font-semibold mb-6">
                        My Projects
                    </h2>

                    <div className="grid lg:grid-cols-2 gap-8">

                        {projects
                            .filter(project => project.creator === "You")
                            .map(project => (

                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    owned={true}
                                />

                            ))}

                    </div>

                </div>

                <div className="mt-14">

                    <h2 className="text-3xl font-semibold mb-6">
                        Applicants
                    </h2>

                    <div className="space-y-5">

                        {
                            applications.length > 0 ? (

                                applications.map(application => (

                                    <div
                                        key={application.id}
                                        className="
bg-white/5
border
border-white/10
rounded-2xl
p-6
"
                                    >

                                        <h3 className="text-xl font-semibold">
                                            {application.applicant}
                                        </h3>

                                        <p className="text-gray-400 mt-2">
                                            Applied for {application.projectTitle}
                                        </p>

                                        <p className="text-gray-400">
                                            Position: {application.position || "General"}
                                        </p>


                                        <div className="flex gap-4 mt-5">

                                            <button
                                                className="
bg-green-600
px-5
py-2
rounded-xl
"
                                            >
                                                Accept
                                            </button>


                                            <button
                                                className="
bg-red-600
px-5
py-2
rounded-xl
"
                                            >
                                                Reject
                                            </button>

                                        </div>


                                    </div>

                                ))

                            ) : (

                                <p className="text-gray-400">
                                    No applications yet.
                                </p>

                            )

                        }

                    </div>

                </div>

                <div className="mt-14">

                    <h2 className="text-3xl font-semibold mb-6">
                        My Applications
                    </h2>


                    <div className="space-y-5">


                        {applications.length > 0 ? (

                            applications.map(application => (

                                <div

                                    key={application.id}

                                    className="
                    bg-white/5
                    backdrop-blur-xl
                    border
                    border-white/10
                    rounded-2xl
                    p-6
                    "

                                >


                                    <div className="flex justify-between items-start">


                                        <div>

                                            <h3 className="text-xl font-semibold">

                                                {application.projectTitle}

                                            </h3>


                                            <p className="text-gray-400 mt-2">

                                                Applied for:
                                                {" "}
                                                <span className="text-[#2772A0]">

                                                    {application.position || "General"}

                                                </span>

                                            </p>


                                        </div>



                                        <span

                                            className={`
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-semibold

                            ${application.status === "Accepted"
                                                    ? "bg-green-500/20 text-green-400"

                                                    : application.status === "Rejected"
                                                        ? "bg-red-500/20 text-red-400"

                                                        : "bg-yellow-500/20 text-yellow-400"
                                                }
                            `}

                                        >

                                            {application.status}

                                        </span>


                                    </div>



                                    {application.message && (

                                        <div className="mt-5">


                                            <p className="text-gray-400 text-sm">

                                                Your message:

                                            </p>


                                            <p className="mt-2 text-gray-300">

                                                {application.message}

                                            </p>


                                        </div>

                                    )}


                                </div>

                            ))

                        ) : (

                            <p className="text-gray-400">

                                You haven't applied to any projects yet.

                            </p>

                        )}


                    </div>


                </div>

            </div>

        </div>
    );
}

export default Portal;