"use client";

import axios from "axios";
import AdminList from "./list";
import { useState, useEffect } from "react";
import { editDosen } from "@/lib/action";
interface DosenData {
  id: string;
  nama?: string;
  nip?: string;
  fakultas?: string;
  prodi?: string;
  email?: string;
  matakuliah?: string;
}

const AdminCrud = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/getDosen/${filter}`);
      const data = response.data;
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id:string) => {
    try {
      await axios.delete(`/api/deleteDosen/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = async (data: DosenData) => {
    try {
      await editDosen(data);
      fetchData();
    } catch (error) {
      console.error("Error editing data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  const filters = [
    { label: "All", value: "All" },
    { label: "Ilmu Komputer", value: "ilmu komputer" },
    { label: "Ilmu Ekonomi", value: "ilmu ekonomi" },
    { label: "Ilmu Hukum", value: "ilmu hukum" },
  ];

  return (
    <div>
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex justify-center mb-6">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 mx-2 text-sm font-medium rounded-md transition-colors duration-300 ${
                  filter === f.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <AdminList items={items} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
    </div>
  );
};

export default AdminCrud;
