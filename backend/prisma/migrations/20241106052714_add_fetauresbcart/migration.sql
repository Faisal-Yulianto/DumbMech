-- CreateTable
CREATE TABLE "tb_cart" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_cart_item" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_cart_item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_cart" ADD CONSTRAINT "tb_cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_cart_item" ADD CONSTRAINT "tb_cart_item_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "tb_cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_cart_item" ADD CONSTRAINT "tb_cart_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "tb_product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
