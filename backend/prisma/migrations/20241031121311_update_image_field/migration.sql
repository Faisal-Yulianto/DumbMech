/*
  Warnings:

  - You are about to drop the column `photo` on the `tb_product` table. All the data in the column will be lost.
  - Added the required column `image` to the `tb_product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_product" DROP COLUMN "photo",
ADD COLUMN     "image" TEXT NOT NULL;
