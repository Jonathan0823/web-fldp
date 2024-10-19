import { useState } from "react";
import { useRouter } from "next/navigation";
import { createFakultas } from "@/lib/action";

const CreateFakultas = () => {
  const [nama, setNama] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); 

    try {
      const result = await createFakultas(nama);
      if (typeof result === "string") {
        setError(result);
      } else {
        router.push("/fakultas");
      }
    } catch (error) {
      console.error("Error creating fakultas:", error);
      setError("Terjadi kesalahan saat menambah fakultas. Coba lagi nanti.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
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
      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Tambah Fakultas
      </button>
    </form>
  );
};

export default CreateFakultas;
