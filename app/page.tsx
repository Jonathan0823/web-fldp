import { getServerSession } from "next-auth";
import LogOut from "./components/LogOut";
import { FiHome } from "react-icons/fi";
import { RiGroupLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";

export default async function Home() {
  const session = await getServerSession();
  console.log(session);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-[#eff1f3]">
      <div className="bg-[#f3f4f6] p-8 rounded-lg md:max-w-md max-w-sm w-full shadow-md min-h-dvh">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl w-3/5">
            Selamat datang, {session?.user?.name}
          </h2>
          <LogOut />
        </div>
        <div className="flex justify-between text-gray-500 mt-8">
          <button className="flex items-center"><FiHome className="scale-150"/> <p className="ml-2">Beranda</p></button>
          <button className="flex items-center"><RiGroupLine className="scale-150"/> <p className="ml-2">Profil Dosen</p></button>
          <button className="flex items-center"><FiUser className="scale-150"/> <p className="ml-2">Profil Saya</p></button>
        </div>
      </div>
    </div>
  );
}
