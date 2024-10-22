/*
  Warnings:

  - You are about to drop the column `fakultas` on the `Dosen` table. All the data in the column will be lost.
  - You are about to drop the column `mataKuliah` on the `Dosen` table. All the data in the column will be lost.
  - Added the required column `fakultasId` to the `Dosen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matakuliah` to the `Dosen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dosen" DROP COLUMN "fakultas",
DROP COLUMN "mataKuliah",
ADD COLUMN     "fakultasId" TEXT NOT NULL,
ADD COLUMN     "matakuliah" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Fakultas" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fakultas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prodi" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fakultasId" TEXT NOT NULL,

    CONSTRAINT "Prodi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matakuliah" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fakultasId" TEXT NOT NULL,

    CONSTRAINT "Matakuliah_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dosen" ADD CONSTRAINT "Dosen_fakultasId_fkey" FOREIGN KEY ("fakultasId") REFERENCES "Fakultas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prodi" ADD CONSTRAINT "Prodi_fakultasId_fkey" FOREIGN KEY ("fakultasId") REFERENCES "Fakultas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matakuliah" ADD CONSTRAINT "Matakuliah_fakultasId_fkey" FOREIGN KEY ("fakultasId") REFERENCES "Fakultas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
