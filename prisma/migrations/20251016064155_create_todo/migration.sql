-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "task" VARCHAR(100) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
