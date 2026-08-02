function Toast({ message }) {

    if (!message) return null;

    return (

        <div
            className="
            fixed
            bottom-8
            right-8
            z-[999]
            bg-green-600
            px-6
            py-4
            rounded-xl
            shadow-xl
            animate-pulse
            "
        >

            {message}

        </div>

    );

}

export default Toast;