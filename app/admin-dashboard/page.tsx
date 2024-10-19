"use client";
import React, { useState } from 'react';
import Dashboard from '../components/admin/create-dosen';
import AdminCrud from '../components/admin/admin-crud';



const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activePage, setActivePage] = useState('home'); 

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handlePageChange = (page: string) => {
        setActivePage(page);
    };

    return (
        <div className="flex h-screen">
            <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-gray-800 w-64 p-4`}>
                <h2 className="text-white text-2xl font-semibold mb-4">Dashboard Menu</h2>
                <ul>
                    <li 
                        onClick={() => handlePageChange('home')} 
                        className={`mb-3 text-gray-200 hover:text-white cursor-pointer ${activePage === 'home' ? 'font-bold' : ''}`}
                    >
                        Crud
                    </li>
                    <li 
                        onClick={() => handlePageChange('profile')} 
                        className={`mb-3 text-gray-200 hover:text-white cursor-pointer ${activePage === 'profile' ? 'font-bold' : ''}`}
                    >
                        Create Dosen
                    </li>
                </ul>
            </div>

            {/* Main Content Area */}
            <div className={`flex-1 p-6 bg-gray-100 ${isOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
                {/* Toggle Button */}
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600 transition duration-200 mb-4"
                    onClick={toggleSidebar}
                >
                    {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
                </button>

                <div className="mt-6">
                    {activePage === 'home' && <AdminCrud/>}
                    {activePage === 'profile' && < Dashboard/>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;