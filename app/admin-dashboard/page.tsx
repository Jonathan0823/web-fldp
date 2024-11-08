"use client";

import React, { useState, useEffect } from "react";
import Dashboard from "../components/admin/create-dosen";
import AdminCrud from "../components/admin/admin-crud";
import CreateFakultas from "../components/admin/Create-Fakultas";
import CreateProdi from "../components/admin/Create-prodi";
import CreateMatakuliah from "../components/admin/Create-matkul";
import axios from "axios";
import { useSession } from "next-auth/react";
import Rule from "../components/admin/rule";
interface Fakultas {
  id: string;
  nama: string;
}

interface Prodi {
  id: string;
  nama: string;
}

interface Matakuliah {
  id: string;
  nama: string;
}

const Sidebar: React.FC = () => {
  const { data: session } = useSession();
  const [filter, setFilter] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState("Rule");
  const [fakultasList, setFakultasList] = useState<Fakultas[]>([]);
  const [prodiList, setProdiList] = useState<Prodi[]>([]);
  const [matakuliahList, setMatakuliahList] = useState<Matakuliah[]>([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  const fetchData = async () => {
    try {

      setLoading(true);
      const res = await axios.get(`/api/getUser/${session?.user.id}`);
      setUser(res.data);
      const fakultasResponse = await axios.get(`/api/getAlldata/getFakultas`);
      const prodiResponse = await axios.get(`/api/getAlldata/getProdi`);
      const matakuliahResponse = await axios.get(`/api/getAlldata/getMatkul`);
      const response = await axios.get(`/api/getDosen/${filter}`);

      setItems(response.data);
      setFakultasList(fakultasResponse.data);
      setProdiList(prodiResponse.data);
      setMatakuliahList(matakuliahResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session, filter]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  if (user?.role !== "Admin") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
          <p className="text-lg">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }
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
            onClick={() => handlePageChange("Rule")}
            className={`mb-3 text-gray-200 hover:text-white cursor-pointer ${
              activePage === "Rule" ? "font-bold" : ""
            }`}
          >
            Rule
          </li>
          <li
            onClick={() => handlePageChange("edit dosen")}
            className={`mb-3 text-gray-200 hover:text-white cursor-pointer ${
              activePage === "edit dosen" ? "font-bold" : ""
            }`}
          >
            Data Dosen
          </li>
          <li
            onClick={() => handlePageChange("add dosen")}
            className={`mb-3 text-gray-200 hover:text-white cursor-pointer ${
              activePage === "add dosen" ? "font-bold" : ""
            }`}
          >
            Create Dosen
          </li>
          <li
            onClick={() => handlePageChange("add fakultas")}
            className={`mb-3 text-gray-200 hover:text-white cursor-pointer ${
              activePage === "add fakultas" ? "font-bold" : ""
            }`}
          >
            Add Fakultas
          </li>
          <li
            onClick={() => handlePageChange("add prodi")}
            className={`mb-3 text-gray-200 hover:text-white cursor-pointer ${
              activePage === "add prodi" ? "font-bold" : ""
            }`}
          >
            Add prodi
          </li>
          <li
            onClick={() => handlePageChange("add matkul")}
            className={`mb-3 text-gray-200 hover:text-white cursor-pointer ${
              activePage === "add matkul" ? "font-bold" : ""
            }`}
          >
            Add matkul
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
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      )}
      <div className="flex-1  bg-gray-100">
        <div className="">
          {activePage === "Rule" && <Rule />}
          {activePage === "edit dosen" && (
            <AdminCrud
              items={items}
              setFilter={setFilter}
              fetchData={fetchData}
              filter={filter}
              userId={session?.user.id || ""}
              loading={loading}
            />
          )}
          {activePage === "add dosen" && (
            <Dashboard
              fakultasList={fakultasList}
              prodiList={prodiList}
              matakuliahList={matakuliahList}
            />
          )}
          {activePage === "add fakultas" && <CreateFakultas />}
          {activePage === "add prodi" && (
            <CreateProdi fakultasList={fakultasList} />
          )}
          {activePage === "add matkul" && (
            <CreateMatakuliah fakultasList={fakultasList} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
