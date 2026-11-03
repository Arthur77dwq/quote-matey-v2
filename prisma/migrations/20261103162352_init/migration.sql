-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('DRAFT', 'SENT', 'APPROVED', 'ACCEPTED');

-- CreateEnum
CREATE TYPE "JobMemberRole" AS ENUM ('OWNER', 'CUSTOMER', 'TRADIE', 'COLLABORATOR');

-- CreateEnum
CREATE TYPE "MessageAuthor" AS ENUM ('AI', 'USER', 'SYSTEM');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT', 'AUDIO');

-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('DRAFT', 'READY', 'SENT', 'VIEWED', 'APPROVED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "ActivityInitiator" AS ENUM ('AI', 'USER');

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "technicalDetails" TEXT,
    "analysisNote" TEXT,
    "status" "JobStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobMember" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "role" "JobMemberRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "msgId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "uid" TEXT,
    "author" "MessageAuthor" NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("msgId")
);

-- CreateTable
CREATE TABLE "MessageMedia" (
    "id" TEXT NOT NULL,
    "msgId" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "url" TEXT NOT NULL,
    "analysisNote" TEXT,
    "fileName" TEXT,
    "mimeType" TEXT,
    "fileSize" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessageMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "quoteId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "status" "QuoteStatus" NOT NULL DEFAULT 'DRAFT',
    "currentVersionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("quoteId")
);

-- CreateTable
CREATE TABLE "QuoteVersion" (
    "versionId" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "supportedContext" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuoteVersion_pkey" PRIMARY KEY ("versionId")
);

-- CreateTable
CREATE TABLE "QuoteAccess" (
    "id" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuoteAccess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteHealth" (
    "id" TEXT NOT NULL,
    "versionId" TEXT NOT NULL,
    "scopeDefined" BOOLEAN,
    "labourEstimated" BOOLEAN,
    "materialsAdded" BOOLEAN,
    "pricingSet" BOOLEAN,
    "customerMessage" BOOLEAN,
    "lineItemsVerified" BOOLEAN,
    "subtotalVerified" BOOLEAN,
    "discountVerified" BOOLEAN,
    "taxVerified" BOOLEAN,
    "grandTotalVerified" BOOLEAN,
    "pricingConsistent" BOOLEAN,
    "checkedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuoteHealth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteActivity" (
    "activityId" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "versionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "initiator" "ActivityInitiator" NOT NULL,
    "icon" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuoteActivity_pkey" PRIMARY KEY ("activityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Job_chatId_key" ON "Job"("chatId");

-- CreateIndex
CREATE INDEX "Job_uid_status_idx" ON "Job"("uid", "status");

-- CreateIndex
CREATE INDEX "Job_uid_updatedAt_idx" ON "Job"("uid", "updatedAt");

-- CreateIndex
CREATE INDEX "JobMember_uid_idx" ON "JobMember"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "JobMember_jobId_uid_key" ON "JobMember"("jobId", "uid");

-- CreateIndex
CREATE INDEX "Conversation_jobId_createdAt_idx" ON "Conversation"("jobId", "createdAt");

-- CreateIndex
CREATE INDEX "Conversation_uid_idx" ON "Conversation"("uid");

-- CreateIndex
CREATE INDEX "MessageMedia_msgId_idx" ON "MessageMedia"("msgId");

-- CreateIndex
CREATE INDEX "Quote_jobId_idx" ON "Quote"("jobId");

-- CreateIndex
CREATE INDEX "Quote_uid_idx" ON "Quote"("uid");

-- CreateIndex
CREATE INDEX "Quote_status_idx" ON "Quote"("status");

-- CreateIndex
CREATE INDEX "Quote_currentVersionId_idx" ON "Quote"("currentVersionId");

-- CreateIndex
CREATE INDEX "QuoteVersion_quoteId_createdAt_idx" ON "QuoteVersion"("quoteId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "QuoteVersion_quoteId_version_key" ON "QuoteVersion"("quoteId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "QuoteVersion_quoteId_versionNumber_key" ON "QuoteVersion"("quoteId", "versionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "QuoteVersion_quoteId_versionId_key" ON "QuoteVersion"("quoteId", "versionId");

-- CreateIndex
CREATE INDEX "QuoteAccess_uid_idx" ON "QuoteAccess"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "QuoteAccess_quoteId_uid_key" ON "QuoteAccess"("quoteId", "uid");

-- CreateIndex
CREATE UNIQUE INDEX "QuoteHealth_versionId_key" ON "QuoteHealth"("versionId");

-- CreateIndex
CREATE INDEX "QuoteActivity_quoteId_occurredAt_idx" ON "QuoteActivity"("quoteId", "occurredAt");

-- CreateIndex
CREATE INDEX "QuoteActivity_versionId_occurredAt_idx" ON "QuoteActivity"("versionId", "occurredAt");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobMember" ADD CONSTRAINT "JobMember_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageMedia" ADD CONSTRAINT "MessageMedia_msgId_fkey" FOREIGN KEY ("msgId") REFERENCES "Conversation"("msgId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_quoteId_currentVersionId_fkey" FOREIGN KEY ("quoteId", "currentVersionId") REFERENCES "QuoteVersion"("quoteId", "versionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteVersion" ADD CONSTRAINT "QuoteVersion_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("quoteId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteAccess" ADD CONSTRAINT "QuoteAccess_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("quoteId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteHealth" ADD CONSTRAINT "QuoteHealth_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "QuoteVersion"("versionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteActivity" ADD CONSTRAINT "QuoteActivity_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("quoteId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteActivity" ADD CONSTRAINT "QuoteActivity_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "QuoteVersion"("versionId") ON DELETE CASCADE ON UPDATE CASCADE;
