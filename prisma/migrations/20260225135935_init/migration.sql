-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('pending', 'generating', 'done', 'error');

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "status" "BookStatus" NOT NULL,
    "params" JSONB NOT NULL,
    "pdfUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
