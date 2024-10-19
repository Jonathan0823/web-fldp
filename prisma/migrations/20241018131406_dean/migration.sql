/*
  Warnings:

  - Added the required column `prodi` to the `Dosen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dosen" ADD COLUMN     "prodi" TEXT NOT NULL;
