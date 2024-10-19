import { useState } from "react";
import { createFakultas } from "@/lib/action";

const CreateFakultas = () => {
  const [nama, setNama] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await createFakultas(nama);
      if (typeof result === "string") {
        setError(result);
      } else {
        setNama("");
        setSuccessMessage("Data berhasil ditambahkan");
      }
    } catch (error) {
      console.error("Error creating fakultas:", error);
      setError("Terjadi kesalahan saat menambah fakultas. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 mt-10 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        Tambah Fakultas
      </h2>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-medium mb-2">
          Nama Fakultas:
        </label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Masukkan nama fakultas"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}

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
      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
    </form>
  );
};

export default CreateFakultas;
