import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import useAuth from "../hooks/useAuth";
import { authAPI } from "../services/authAPI";

export default function Header() {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const { profile } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setLoggingOut(true);
            await authAPI.logout();
            navigate("/login", { replace: true });
        } finally {
            setLoggingOut(false);
            setShowProfileMenu(false);
        }
    };

    return (
        <div id="header-container" className="flex justify-between items-center p-4">
            {/* Search Bar */}
            <div id="search-bar" className="relative w-full max-w-lg">
                <InputField/>
                <FaSearch id="search-icon" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300"/>
            </div>

            {/* Icon & Profile Section */}
            <div id="icons-container" className="flex items-center space-x-4">
                {/* Icons */}
                <div id="notification-icon" className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer">
                    <FaBell />
                    <span id="notification-badge" className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full px-2 py-1 text-xs">50</span>
                </div>
                <div id="chart-icon" className="p-3 bg-blue-100 rounded-2xl cursor-pointer">
                    <FcAreaChart />
                </div>
                <div id="settings-icon" className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer">
                    <SlSettings />
                </div>
             

                {/* Profile Section */}
                <div id="profile-container" className="relative flex items-center space-x-4 border-l pl-4 border-gray-300">
                    <span id="profile-text">
                        Hello, <b>{profile?.name || "User"}</b>
                    </span>
                    <button
                        type="button"
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        aria-label="Buka menu profil"
                    >
                        <img
                            id="profile-avatar"
                            src="/img/foto.jpeg"
                            alt="Profil pengguna"
                            className="w-10 h-10 rounded-full"
                        />
                    </button>
                    {showProfileMenu && (
                        <div className="absolute right-0 top-14 z-50 w-36 rounded-lg bg-white p-2 shadow-lg border border-gray-100">
                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={loggingOut}
                                className="w-full rounded px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                            >
                                {loggingOut ? "Logout..." : "Logout"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
