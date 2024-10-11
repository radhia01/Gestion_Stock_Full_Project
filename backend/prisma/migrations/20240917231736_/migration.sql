/*
  Warnings:

  - You are about to drop the column `id_product` on the `Brand` table. All the data in the column will be lost.
  - Added the required column `id_brand` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Brand" DROP CONSTRAINT "Brand_id_product_fkey";

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "id_product";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "id_brand" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_id_brand_fkey" FOREIGN KEY ("id_brand") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
