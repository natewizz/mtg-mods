/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdAt` DATETIME NULL;
ALTER TABLE `User` ADD COLUMN `updatedAt` DATETIME NULL;

UPDATE `User` SET `createdAt` = NOW(), `updatedAt` = NOW() WHERE `createdAt` IS NULL OR `updatedAt` IS NULL;

ALTER TABLE `User` MODIFY COLUMN `createdAt` DATETIME NOT NULL;
ALTER TABLE `User` MODIFY COLUMN `updatedAt` DATETIME NOT NULL;