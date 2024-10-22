/*
  Warnings:

  - Added the required column `matkulId` to the `Dosen` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Matakuliah" DROP CONSTRAINT "Matakuliah_dosenId_fkey";

-- AlterTable
ALTER TABLE "Dosen" ADD COLUMN     "matkulId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Dosen" ADD CONSTRAINT "Dosen_matkulId_fkey" FOREIGN KEY ("matkulId") REFERENCES "Matakuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
