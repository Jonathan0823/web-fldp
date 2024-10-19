"use client";

import { createDosen } from "@/lib/action";
import axios from "axios";
import React, { useState } from "react";


interface Form {
  nama: string;
  nip: string;
  fakultasId: string; 
  prodiId: string; 
  email: string;
  matkulId: string; 
}

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

interface Dosen {
  nama: string;
  nip: string;
  fakultas: { nama: string };
  prodi: { nama: string };
  email: string;
  matkul: { nama: string };
}


interface DashboardProps {
  fakultasList: Fakultas[];
  prodiList: Prodi[];
  matakuliahList: Matakuliah[];
}

const Dashboard: React.FC<DashboardProps> = ({ fakultasList, prodiList, matakuliahList }) => {
  const [form, setForm] = useState<Form>({
    nama: "",
    nip: "",
    fakultasId: "",
    prodiId: "",
    email: "",
    matkulId: "", 
  });
  const [dataList, setDataList] = useState<Dosen[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleMatakuliahChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      matkulId: value, 
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createDosen(form);
      const result = await axios.get(`/api/getDosen/All`);
      setDataList(result.data);
      setSuccessMessage("Data berhasil ditambahkan!");
      setForm({
        nama: "",
        nip: "",
        fakultasId: "",
        prodiId: "",
        email: "",
        matkulId: "",
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
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <input
              id="nama"
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Masukkan nama"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="nip" className="block text-sm font-medium text-gray-700 mb-1">
              NIP
            </label>
            <input
              id="nip"
              type="text"
              name="nip"
              value={form.nip}
              onChange={handleChange}
              placeholder="Masukkan NIP"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="fakultas" className="block text-sm font-medium text-gray-700 mb-1">
              Fakultas
            </label>
            <select
              id="fakultas"
              name="fakultasId"
              value={form.fakultasId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Pilih Fakultas</option>
              {fakultasList.map((fakultas) => (
                <option key={fakultas.id} value={fakultas.id}>
                  {fakultas.nama}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="prodi" className="block text-sm font-medium text-gray-700 mb-1">
              Program Studi
            </label>
            <select
              id="prodi"
              name="prodiId"
              value={form.prodiId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Pilih Program Studi</option>
              {prodiList.map((prodi) => (
                <option key={prodi.id} value={prodi.id}>
                  {prodi.nama}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Masukkan email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="matakuliah" className="block text-sm font-medium text-gray-700 mb-1">
              Mata Kuliah
            </label>
            <select
              id="matakuliah"
              name="matkulId"
              value={form.matkulId} 
              onChange={handleMatakuliahChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Pilih Mata Kuliah</option>
              {matakuliahList.map((matakuliah) => (
                <option key={matakuliah.id} value={matakuliah.id}>
                  {matakuliah.nama}
                </option>
              ))}
            </select>
          </div>

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
                <p className="text-sm text-gray-600">Fakultas: {item.fakultas?.nama}</p>
                <p className="text-sm text-gray-600">Prodi: {item.prodi?.nama}</p>
                <p className="text-sm text-gray-600">Email: {item.email}</p>
                <p className="text-sm text-gray-600">Mata Kuliah: {item.matkul.nama}</p> {/* Ubah matakuliah */}
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
