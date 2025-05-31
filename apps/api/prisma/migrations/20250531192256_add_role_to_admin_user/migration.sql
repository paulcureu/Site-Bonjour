-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PUBLIC');

-- AlterTable
ALTER TABLE "AdminUser" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'PUBLIC';
