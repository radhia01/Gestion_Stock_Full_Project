-- CreateTable
CREATE TABLE "Permission" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role_Permissions" (
    "id_role" STRING NOT NULL,
    "id_permission" STRING NOT NULL,

    CONSTRAINT "Role_Permissions_pkey" PRIMARY KEY ("id_role","id_permission")
);

-- AddForeignKey
ALTER TABLE "Role_Permissions" ADD CONSTRAINT "Role_Permissions_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role_Permissions" ADD CONSTRAINT "Role_Permissions_id_permission_fkey" FOREIGN KEY ("id_permission") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
