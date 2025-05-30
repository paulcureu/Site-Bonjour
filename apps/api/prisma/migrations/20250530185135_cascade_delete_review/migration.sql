-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_menuItemId_fkey";

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
