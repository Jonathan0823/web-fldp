"use server";

import { prisma } from "./prisma";
import nodemailer from "nodemailer";

export const createDosen = async (data: {
  nama: string;
  nip: string;
  fakultasId: string;
  prodiId: string;
  email: string;
  matkulId: string;
}) => {
  try {
    const dosen = await prisma.dosen.create({
      data: {
        ...data,
      },
    });
    return dosen;
  } catch (error) {
    throw new Error(String(error));
  }
};

interface DosenData {
  id: string;
  nama?: string;
  nip?: string;
  fakultasId?: string;
  prodiId?: string;
  email?: string;
  matkulId?: string;
}

export const editDosen = async (data: DosenData) => {
  try {
    const dosen = await prisma.dosen.update({
      where: {
        id: data.id,
      },
      data: {
        nama: data.nama,
        nip: data.nip,
        fakultasId: data.fakultasId,
        prodiId: data.prodiId,
        email: data.email,
        matkulId: data.matkulId,
      },
    });
    return dosen;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const deleteDosen = async (idUser: string, idDosen: string) => {
  try {
    console.log(idUser, idDosen);
    const valid = await prisma.user.findUnique({
      where: {
        id: idUser,
      },
    });

    if (valid?.role !== "Admin") {
      throw new Error("User is not an admin");
    }

    const dosen = await prisma.dosen.delete({
      where: {
        id: idDosen,
      },
    });
    return dosen;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const createFakultas = async (nama: string) => {
  try {
    const validate = await prisma.fakultas.findFirst({
      where: {
        nama,
      },
    });
    if (validate) {
      return "Fakultas already exists";
    }
    const fakultas = await prisma.fakultas.create({
      data: {
        nama,
      },
    });
    return fakultas;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const createProdi = async (nama: string, fakultasId: string) => {
  try {
    const validate = await prisma.prodi.findFirst({
      where: {
        nama,
      },
    });
    if (validate) {
      return "Prodi already exists";
    }
    const prodi = await prisma.prodi.create({
      data: {
        nama,
        fakultasId,
      },
    });
    return prodi;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const createMatakuliah = async (nama: string, fakultasId: string) => {
  try {
    const validate = await prisma.matakuliah.findFirst({
      where: {
        nama,
      },
    });
    if (validate) {
      return "Matakuliah already exists";
    }
    const matakuliah = await prisma.matakuliah.create({
      data: {
        nama,
        fakultasId,
      },
    });
    return matakuliah;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const review = async (
  pembelajaran: number,
  kehadiran: number,
  ketepatanWaktu: number,
  komen: string,
  dosenId: string,
  userId: string
) => {
  try {
    const reciver = await prisma.dosen.findUnique({
      where: {
        id: dosenId,
      },
    });

    const review = await prisma.nilai.create({
      data: {
        kehadiran,
        ketepatanWaktu,
        pembelajaran,
        dosenId,
        userId,
        komen,
      },
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.SEND,
      },
    });
    const htmlContent = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          border-bottom: 2px solid #eee;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          color: #333;
        }
        .content {
          font-size: 16px;
          line-height: 1.6;
        }
        .review-item {
          margin-bottom: 10px;
        }
        .review-item strong {
          color: #555;
        }
        .footer {
          border-top: 2px solid #eee;
          padding-top: 10px;
          margin-top: 20px;
          font-size: 14px;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Review dan Rating Baru untuk Anda</h1>
        </div>
        <div class="content">
          <p>Anda telah menerima review baru dari mahasiswa.</p>
          <div class="review-item">
            <strong>Pembelajaran:</strong> ${pembelajaran}/5
          </div>
          <div class="review-item">
            <strong>Kehadiran:</strong> ${kehadiran}/5
          </div>
          <div class="review-item">
            <strong>Ketepatan Waktu:</strong> ${ketepatanWaktu}/5
          </div>
          <div class="review-item">
            <strong>Komentar Mahasiswa:</strong>
            <p>${komen}</p>
          </div>
        </div>
        <div class="footer">
          <p>Email ini dikirim secara otomatis oleh sistem penilaian.</p>
        </div>
      </div>
    </body>
  </html>
`;
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: reciver?.email,
      subject: "Review dan Rating Baru",
      html: htmlContent,
    });
    return review;
  } catch (error) {
    throw new Error(String(error));
  }
};

//     const { fromName, fromEmail, subject, message } = mailSchema.parse(req.body);
//     const from = `"${fromName}" <${fromEmail}>`;

//     return res.status(200).json({ message: "Email sent successfully." });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return res.status(500).json({ message: "Failed to send email." });
//   }
// };
