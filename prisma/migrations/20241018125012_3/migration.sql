/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Dosen` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Dosen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dosen" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Dosen_email_key" ON "Dosen"("email");
