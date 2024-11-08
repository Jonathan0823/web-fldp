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

export const sendComments = async (dosenId: string, userId: string, komen: string, type: string) => {
  try{
    const comments = await prisma.comment.create({
      data: {
        dosenId,
        userId,
        comment: komen,
        type: type,
      },
    });
    return comments;  
  } catch (error) {
    throw new Error(String(error));
  }
}

export const review = async (
  pembelajaran: number,
  kehadiran: number,
  ketepatanWaktu: number,
  pengajaran: number,
  penyampaianMateri: number,
  komen: string,
  dosenId: string,
  userId: string
) => {
  try {
    console.log(pembelajaran, kehadiran, ketepatanWaktu, pengajaran, penyampaianMateri, komen, dosenId, userId);
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
        pengajaran,
        penyampaianMateri,
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
    const htmlContent = `<html>
  <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <tr>
    <td style="background-color: #2563eb; padding: 12px 16px; border-radius: 6px;">
      <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
        <tr>
          <td>
            <div style="color: white; font-size: 16px; display: flex; align-items: center;">
              <span style="margin-right: 8px;">📧</span>
              New Feedback Notification
              <span style="margin-left: auto;">🔔</span>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding: 20px 0;">
      <h2 style="margin: 0 0 16px 0; font-size: 20px; color: #111827;">New Student Feedback</h2>
      <p style="margin: 0 0 16px 0; font-size: 16px; color: #374151; line-height: 1.5;">
        You have received new feedback on your teaching performance. Log in to view the details and respond if necessary.
      </p>
      <div style="background-color: #f3f4f6; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
        <p style="margin: 0 0 8px 0; font-size: 16px; color: #374151; font-style: italic;">
          <strong>Media Pembelajaran:</strong> ${pembelajaran}/5
        </p>
        <p style="margin: 0 0 8px 0; font-size: 16px; color: #374151; font-style: italic;">
          <strong>Kehadiran:</strong> ${kehadiran}/5
        </p>
        <p style="margin: 0 0 8px 0; font-size: 16px; color: #374151; font-style: italic;">
          <strong>Ketepatan Waktu:</strong> ${ketepatanWaktu}/5
        </p>
        <p style="margin: 0 0 8px 0; font-size: 16px; color: #374151; font-style: italic;">
          <strong>Metode Pengajaran:</strong> ${pengajaran}/5
        </p>
        <p style="margin: 0 0 8px 0; font-size: 16px; color: #374151; font-style: italic;">
          <strong>Penyampaian Materi:</strong> ${penyampaianMateri}/5
        </p>
        <p style="margin: 0; font-size: 14px; color: #6b7280;">
          - Anonymous Student
        </p>
      </div>
      <a href="https://web-fldp.vercel.app/?show=true&dosenId=${dosenId}" style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-size: 16px;">View Feedback</a>
    </td>
  </tr>
</table>
</html>
`
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
