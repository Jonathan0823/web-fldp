import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import LogOut from "./components/LogOut";
import Link from "next/link";



export const metadata: Metadata = {
  title: "PENILAIAN DAN UMPAN BALIK ANTARA DOSEN DAN MAHASISWA",
  description: "Website penilaian dan umpan balik antara dosen dan mahasiswa dengan realtime",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
      >
        <nav>
          {session ? (<LogOut/>) : (<Link href="/signin">Sign In</Link>)}
        </nav>
        {children}
      </body>
    </html>
  );
}
