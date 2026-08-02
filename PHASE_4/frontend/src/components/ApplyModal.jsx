import { useState } from "react";
import { motion } from "framer-motion";

function ApplyModal({ open, onClose, onSubmit, project }) {

    const [position, setPosition] = useState(
        project.positions?.[0]?.role || ""
    );

    const [message, setMessage] = useState("");

    if (!open) return null;


    function handleSubmit() {

        onSubmit({
            position,
            message
        });

        setMessage("");

    }


    return (

        <div
            className="
            fixed
            inset-0
            bg-black/60
            backdrop-blur-sm
            z-[100]
            flex
            items-center
            justify-center
            "
            onClick={onClose}
        >

            <motion.div

                initial={{
                    opacity: 0,
                    scale: 0.9
                }}

                animate={{
                    opacity: 1,
                    scale: 1
                }}

                className="
                w-full
                max-w-xl
                rounded-3xl
                bg-slate-900/95
                border
                border-white/10
                shadow-2xl
                p-8
                "

                onClick={(e)=>e.stopPropagation()}

            >

                <h2 className="text-3xl font-bold">

                    Apply to {project.title}

                </h2>


                <p className="text-gray-400 mt-2">

                    Tell the creator why you'd be a good fit.

                </p>



                <div className="mt-8">

                    <label className="block mb-2 text-gray-300">

                        Position

                    </label>


                    <select

                        value={position}

                        onChange={(e)=>setPosition(e.target.value)}

                        className="
                        w-full
                        rounded-xl
                        bg-slate-800
                        border
                        border-slate-700
                        px-4
                        py-3
                        "

                    >

                        {(project.positions || []).map((pos,index)=>(

                            <option key={index}>
                                {pos.role}
                            </option>

                        ))}

                    </select>


                </div>



                <div className="mt-6">


                    <label className="block mb-2 text-gray-300">

                        Why do you want to join?

                    </label>


                    <textarea

                        rows={5}

                        value={message}

                        onChange={(e)=>setMessage(e.target.value)}

                        className="
                        w-full
                        rounded-xl
                        bg-slate-800
                        border
                        border-slate-700
                        px-4
                        py-3
                        resize-none
                        "

                        placeholder="Explain your experience and motivation..."

                    />


                </div>



                <div className="flex justify-end gap-4 mt-8">


                    <button

                        onClick={onClose}

                        className="
                        px-5
                        py-3
                        rounded-xl
                        bg-slate-700
                        hover:bg-slate-600
                        "

                    >

                        Cancel

                    </button>



                    <button

                        disabled={!message.trim()}

                        onClick={handleSubmit}

                        className="
                        px-5
                        py-3
                        rounded-xl
                        bg-[#2772A0]
                        hover:bg-[#2772A0]
                        disabled:opacity-40
                        "

                    >

                        Submit Application

                    </button>


                </div>


            </motion.div>


        </div>

    );

}

export default ApplyModal;