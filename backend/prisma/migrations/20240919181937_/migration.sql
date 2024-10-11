/*
  Warnings:

  - Added the required column `image_url` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image_url" STRING NOT NULL;
ALTER TABLE "User" ADD COLUMN     "phone" STRING NOT NULL;
