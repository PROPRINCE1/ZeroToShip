const skills = [
    "All",
    "Python",
    "React",
    "Flask",
    "Flutter",
    "Machine Learning",
    "Qt",
    "SQL"
];

function SkillFilter() {

    return (

        <div className="flex flex-wrap gap-3 mt-10">

            {skills.map(skill => (

                <button

                    key={skill}

                    className={`

                        px-5 py-2 rounded-full
                        bg-slate-800
                        hover:bg-[#2772A0]
                        transition

                    `}

                >

                    {skill}

                </button>

            ))}

        </div>

    );

}

export default SkillFilter;