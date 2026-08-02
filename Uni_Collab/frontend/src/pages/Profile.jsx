import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";
import ProjectCard from "../components/ProjectCard";
import profileSkills from "../data/profileSkills";
import achievements from "../data/achievements";

function Profile() {

    const { projects, applications } = useContext(ProjectContext);

    const createdProjects = projects.filter(
        project => project.creator === "You"
    );

    const joinedProjects = projects.filter(project =>
        applications.some(app => app.projectId === project.id)
    );

    const unlockedAchievements = achievements.map(achievement => {

        let unlocked = false;

        switch (achievement.condition) {

            case "created":
                unlocked = createdProjects.length > 0;
                break;

            case "joined":
                unlocked = joinedProjects.length > 0;
                break;

            case "multiple":
                unlocked = createdProjects.length >= 2;
                break;

            case "applied":
                unlocked = applications.length > 0;
                break;

        }

        return {
            ...achievement,
            unlocked
        };

    });

    return (

        <div className="min-h-screen pb-24">

            <div className="max-w-7xl mx-auto px-8 py-10">

                <h1 className="text-5xl font-bold">
                    My Profile
                </h1>


                <div className="mt-10 bg-white/5 rounded-3xl border border-white/10 p-10">

                    <div className="flex items-center gap-8">

                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#2772A0] flex items-center justify-center text-4xl font-bold">
                            <span className="text-3xl sm:text-5xl">
                                AI
                            </span>
                        </div>

                        <div>

                            <h2 className="text-4xl font-bold">

                                Abdullah Irshad

                            </h2>

                            <p className="text-gray-400 mt-2">

                                CSIT • NED University

                            </p>

                        </div>

                    </div>

                </div>

                <div className="mt-8 bg-white/5 rounded-3xl border border-white/10 p-8">

                    <div className="flex justify-between">

                        <h2 className="text-2xl font-semibold">

                            Level 12

                        </h2>

                        <span>

                            1240 / 2000 XP

                        </span>

                    </div>

                    <div className="w-full h-4 bg-slate-800 rounded-full mt-6">

                        <div className="h-full w-3/5 bg-[#2772A0] rounded-full" />

                    </div>

                </div>
                <div className="mt-10">

                    <h2 className="text-3xl font-bold mb-6">

                        Skills

                    </h2>

                    <div className="bg-white/5 rounded-3xl border border-white/10 p-8 space-y-6">

                        {profileSkills.map(skill => (

                            <div key={skill.name}>

                                <div className="flex justify-between mb-2">

                                    <span className="font-medium">

                                        {skill.name}

                                    </span>

                                    <span>

                                        {skill.level}%

                                    </span>

                                </div>

                                <div className="h-3 bg-slate-800 rounded-full">

                                    <div

                                        className="h-full rounded-full bg-[#2772A0] transition-all duration-700"

                                        style={{ width: `${skill.level}%` }}

                                    />

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                <div className="mt-10">

                    <h2 className="text-3xl font-bold mb-6">

                        Projects Created

                    </h2>

                    <div className="grid lg:grid-cols-2 gap-8">

                        {createdProjects.map(project => (

                            <ProjectCard

                                key={project.id}

                                project={project}

                                owned={true}

                            />

                        ))}

                    </div>

                </div>
                <div className="mt-10">

                    <h2 className="text-3xl font-bold mb-6">

                        Projects Joined

                    </h2>

                    <div className="grid lg:grid-cols-2 gap-8">

                        {joinedProjects.length > 0 ? (

                            joinedProjects.map(project => (

                                <ProjectCard

                                    key={project.id}

                                    project={project}

                                    joined={true}

                                />

                            ))

                        ) : (

                            <p className="text-gray-400">

                                You haven't joined any projects yet.

                            </p>

                        )}

                    </div>

                </div>

                <div className="mt-10">

                    <h2 className="text-3xl font-bold mb-6">
                        Achievements
                    </h2>


                    <div className="grid md:grid-cols-3 gap-6">

                        {unlockedAchievements.map(achievement => (

                            <div
                                key={achievement.id}
                                className={`
                    rounded-2xl
                    border
                    p-6
                    transition

                    ${achievement.unlocked
                                        ?
                                        "bg-white/5 border-white/10"
                                        :
                                        "bg-black/20 border-white/5 opacity-40"
                                    }
                `}
                            >

                                <div className="text-4xl">
                                    {achievement.icon}
                                </div>


                                <h3 className="text-xl font-semibold mt-4">

                                    {achievement.title}

                                </h3>


                                <p className="text-gray-400 mt-2">

                                    {achievement.description}

                                </p>


                                {!achievement.unlocked && (

                                    <p className="text-sm text-gray-500 mt-4">
                                        Locked
                                    </p>

                                )}

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Profile;