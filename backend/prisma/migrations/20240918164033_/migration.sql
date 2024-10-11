/*
  Warnings:

  - Added the required column `expiry_quantity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `expired_date` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "expiry_quantity" INT4 NOT NULL;
ALTER TABLE "Product" DROP COLUMN "expired_date";
ALTER TABLE "Product" ADD COLUMN     "expired_date" TIMESTAMP(3) NOT NULL;
