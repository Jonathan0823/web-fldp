"use client";

import { createDosen } from "@/lib/action";
import axios from "axios";
import React, { useState } from "react";

interface Form {
  nama: string;
  nip: string;
  fakultas: string;
  prodi: string;
  email: string;
  matakuliah: string;
}

const Dashboard: React.FC = () => {
  const [form, setForm] = useState<Form>({
    nama: "",
    nip: "",
    fakultas: "",
    prodi: "",
    email: "",
    matakuliah: "",
  });
  const [dataList, setDataList] = useState<Form[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createDosen(form);
      const result = await axios.get(`/api/getDosen/All`);
      console.log(result.data)
      setDataList(result.data);
      setSuccessMessage("Data berhasil ditambahkan!");
      setForm({
        nama: "",
        nip: "",
        fakultas: "",
        prodi: "",
        email: "",
        matakuliah: "",
      });
    } catch (error) {
      console.error("Error creating dosen:", error);
      setSuccessMessage("Gagal menambahkan data.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(null), 3000); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Dashboard Admin</h1>

        {successMessage && (
          <div
            className={`text-sm text-center p-2 mb-4 rounded ${
              successMessage.includes("berhasil")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(form).map(([key, value]) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                id={key}
                type={key === "email" ? "email" : "text"}
                name={key}
                value={value}
                onChange={handleChange}
                placeholder={`Masukkan ${key}`}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          ))}
          <button
            type="submit"
            
            className={`w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 ${
              loading ? "opacity-75" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Menambah Data..." : "Tambah Data"}
          </button>
        </form>

        <h2 className="text-xl font-semibold mt-8">Daftar Data</h2>
        {dataList.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {dataList.map((item, index) => (
              <li
                key={index}
                className="p-4 bg-gray-50 rounded-lg shadow-sm border"
              >
                <p className="font-medium text-gray-800">{item.nama}</p>
                <p className="text-sm text-gray-600">NIP: {item.nip}</p>
                <p className="text-sm text-gray-600">
                  Fakultas: {item.fakultas}
                </p>
                <p className="text-sm text-gray-600">Prodi: {item.prodi}</p>
                <p className="text-sm text-gray-600">Email: {item.email}</p>
                <p className="text-sm text-gray-600">
                  Mata Kuliah: {item.matakuliah}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 mt-4">Belum ada data.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
