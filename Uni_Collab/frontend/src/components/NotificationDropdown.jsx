import notifications from "../data/notifications";

function NotificationDropdown() {

    return (

<div
    className="
    fixed
    top-24
    left-4
    right-4

    sm:absolute
    sm:top-16
    sm:left-auto
    sm:right-0

    sm:w-96

    rounded-3xl
    bg-slate-900/95
    backdrop-blur-xl
    border
    border-white/10
    shadow-2xl
    overflow-hidden
    z-[9999]
    "
        >

            <div
                className="
                p-6
                border-b
                border-white/10
                flex
                justify-between
                items-center
                "
            >

                <h2 className="text-2xl font-bold">

                    Notifications

                </h2>


                <span className="
                    text-sm
                    text-[#2772A0]
                ">
                    {notifications.filter(n => n.unread).length} new
                </span>


            </div>



            <div className="max-h-[420px] overflow-y-auto">


                {notifications.length > 0 ? (

                    notifications.map(notification => (

                        <button

                            key={notification.id}

                            className="
                            w-full
                            flex
                            gap-4
                            items-start
                            p-5
                            text-left
                            border-b
                            border-white/5
                            hover:bg-white/5
                            transition
                            "

                        >


                            <div
                                className="
                                w-10
                                h-10
                                rounded-full
                                bg-[#2772A0]/10
                                flex
                                items-center
                                justify-center
                                text-xl
                                "
                            >

                                {notification.icon}

                            </div>



                            <div className="flex-1">


                                <p className="font-medium">

                                    {notification.title}

                                </p>


                                <p className="text-sm text-gray-400 mt-1">

                                    {notification.time}

                                </p>


                            </div>



                            {notification.unread && (

                                <div
                                    className="
                                    w-3
                                    h-3
                                    rounded-full
                                    bg-[#2772A0]
                                    mt-2
                                    "
                                />

                            )}


                        </button>

                    ))

                ) : (

                    <p className="p-6 text-gray-400">

                        No notifications yet.

                    </p>

                )}


            </div>


        </div>

    );

}

export default NotificationDropdown;