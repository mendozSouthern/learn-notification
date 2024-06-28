-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('email', 'sms', 'whatsapp');

-- CreateEnum
CREATE TYPE "NotificationProvider" AS ENUM ('twilio');

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "NotificationType" NOT NULL,
    "content" JSONB NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "provider" "NotificationProvider" NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);
