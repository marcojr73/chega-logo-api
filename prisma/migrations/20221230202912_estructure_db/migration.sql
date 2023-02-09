-- CreateTable
CREATE TABLE "business" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "nameProduct" TEXT NOT NULL,
    "description" TEXT,
    "picture" TEXT NOT NULL DEFAULT 'https://w7.pngwing.com/pngs/809/244/png-transparent-computer-icons-new-items-text-rectangle-share-icon-thumbnail.png',
    "provider" TEXT NOT NULL,
    "brand" TEXT,
    "code" INTEGER,
    "codeBar" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "unitMeasurement" TEXT NOT NULL,
    "costPrice" INTEGER NOT NULL,
    "salePrice" INTEGER NOT NULL,
    "validate" INTEGER,
    "icms" INTEGER NOT NULL,
    "businessId" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "allPurchases" INTEGER NOT NULL,
    "debit" INTEGER NOT NULL,
    "businessId" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "costPrice" INTEGER NOT NULL,
    "paymentTime" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "businessId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_email_key" ON "business"("email");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
