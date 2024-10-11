-- CreateTable
CREATE TABLE "Sale" (
    "id" STRING NOT NULL,
    "sale_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_status" STRING NOT NULL,
    "id_user" STRING NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale_Product" (
    "id_product" STRING NOT NULL,
    "id_sale" STRING NOT NULL,
    "quantity" INT4 NOT NULL,

    CONSTRAINT "Sale_Product_pkey" PRIMARY KEY ("id_product","id_sale")
);

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale_Product" ADD CONSTRAINT "Sale_Product_id_sale_fkey" FOREIGN KEY ("id_sale") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale_Product" ADD CONSTRAINT "Sale_Product_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
