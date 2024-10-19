import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createProdi } from "@/lib/action";

const CreateProdi = () => {
  const [nama, setNama] = useState("");
  const [fakultasId, setFakultasId] = useState("");
  const [fakultasList, setFakultasList] = useState<{ id: string; nama: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFakultas = async () => {
      try {
        const response = await axios.get("/api/getAlldata/getFakultas");
        setFakultasList(response.data);
      } catch (error) {
        console.error("Error fetching fakultas:", error);
      }
    };
    fetchFakultas();
  }, []);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const result = await createProdi(nama, fakultasId);
        if (typeof result === "string") {
            setError(result);
            return;
        }else{
            setError(null);
            router.push("/prodi"); 
        }
      
    } catch (error) {
        console.error("Error creating prodi:", error);
    }
};

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Tambah Prodi</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Nama Prodi:
          </label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan nama prodi"
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Fakultas:
          </label>
          <select
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
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Tambah Prodi
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default CreateProdi;
