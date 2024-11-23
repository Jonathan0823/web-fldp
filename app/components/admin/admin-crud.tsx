"use client";

import { useState, useEffect } from "react";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

import AdminList from "./list";
import { deleteDosen, editDosen } from "@/lib/action";

interface DosenData {
  id: string;
  nama: string;
  nip: string;
  fakultas: string;
  prodi: string;
  email: string;
  matakuliah: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminCrudProps {
  items: DosenData[];
  setFilter: (filter: string) => void;
  fetchData: () => void;
  filter: string;
  userId: string;
  loading: boolean;
  fakultasList: {
    id: string;
    nama: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

const AdminCrud: React.FC<AdminCrudProps> = ({
  items,
  setFilter,
  fetchData,
  filter,
  userId,
  loading,
  fakultasList,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      if (userId) {
        await deleteDosen(userId, selectedId!);
        fetchData();
      } else {
        console.error("User ID is not available");
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Error deleting data:", error);
      setError("Failed to delete data. Please try again.");
    }
  };

  const handleEdit = async (data: DosenData) => {
    try {
      await editDosen(data);
      fetchData();
    } catch (error) {
      console.error("Error editing data:", error);
      setError("Failed to edit data. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  const openDeleteModal = (id: string) => {
    console.log("open delete modal", id);
    setSelectedId(id);
    setIsOpen(true);
  };

  const closeDeleteModal = () => {
    setIsOpen(false);
    setSelectedId(null);
  };

  const filters = [
    { label: "All", value: "All" },
    ...fakultasList.map((f) => ({ label: f.nama, value: f.nama })),
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      {error && (
        <p className="mb-4 p-3 bg-red-100 text-red-600 border border-red-400 rounded">
          {error}
        </p>
      )}
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
      <AdminList
        items={items}
        onDelete={openDeleteModal}
        onEdit={handleEdit}
        loading={loading}
      />

      <DeleteConfirmationDialog
        isOpen={isOpen}
        closeModal={closeDeleteModal}
        handleDelete={handleDelete}
        selectedId={selectedId}
      />
    </div>
  );
};

export default AdminCrud;
