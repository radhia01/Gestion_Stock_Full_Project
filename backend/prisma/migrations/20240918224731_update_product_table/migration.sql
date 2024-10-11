/*
  Warnings:

  - Changed the type of `created_on` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "created_on";
ALTER TABLE "Product" ADD COLUMN     "created_on" TIMESTAMP(3) NOT NULL;
