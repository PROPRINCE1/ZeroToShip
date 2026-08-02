import { useState } from "react";

function Toggle({ defaultOn = true }) {

    const [enabled, setEnabled] = useState(defaultOn);

    return (

        <button

            onClick={() => setEnabled(!enabled)}

            className={`
                w-14
                h-8
                rounded-full
                transition
                relative
                ${enabled ? "bg-[#2772A0]" : "bg-slate-700"}
            `}

        >

            <div

                className={`
                    absolute
                    top-1
                    h-6
                    w-6
                    rounded-full
                    bg-white
                    transition-all
                    ${enabled ? "left-7" : "left-1"}
                `}

            />

        </button>

    );

}

export default Toggle;