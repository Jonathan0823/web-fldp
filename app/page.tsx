import { getServerSession } from "next-auth";
import LogOut from "./components/LogOut";


export default async function Home() {
  const session = await getServerSession();
  console.log(session);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-[#eff1f3]">
    <div className="bg-[#f3f4f6] p-8 rounded-lg md:max-w-md max-w-sm w-full shadow-md">
      <div className="flex justify-between">
      <h2 className="font-bold text-xl w-3/5">Selamat datang, {session?.user?.name}</h2>
      <LogOut />
      </div>
    </div>
    </div>
  );
}
