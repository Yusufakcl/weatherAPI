-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeatherRequestLog" (
    "id" SERIAL NOT NULL,
    "cityId" INTEGER NOT NULL,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientIp" TEXT,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "statusCode" INTEGER,
    "error" TEXT,

    CONSTRAINT "WeatherRequestLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_code_key" ON "City"("code");

-- CreateIndex
CREATE INDEX "WeatherRequestLog_cityId_requestedAt_idx" ON "WeatherRequestLog"("cityId", "requestedAt");

-- AddForeignKey
ALTER TABLE "WeatherRequestLog" ADD CONSTRAINT "WeatherRequestLog_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;
