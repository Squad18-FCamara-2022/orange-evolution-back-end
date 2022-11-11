-- DropForeignKey
ALTER TABLE "UsersOnClasses" DROP CONSTRAINT "UsersOnClasses_classId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnClasses" DROP CONSTRAINT "UsersOnClasses_userId_fkey";

-- AddForeignKey
ALTER TABLE "UsersOnClasses" ADD CONSTRAINT "UsersOnClasses_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnClasses" ADD CONSTRAINT "UsersOnClasses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
