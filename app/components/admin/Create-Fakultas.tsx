import { useState } from "react";
import { useRouter } from "next/router";
import { createFakultas } from "@/lib/action";

const CreateFakultas = () => {
  const [nama, setNama] = useState("");
  const router = useRouter();



const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        await createFakultas(nama);
        router.push("/fakultas");
    } catch (error) {
        console.error("Error creating fakultas:", error);
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nama Fakultas:</label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
      </div>
      <button type="submit">Tambah Fakultas</button>
    </form>
  );
};

export default CreateFakultas;
