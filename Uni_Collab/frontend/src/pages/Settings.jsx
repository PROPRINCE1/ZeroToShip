import Toggle from "../components/Toggle";
import { useContext, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";
import Toast from "../components/Toast";
import DeleteProjectModal from "../components/DeleteProjectModal";


function Settings() {


    const { projects, deleteProject } = useContext(ProjectContext);

    const myProjects = projects.filter(
        project => project.creator === "You"
    );

    const [selectedProject, setSelectedProject] = useState("");
    const [toast, setToast] = useState("");

    const [deleteOpen, setDeleteOpen] = useState(false);

    function handleDeleteProject() {

        const project = myProjects.find(
            project => project.id == selectedProject
        );

        deleteProject(Number(selectedProject));

        setDeleteOpen(false);

        setSelectedProject("");

        setToast(`✅ "${project.title}" was deleted successfully.`);

        setTimeout(() => {

            setToast("");

        }, 3000);

    }

    function handleSave() {

        setToast("✅ Settings saved successfully.");

        setTimeout(() => {
            setToast("");
        }, 3000);

    }

    return (

        <div className="min-h-screen">

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-28 lg:pb-10">

                <h1 className="text-5xl font-bold">

                    Settings

                </h1>


                <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8">

                    <h2 className="text-2xl font-bold">

                        Account

                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

                        <input
                            placeholder="Full Name"
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4"
                        />

                        <input
                            placeholder="Email"
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4"
                        />

                        <input
                            placeholder="Department"
                            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4"
                        />

                    </div>
                </div>

                <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8">

                    <h2 className="text-2xl font-bold">

                        Notifications

                    </h2>

                    <div className="space-y-5 mt-8">

                        <label className="flex justify-between">

                            <span>Email Notifications</span>

                            <Toggle />

                        </label>

                        <label className="flex justify-between">

                            <span>Application Updates</span>

                            <Toggle />

                        </label>

                        <label className="flex justify-between">

                            <span>Project Invitations</span>

                            <Toggle />

                        </label>

                    </div>

                </div>

                <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8">

                    <h2 className="text-2xl font-bold">

                        Appearance

                    </h2>

                    <select
                        className="mt-6 rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 w-full"
                    >

                        <option>Dark</option>

                        <option>Light</option>

                        <option>System</option>

                    </select>

                </div>

                <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8">

                    <h2 className="text-2xl font-bold">

                        Security

                    </h2>

                    <div className="space-y-5 mt-8">

                        <button className="w-full text-left bg-slate-800 rounded-xl px-5 py-4 hover:bg-slate-700 transition">

                            Change Password

                        </button>

                        <button className="w-full text-left bg-slate-800 rounded-xl px-5 py-4 hover:bg-slate-700 transition">

                            Enable Two Factor Authentication

                        </button>

                    </div>

                </div>

                <div className="mt-8 border border-red-500/30 rounded-3xl p-8">

                    <h2 className="text-2xl font-bold text-red-400">

                        Danger Zone

                    </h2>

                    <p className="text-gray-400 mt-2">

                        These actions are irreversible.

                    </p>

                    <div className="mt-6 space-y-4">

                        <label className="block text-gray-300 mb-2">

                            Project to Delete

                        </label>

                        <select

                            value={selectedProject}

                            onChange={(e) => setSelectedProject(e.target.value)}

                            className="
    w-full
    rounded-xl
    bg-slate-800
    border
    border-slate-700
    px-5
    py-4
    "

                        >

                            <option value="">

                                Select a Project

                            </option>

                            {myProjects.map(project => (

                                <option

                                    key={project.id}

                                    value={project.id}

                                >

                                    {project.title}

                                </option>

                            ))}

                        </select>

                        <button

                            disabled={!selectedProject}

                            onClick={() => setDeleteOpen(true)}

                            className={`
        w-full
        rounded-xl
        px-6
        py-4
        transition
        ${selectedProject
                                    ? "bg-red-600 hover:bg-red-500"
                                    : "bg-slate-700 cursor-not-allowed"
                                }
    `}

                        >

                            Delete Project

                        </button>

                        <button

                            className="
            w-full
            text-left
            bg-red-900
            hover:bg-red-800
            transition
            rounded-xl
            px-6
            py-4
            "

                        >

                            Delete My Account

                        </button>

                    </div>

                </div>

                <div className="mt-10 flex justify-end">

                    <button

                        onClick={handleSave}

                        className="
        bg-[#2772A0]
        hover:bg-[#2772A0]
        transition
        px-8
        py-4
        rounded-xl
        font-semibold
        "

                    >

                        Save Changes

                    </button>


                </div>

                <DeleteProjectModal

                    open={deleteOpen}

                    onClose={() => setDeleteOpen(false)}

                    onDelete={handleDeleteProject}

                    project={
                        myProjects.find(
                            project => project.id == selectedProject
                        )
                    }

                />

                <Toast message={toast} />
            </div>

        </div>

    );

}

export default Settings;