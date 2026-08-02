import {
    Bell,
    FolderOpen,
    Trophy,
    Zap
} from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import { useState, useEffect, useRef } from "react";

function TopStatus({ showNotifications, setShowNotifications }) {

    const notificationRef = useRef(null);

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {

                setShowNotifications(false);

            }

        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };

    }, [setShowNotifications]);

    return (

        <div className="px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6 lg:pt-8">

            <div

                className="

                bg-white/5

                backdrop-blur-2xl

                border border-white/10

                rounded-3xl

                p-8

                shadow-[0_0_60px_rgba(79,209,255,.08)]

            "

            >

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 overflow-visible">

                    <div>

                        <h1 className="text-3xl sm:text-4xl font-bold">
                            Good Evening 👋
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Welcome back to UniCollab
                        </p>

                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-auto">

                        <div
                            ref={notificationRef}
                            className="relative z-[100] relative z-[100] self-end"
                        >

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowNotifications(prev => !prev);
                                }}
                                className="
                relative
                w-12
                h-12
                rounded-full
                bg-white/5
                border
                border-white/10
                hover:bg-white/10
                transition
                flex
                items-center
                justify-center
            "
                            >
                                <Bell size={22} />

                                <span
                                    className="
                    absolute
                    -top-1
                    -right-1
                    w-5
                    h-5
                    rounded-full
                    bg-red-500
                    text-xs
                    flex
                    items-center
                    justify-center
                    font-semibold
                "
                                >
                                    2
                                </span>
                            </button>

                            {showNotifications && (
                                <NotificationDropdown />
                            )}

                        </div>


                        <div
                            className="
            w-16
            h-16
            rounded-full
            bg-gradient-to-br
            from-[#2772A0]
            to-[#2772A0]
            flex
            items-center
            justify-center
            text-2xl
            font-bold
        "
                        >
                            A
                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

                    <Stat
                        icon={<Zap size={22} />}
                        title="XP"
                        value="1480"
                    />

                    <Stat
                        icon={<Trophy size={22} />}
                        title="Level"
                        value="4"
                    />

                    <Stat
                        icon={<FolderOpen size={22} />}
                        title="Projects"
                        value="3"
                    />

                    <Stat
                        icon={<Bell size={22} />}
                        title="Applications"
                        value="7"
                    />

                </div>

            </div>

        </div>

    );

}

function Stat({ icon, title, value }) {

    return (

        <div

            className="
                bg-black/20
                rounded-2xl
                border
                border-white/5
                p-4 sm:p-5
            "

        >

            <div className="text-[#CCDDEA]">

                {icon}

            </div>

            <p className="text-gray-400 mt-3">

                {title}

            </p>

            <h2 className="text-2xl sm:text-3xl font-bold mt-1">

                {value}

            </h2>

        </div>

    );

}

export default TopStatus;