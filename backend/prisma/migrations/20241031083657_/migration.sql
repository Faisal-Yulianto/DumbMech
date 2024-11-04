-- CreateTable
CREATE TABLE "tb_product" (
    "id" SERIAL NOT NULL,
    "photo" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productDesc" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "qty" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "tb_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_category" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "tb_category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_product" ADD CONSTRAINT "tb_product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "tb_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_product" ADD CONSTRAINT "tb_product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
