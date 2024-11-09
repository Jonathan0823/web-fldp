import { getServerSession } from "next-auth";
import LogOut from "./components/LogOut";
import HomeContent from "./components/HomeContent";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-[#e7eaed]">
      <div className="bg-[#eff1f3] p-8 rounded-lg md:max-w-md max-w-sm w-full shadow-md min-h-dvh">
        <div className="flex justify-between">
          <h2 className="font-bold text-2xl w-3/5">
            Selamat datang, {session?.user?.name}
          </h2>
          {session?.user?.role === "Admin" && (
            <a
              href="/admin-dashboard"
              className="bg-black text-white p-2 h-10 rounded-lg"
            >
              Admin
            </a>
          )}
          <div>
            <LogOut />
          </div>
        </div>
        <HomeContent session={session?.user?.id || ""} role={session?.user?.role || ""} />
      </div>
    </div>
  );
}
