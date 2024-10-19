import { useState } from "react";
import { createMatakuliah } from "@/lib/action";

interface Fakultas {
  id: string;
  nama: string;
}

interface CreateMatakuliahProps {
  fakultasList: Fakultas[];
}

const CreateMatakuliah = ({ fakultasList }: CreateMatakuliahProps) => {
  const [nama, setNama] = useState("");
  const [fakultasId, setFakultasId] = useState("");
  const [error, setError] = useState<string | null>(null);
const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setError(null);
    e.preventDefault();
    try {
      const result = await createMatakuliah(nama, fakultasId);
      if (typeof result === "string") {
        setError(result);
      } else {
        setNama("");
        setFakultasId("");
        
        setSuccessMessage("Data berhasil ditambahkan");
      }
    } catch (error) {
      console.error("Error creating matakuliah:", error);
    }finally{
        setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Tambah Mata Kuliah</h2>
      {error && <p className="mb-4 p-3 bg-red-100 text-red-600 border border-red-400 rounded">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-600 text-sm font-medium mb-2">Nama Mata Kuliah:</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan nama mata kuliah"
          />
        </div>
        <div>
          <label htmlFor="fakultas" className="block text-gray-600 text-sm font-medium mb-2">Fakultas:</label>
          <select
            id="fakultas"
            value={fakultasId}
            onChange={(e) => setFakultasId(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Fakultas</option>
            {fakultasList.map((fakultas) => (
              <option key={fakultas.id} value={fakultas.id}>
                {fakultas.nama}
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
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      </form>
    </div>
  );
};

export default CreateMatakuliah;
