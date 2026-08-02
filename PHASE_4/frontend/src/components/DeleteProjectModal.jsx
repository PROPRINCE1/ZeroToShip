import { useState } from "react";
function DeleteProjectModal({

    open,
    onClose,
    onDelete,
    project

}) {

    const [projectName, setProjectName] = useState("");
    const [password, setPassword] = useState("");

    if (!open || !project) return null;

    const canDelete =
        projectName === project.title &&
        password.length > 0;

    return (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center">

            <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-red-500/30 p-8">

                <h2 className="text-3xl font-bold text-red-400">

                    Delete Project

                </h2>

                <p className="text-gray-400 mt-4">

                    This action cannot be undone.

                </p>

                <div className="mt-8">

                    <p className="text-gray-300">

                        Type

                        <span className="font-bold text-white">

                            {" "}{project.title}{" "}

                        </span>

                        to confirm.

                    </p>

                    <input

                        value={projectName}

                        onChange={(e) => setProjectName(e.target.value)}

                        className="
                        mt-4
                        w-full
                        rounded-xl
                        bg-slate-800
                        border
                        border-slate-700
                        px-5
                        py-4
                        "

                    />

                </div>

                <div className="mt-6">

                    <label className="block mb-2">

                        Password

                    </label>

                    <input

                        type="password"

                        value={password}

                        onChange={(e) => setPassword(e.target.value)}

                        className="
                        w-full
                        rounded-xl
                        bg-slate-800
                        border
                        border-slate-700
                        px-5
                        py-4
                        "

                    />

                </div>

                <div className="flex justify-end gap-4 mt-10">

                    <button

                        onClick={onClose}

                        className="
                        bg-slate-700
                        px-6
                        py-3
                        rounded-xl
                        "

                    >

                        Cancel

                    </button>

                    <button

                        disabled={!canDelete}

                        onClick={onDelete}

                        className={`
        px-6
        py-3
        rounded-xl
        transition
        ${canDelete
                                ? "bg-red-600 hover:bg-red-500"
                                : "bg-slate-700 cursor-not-allowed"
                            }
    `}

                    >



                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteProjectModal;