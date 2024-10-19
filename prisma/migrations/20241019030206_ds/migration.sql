/*
  Warnings:

  - You are about to drop the column `matakuliah` on the `Dosen` table. All the data in the column will be lost.
  - You are about to drop the column `prodi` on the `Dosen` table. All the data in the column will be lost.
  - Added the required column `prodiId` to the `Dosen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dosen" DROP COLUMN "matakuliah",
DROP COLUMN "prodi",
ADD COLUMN     "prodiId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Matakuliah" ADD COLUMN     "dosenId" TEXT;

-- AddForeignKey
ALTER TABLE "Dosen" ADD CONSTRAINT "Dosen_prodiId_fkey" FOREIGN KEY ("prodiId") REFERENCES "Prodi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matakuliah" ADD CONSTRAINT "Matakuliah_dosenId_fkey" FOREIGN KEY ("dosenId") REFERENCES "Dosen"("id") ON DELETE SET NULL ON UPDATE CASCADE;
