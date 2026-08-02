function Background() {

    return (

        <>

            {/* Base Gradient */}

            <div className="fixed inset-0 -z-50 bg-[#07131D]" />

            {/* Grid */}

            <div
                className="
                    fixed
                    inset-0
                    -z-40
                    opacity-[0.06]
                "
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)
                    `,
                    backgroundSize: "50px 50px"
                }}
            />

            {/* [#2772A0] Orb */}

            <div
                className="
        fixed
        -top-44
        -left-44
        w-[34rem]
        h-[34rem]
        rounded-full
        bg-[#2772A0]/25
        blur-[170px]
        -z-30
        animate-pulse
    "
            />

            {/* Violet Orb */}

            <div
                className="
                    fixed
                    bottom-0
                    -right-44
                    w-[34rem]
                    h-[34rem]
                    rounded-full
                    bg-[#CCDDEA]/10
                    blur-[180px]
                    -z-30
                    animate-[pulse_10s_ease-in-out_infinite]
                "
            />  

        </>

    );

}

export default Background;