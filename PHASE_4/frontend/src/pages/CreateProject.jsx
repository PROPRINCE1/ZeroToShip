import { useState, useContext } from "react";
import skills from "../data/skills";
import ProjectCard from "../components/ProjectCard";
import { ProjectContext } from "../context/ProjectContext";
import { useNavigate } from "react-router-dom";

function CreateProject() {

    const [selectedSkills, setSelectedSkills] = useState([]);

    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");

    const [description, setDescription] = useState("");

    const [deadline, setDeadline] = useState("");
    const [teamSize, setTeamSize] = useState("");

    const [positions, setPositions] = useState([]);

    const { addProject } = useContext(ProjectContext);

    const navigate = useNavigate();

    function toggleSkill(skill) {

        if (selectedSkills.includes(skill)) {

            setSelectedSkills(

                selectedSkills.filter(s => s !== skill)

            );

        } else {

            setSelectedSkills(

                [...selectedSkills, skill]

            );

        }

    }

    function addPosition() {

        setPositions([

            ...positions,

            {
                role: "",
                slots: 1,
                level: "Beginner"
            }

        ]);

    }

    function updatePosition(index, field, value) {

        const updated = [...positions];

        if (field === "slots") {
            updated[index][field] = Math.max(1, Number(value));
        } else {
            updated[index][field] = value;
        }
        setPositions(updated);

    }

    function removePosition(index) {

        const updated = positions.filter((_, i) => i !== index);

        setPositions(updated);

    }

    function createProject() {

        if (
            !title.trim() ||
            !shortDescription.trim() ||
            !description.trim() ||
            !deadline ||
            !category ||
            !difficulty
        ) {
            alert("Please fill all required fields.");
            return;
        }

        const size = Number(teamSize);

        if (size < 1 || size > 10) {
            alert("Team size must be between 1 and 10.");
            return;
        }

        const invalidPosition = positions.some(
            position => !position.role.trim()
        );

        if (invalidPosition) {
            alert("Every position must have a role.");
            return;
        }

        const newProject = {

            id: Date.now(),

            title,

            description,

            shortDescription,

            creator: "You",

            status: "Open",

            applicants: 0,

            deadline,

            teamSize,

            skills: selectedSkills,

            category,

            difficulty,

            positions

        };


        addProject(newProject);


        navigate("/");

    }

    const previewProject = {

        id: 0,

        title: title || "Project Title",

        description:
            shortDescription || "Project description...",

        creator: "You",

        status: "Open",

        applicants: 0,

        deadline: deadline || "No Deadline",

        skills: selectedSkills,

        category: category || "Category",

        difficulty: difficulty || "Difficulty",

        teamSize: teamSize,

        positions: positions

    };

    return (

        <div className="min-h-screen">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">

                    Create Project

                </h1>

                <p className="text-gray-400 mt-4">

                    Bring your idea to life and find teammates.

                </p>

                <div className="grid lg:grid-cols-3 gap-10 mt-12">

                    <div className="lg:col-span-2">

                        {/* Form */}

                        <div className="bg-white/5 rounded-3xl border border-white/10 p-8">

                            <h2 className="text-2xl font-bold">

                                Project Information

                            </h2>
                            <div className="mt-8">

                                <label className="block text-gray-300 mb-2">

                                    Project Title

                                </label>

                                <input

                                    type="text"

                                    value={title}

                                    onChange={(e) => setTitle(e.target.value)}

                                    placeholder="AI Study Assistant"

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

                            <div className="mt-6">

                                <label className="block text-gray-300 mb-2">

                                    Short Description

                                </label>

                                <input

                                    type="text"

                                    value={shortDescription}

                                    onChange={(e) => setShortDescription(e.target.value)}

                                    placeholder="One sentence describing your project."

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

                            <div className="mt-6 md:col-span-2 min-w-0">

                                <label className="block text-gray-300 mb-2">

                                    Full Description

                                </label>

                                <textarea
                                    rows={6}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}

                                    className="
w-full
rounded-xl
bg-slate-800
border
border-slate-700
px-5
py-4
resize-y
overflow-x-hidden
break-words
"
                                    placeholder="Describe your project in detail..."
                                />

                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mt-6 min-w-0">

                                <div>

                                    <label className="block text-gray-300 mb-2">

                                        Deadline

                                    </label>

                                    <input

                                        type="date"

                                        value={deadline}

                                        onChange={(e) => setDeadline(e.target.value)}

                                    />

                                </div>

                                <div>

                                    <label className="block text-gray-300 mb-2">

                                        Team Size

                                    </label>

                                    <input

                                        type="number"

                                        value={teamSize}

                                        onChange={(e) => setTeamSize(e.target.value)}

                                        placeholder="5"

                                        min="1"

                                        max="10"
                                    />

                                </div>

                                <div className="mt-8">

                                    <h3 className="text-lg font-semibold">

                                        Required Skills

                                    </h3>

                                    {selectedSkills.length > 0 && (

                                        <button

                                            type="button"

                                            onClick={() => setSelectedSkills([])}

                                            className="

                                                text-sm

                                                text-red-400

                                                hover:text-red-300

                                                transition

                                            "

                                        >

                                            Clear All

                                        </button>
                                    )}

                                    <div className="flex flex-wrap gap-3 mt-5">

                                        {

                                            skills.map(skill => (

                                                <button

                                                    key={skill}

                                                    onClick={() => toggleSkill(skill)}

                                                    type="button"

                                                    className={`

                        px-4
                        py-2

                        rounded-full

                        transition

                        ${selectedSkills.includes(skill)

                                                            ? "bg-[#2772A0] text-white"

                                                            : "bg-slate-800 text-gray-300 hover:bg-slate-700"

                                                        }

                    `}

                                                >

                                                    {skill}

                                                </button>

                                            ))

                                        }

                                    </div>


                                </div>

                                <div className="mt-8">

                                    <label className="block text-gray-300 mb-2">
                                        Category
                                    </label>

                                    <select

                                        value={category}

                                        onChange={(e) => setCategory(e.target.value)}

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
                                            Select Category
                                        </option>

                                        <option>
                                            Artificial Intelligence
                                        </option>

                                        <option>
                                            Web Development
                                        </option>

                                        <option>
                                            Mobile Development
                                        </option>

                                        <option>
                                            Game Development
                                        </option>

                                        <option>
                                            Cyber Security
                                        </option>

                                    </select>

                                </div>

                                <div className="mt-6">

                                    <label className="block text-gray-300 mb-2">
                                        Difficulty
                                    </label>

                                    <select

                                        value={difficulty}

                                        onChange={(e) => setDifficulty(e.target.value)}

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
                                            Select Difficulty
                                        </option>

                                        <option>
                                            Beginner
                                        </option>

                                        <option>
                                            Intermediate
                                        </option>

                                        <option>
                                            Advanced
                                        </option>

                                    </select>

                                </div>

                                <div className="mt-10">

                                    <div className="flex justify-between items-center">

                                        <h3 className="text-lg font-semibold">
                                            Open Positions
                                        </h3>


                                        <button

                                            type="button"

                                            onClick={addPosition}

                                            className="
            text-[#2772A0]
            hover:text-[#CCDDEA]
            "

                                        >

                                            + Add Position

                                        </button>

                                    </div>


                                    <div className="space-y-4 mt-5">


                                        {
                                            positions.map((position, index) => (

                                                <div

                                                    key={index}

                                                    className="
                    grid
                    md:grid-cols-4
                    gap-4
                    bg-slate-800/50
                    p-4
                    rounded-xl
                    "

                                                >

                                                    <input

                                                        min="1"

                                                        value={position.role}

                                                        onChange={(e) =>
                                                            updatePosition(
                                                                index,
                                                                "role",
                                                                e.target.value
                                                            )
                                                        }

                                                        placeholder="Role"

                                                        className="
                        bg-slate-900
                        border
                        border-slate-700
                        rounded-xl
                        px-4
                        py-3
                        "

                                                    />


                                                    <input

                                                        type="number"

                                                        min="1"

                                                        value={position.slots}

                                                        onChange={(e) =>
                                                            updatePosition(
                                                                index,
                                                                "slots",
                                                                e.target.value
                                                            )
                                                        }

                                                        className="
                        bg-slate-900
                        border
                        border-slate-700
                        rounded-xl
                        px-4
                        py-3
                        "

                                                    />


                                                    <select

                                                        value={position.level}

                                                        onChange={(e) =>
                                                            updatePosition(
                                                                index,
                                                                "level",
                                                                e.target.value
                                                            )
                                                        }

                                                        className="
                        bg-slate-900
                        border
                        border-slate-700
                        rounded-xl
                        px-4
                        py-3
                        "

                                                    >

                                                        <option>
                                                            Beginner
                                                        </option>

                                                        <option>
                                                            Intermediate
                                                        </option>

                                                        <option>
                                                            Advanced
                                                        </option>


                                                    </select>

                                                    <button

                                                        type="button"

                                                        onClick={() => removePosition(index)}

                                                        className="
    text-red-400
    hover:text-red-300
    transition
    "

                                                    >

                                                        Remove

                                                    </button>


                                                </div>

                                            ))

                                        }


                                    </div>


                                </div>

                            </div>

                        </div>

                        <button

                            type="button"

                            onClick={createProject}

                            className="
    mt-10
    w-full
    bg-[#2772A0]
    hover:bg-[#2772A0]
    transition
    py-4
    rounded-xl
    font-bold
    text-lg
    "

                        >

                            Create Project

                        </button>
                    </div>

                    <div>

                        {/* Live Preview */}

                        <div className="relative lg:sticky lg:top-10 h-fit mb-24 lg:mb-0">

                            <h2 className="text-2xl font-bold text-white mb-6">
                                Live Preview
                            </h2>

                            <ProjectCard

                                project={previewProject}

                                preview={true}

                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CreateProject;