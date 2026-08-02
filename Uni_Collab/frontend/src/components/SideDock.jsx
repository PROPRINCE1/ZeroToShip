import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Home,
    FolderOpen,
    PlusCircle,
    User,
    Settings
} from "lucide-react";

const items = [
    {
        title: "Home",
        icon: Home,
        path: "/",
        angle: -40
    },

    {
        title: "Portal",
        icon: FolderOpen,
        path: "/Portal",
        angle: -20
    },

    {
        title: "Create",
        icon: PlusCircle,
        path: "/create",
        angle: 0
    },

    {
        title: "Profile",
        icon: User,
        path: "/profile",
        angle: 20
    },

    {
        title: "Settings",
        icon: Settings,
        path: "/settings",
        angle: 40
    }
];


function SideDock({ disabled }) {

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (disabled) {
            setExpanded(false);
        }
    }, [disabled]);

    return (

        <div

            className="
        hidden
        lg:block
        fixed
        right-0
        top-1/2
        -translate-y-1/2
        h-100
        w-50
        z-50
            "

            onMouseEnter={() => {
                if (!disabled) setExpanded(true);
            }}

            onMouseLeave={() => {
                if (!disabled) setExpanded(false);
            }}

        >

            {/* Dock */}

            <div

                className="
                    absolute
                    right-0
                    top-1/2
                    -translate-y-1/2
                    pointer-events-none
                "

            >

                {items.map((item) => (

                    <DockButton
                        key={item.title}
                        item={item}
                        expanded={expanded}
                        disabled={disabled}
                    />

                ))}

            </div>

        </div>

    );

}
function EnergyNode({ icon: Icon }) {

    return (

        <motion.div

            whileHover={{

                scale: 1.2

            }}

            className="

            relative

            w-7

            h-7

            rounded-full

            flex

            items-center

            justify-center

            "

        >

            <motion.div

                animate={{

                    scale: [1, 1.35, 1],

                    opacity: [.3, .7, .3]

                }}

                transition={{

                    duration: 2,

                    repeat: Infinity

                }}

                className="

                absolute

                inset-0

                rounded-full

                bg-[#2772A0]

                blur-lg

                "

            />

            <div

                className="

                absolute

                inset-0

                rounded-full

                border

                border-[#CCDDEA]/60

                "

            />

            <Icon

                size={18}

                className="relative text-white"

            />

        </motion.div>

    );

}

function DockButton({ item, expanded, disabled }) {
    const radius = expanded ? 130 : 8;

    const radians = item.angle * Math.PI / 180;

    const x = -Math.cos(radians) * radius * 0.67;
    const y = Math.sin(radians) * radius * 1.5;

    return (

        <motion.div

            className="absolute right-0 pointer-events-auto"

            style={{
                zIndex: 100 - Math.abs(item.angle)
            }}

            animate={{
                x,
                y,
                rotate: expanded ? item.angle * -0.18 : 0
            }}

            transition={{
                type: "spring",
                stiffness: 260,
                damping: 22
            }}

        >

            <Link

                to={disabled ? "#" : item.path}

                className={`block ${disabled ? "pointer-events-none opacity-50" : "pointer-events-auto"}`}

            >

                <motion.div

                    className="relative flex justify-end items-center h-8"

                    animate={{
                        width: expanded ? 220 : 26
                    }}

                    transition={{
                        duration: .35
                    }}

                >

                    {/* Beam */}

                    <motion.div

                        className="absolute right-3 h-[2px] rounded-full"

                        animate={{

                            width: expanded ? 150 : 0,

                            opacity: expanded ? 1 : 0

                        }}

                        transition={{

                            duration: .35

                        }}

                        style={{

                            background:
                                "linear-gradient(to left,#22d3ee,#22d3ee55,transparent)"

                        }}

                    />

                    {/* Label */}

                    <motion.span

                        animate={{

                            opacity: expanded ? 1 : 0,

                            x: expanded ? 0 : 15

                        }}

                        transition={{

                            duration: .25

                        }}

                        className="absolute right-12 whitespace-nowrap text-[#2772A0]-100"

                    >

                        {item.title}

                    </motion.span>

                    {/* Reactor */}

                    <EnergyNode icon={item.icon} />

                </motion.div>

            </Link>

        </motion.div>

    );

}

export default SideDock;