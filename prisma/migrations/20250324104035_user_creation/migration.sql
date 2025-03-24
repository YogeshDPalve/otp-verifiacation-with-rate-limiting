-- CreateTable
CREATE TABLE "User" (
    "MobileNo" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "User_MobileNo_key" ON "User"("MobileNo");
