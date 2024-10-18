import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "PENILAIAN DAN UMPAN BALIK ANTARA DOSEN DAN MAHASISWA",
  description: "Website penilaian dan umpan balik antara dosen dan mahasiswa dengan realtime",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
