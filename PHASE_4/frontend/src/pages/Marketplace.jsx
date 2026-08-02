import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import SearchBar from "../components/SearchBar";
import Stats from "../components/Stats";
import SkillFilter from "../components/SkillFilter";
import TopStatus from "../components/TopStatus";
import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";


function Marketplace({ showNotifications, setShowNotifications }) {

    const { projects } = useContext(ProjectContext);

    return (
        <div className="min-h-screen bg-slate-900 pb-24 lg:pb-0">
            <TopStatus
                showNotifications={showNotifications}
                setShowNotifications={setShowNotifications}
            />
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">

                <div className="absolute -top-40 -left-32 w-[34rem] h-[34rem] rounded-full bg-[#2772A0]/20 blur-[170px]" />

                <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] rounded-full bg-[#2772A0]/20 blur-[180px]" />

            </div>

            <div className="fixed -top-32 -left-32 w-96 h-96 bg-[#2772A0] opacity-20 blur-[150px] rounded-full pointer-events-none" />

            <div className="fixed bottom-0 right-0 w-[30rem] h-[30rem] bg-[#2772A0] opacity-20 blur-[180px] rounded-full pointer-events-none" />

            {/* <Navbar /> */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="
                    bg-gradient-to-r
                    from-[#2772A0]
                    via-blue-600
                    to-indigo-700
                    rounded-3xl
                    p-6
                    sm:p-8
                    lg:p-10
                    overflow-hidden
                ">

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold break-words">
                        Find Your Next
                        <br />
                        University Project
                    </h1>

                    <p className="text-blue-100 mt-6 max-w-2xl text-base sm:text-lg leading-7">

                        Discover innovative student projects, connect with talented teammates,
                        and build your portfolio through real collaboration.

                    </p>

                    <div className="mt-8">

                        <SearchBar />

                    </div>

                </div>

                <Stats />

                <SkillFilter />

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-12">

                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            joined={false}
                            owned={project.creator === "You"}
                        />
                    ))}

                </div>

            </div>

        </div>
    );
}

export default Marketplace;