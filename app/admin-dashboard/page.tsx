"use client";
import React, { useState } from "react";
import Dashboard from "../components/admin/create-dosen";
import AdminCrud from "../components/admin/admin-crud";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-gray-800 w-64 p-4`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold">Dashboard</h2>

          <button
            className="text-white bg-red-500 px-2 py-1 rounded-md focus:outline-none hover:bg-red-600 transition duration-200"
            onClick={toggleSidebar}
          >
            Close
          </button>
        </div>
        <ul>
          <li
            onClick={() => handlePageChange("home")}
            className={`mb-3 text-gray-200 hover:text-white cursor-pointer ${
              activePage === "home" ? "font-bold" : ""
            }`}
          >
            Crud
          </li>
          <li
            onClick={() => handlePageChange("profile")}
            className={`mb-3 text-gray-200 hover:text-white cursor-pointer ${
              activePage === "profile" ? "font-bold" : ""
            }`}
          >
            Create Dosen
          </li>
        </ul>
      </div>

      {!isOpen && (
        <button
          title="Open Sidebar"
          className="fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600 transition duration-200"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      )}

      <div className="flex-1 p-6 bg-gray-100">
        <div className="mt-6">
          {activePage === "home" && <AdminCrud />}
          {activePage === "profile" && <Dashboard />}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
