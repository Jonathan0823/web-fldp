"use client";

import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import AdminList from "./list";
import { deleteDosen, editDosen } from "@/lib/action";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();


  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/getDosen/${filter}`);
      const data = response.data;
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (idAdmin: string) => {
    try {
      if (session?.user?.id) {
        await deleteDosen(session.user?.id, idAdmin);
        fetchData();
      } else {
        console.error("User ID is not available");
      }
      setIsOpen(false);
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

  const openDeleteModal = (id: string) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const closeDeleteModal = () => {
    setIsOpen(false);
    setSelectedId(null);
  };

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
        <AdminList
          items={items}
          onDelete={openDeleteModal}
          onEdit={handleEdit}
        />
      </div>


      <Dialog open={isOpen} onClose={closeDeleteModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white p-6">
            <Dialog.Title className="text-lg font-bold">
              Konfirmasi Hapus
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-gray-700">
              Apakah Anda yakin ingin menghapus data ini?
            </Dialog.Description>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
              >
                Tidak
              </button>
              <button
                onClick={() => handleDelete(selectedId!)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Ya
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminCrud;
