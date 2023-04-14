-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Integrations" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "integrationName" TEXT NOT NULL,
    "sourceName" TEXT NOT NULL,
    "destinationName" TEXT NOT NULL,
    "schedule" BOOLEAN NOT NULL,
    "fieldMapping" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "syncWay" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modificationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Integrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Configurations" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "integrationId" INTEGER NOT NULL,
    "systemName" TEXT NOT NULL,
    "url" TEXT,
    "accountId" TEXT,
    "consumerKey" TEXT,
    "consumerSecretKey" TEXT,
    "accessToken" TEXT,
    "accessSecretToken" TEXT,
    "authenticationType" TEXT,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modificationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MappedRecords" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "integrationId" INTEGER NOT NULL,
    "source" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "recordTypeTitle" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modificationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MappedRecords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fields" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "mappedRecordId" INTEGER NOT NULL,
    "sourceField" TEXT NOT NULL,
    "destinationField" TEXT NOT NULL,
    "sourceFieldValue" TEXT NOT NULL,
    "destinationFieldValue" TEXT NOT NULL,

    CONSTRAINT "Fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "integrationId" INTEGER NOT NULL,
    "eventType" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "noEndDate" BOOLEAN NOT NULL,
    "repeatEveryDay" BOOLEAN NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modificationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "integrationId" INTEGER NOT NULL,
    "mappedRecordId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "logMessage" TEXT NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationSettings" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "notificationLabel" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "NotificationSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credentials" (
    "id" SERIAL NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "Credentials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_password_key" ON "Users"("email", "password");

-- AddForeignKey
ALTER TABLE "Integrations" ADD CONSTRAINT "Integrations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Configurations" ADD CONSTRAINT "Configurations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Configurations" ADD CONSTRAINT "Configurations_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "Integrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappedRecords" ADD CONSTRAINT "MappedRecords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappedRecords" ADD CONSTRAINT "MappedRecords_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "Integrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fields" ADD CONSTRAINT "Fields_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fields" ADD CONSTRAINT "Fields_mappedRecordId_fkey" FOREIGN KEY ("mappedRecordId") REFERENCES "MappedRecords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "Integrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "Integrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_mappedRecordId_fkey" FOREIGN KEY ("mappedRecordId") REFERENCES "MappedRecords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationSettings" ADD CONSTRAINT "NotificationSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
