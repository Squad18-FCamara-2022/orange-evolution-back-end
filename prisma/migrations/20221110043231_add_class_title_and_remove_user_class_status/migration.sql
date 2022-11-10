/*
  Warnings:

  - You are about to drop the column `status` on the `UsersOnClasses` table. All the data in the column will be lost.
  - Added the required column `title` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UsersOnClasses" DROP COLUMN "status";

-- DropEnum
DROP TYPE "Status";
