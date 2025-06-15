-- DropForeignKey
ALTER TABLE "tb_product" DROP CONSTRAINT "tb_product_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "tb_product" ADD CONSTRAINT "tb_product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "tb_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
