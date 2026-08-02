import { Link } from "react-router-dom";
import {
    Home,
    FolderOpen,
    PlusCircle,
    User,
    Settings
} from "lucide-react";

export default function MobileNav() {
    return (
        <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-slate-900 border-t border-slate-700 z-50">

            <div className="flex justify-around items-center py-3">

                <Link to="/" className="flex flex-col items-center text-gray-300 hover:text-[#2772A0]">
                    <Home size={22}/>
                    <span className="text-xs mt-1">Home</span>
                </Link>

                <Link to="/Portal" className="flex flex-col items-center text-gray-300 hover:text-[#2772A0]">
                    <FolderOpen size={22}/>
                    <span className="text-xs mt-1">Portal</span>
                </Link>

                <Link to="/create" className="flex flex-col items-center text-gray-300 hover:text-[#2772A0]">
                    <PlusCircle size={22}/>
                    <span className="text-xs mt-1">Create</span>
                </Link>

                <Link to="/profile" className="flex flex-col items-center text-gray-300 hover:text-[#2772A0]">
                    <User size={22}/>
                    <span className="text-xs mt-1">Profile</span>
                </Link>

                <Link to="/settings" className="flex flex-col items-center text-gray-300 hover:text-[#2772A0]">
                    <Settings size={22}/>
                    <span className="text-xs mt-1">Settings</span>
                </Link>

            </div>

        </div>
    );
}