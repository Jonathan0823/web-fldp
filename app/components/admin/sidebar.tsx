import React, { useState } from 'react';

interface SidebarProps {
    children: React.ReactNode; 
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-gray-800 w-64 p-4`}>
                <h2 className="text-white text-2xl font-semibold mb-4">Dashboard Menu</h2>
                <ul>
                    <li className="mb-3 text-gray-200 hover:text-white cursor-pointer">Home</li>
                    <li className="mb-3 text-gray-200 hover:text-white cursor-pointer">Profile</li>
                    <li className="mb-3 text-gray-200 hover:text-white cursor-pointer">Settings</li>
                    <li className="mb-3 text-gray-200 hover:text-white cursor-pointer">Log Out</li>
                </ul>
            </div>


            <div className={`flex-1 p-6 bg-gray-100 ${isOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600 transition duration-200 mb-4"
                    onClick={toggleSidebar}
                >
                    {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
                </button>

                <div className="mt-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
