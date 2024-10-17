import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    console.log(username, email, password);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: hashedPassword,
        image:"https://files.edgestore.dev/kuv2nfpuzfcwru31/publicFiles/_public/794938e8-65bb-429a-a32d-57576af84a40.png"
      },
    });

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Terjadi kesalahan saat mendaftar" }, { status: 500 });
  }
}
