/*
  Warnings:

  - You are about to drop the column `name` on the `products` table. All the data in the column will be lost.
  - You are about to alter the column `review` on the `products` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `productName` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `newarrival` DROP FOREIGN KEY `Newarrival_productId_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `name`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `newarrivalId` INTEGER NULL,
    ADD COLUMN `productName` VARCHAR(191) NOT NULL,
    MODIFY `review` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `isEmailVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `resetPasswordCode` VARCHAR(191) NULL,
    ADD COLUMN `resetPasswordCodeExpiresAt` DATETIME(3) NULL,
    ADD COLUMN `verificationCode` VARCHAR(191) NULL,
    ADD COLUMN `verificationCodeExpiresAt` DATETIME(3) NULL,
    MODIFY `phoneNumber` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_newarrivalId_fkey` FOREIGN KEY (`newarrivalId`) REFERENCES `Newarrival`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
