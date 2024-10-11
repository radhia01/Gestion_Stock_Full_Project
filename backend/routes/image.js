const express = require("express");
const router = express.Router();
const upload=require("../multer/multer")
// Assurez-vous d'importer correctement votre client Prisma

const { addImages, getAllImages, updateProductImages } = require("../controler/image");

// Route pour ajouter des images à un produit
router.post("/api/images/products/:id", upload.array("image"), addImages);
// route to get all images 
router.get("/api/images", getAllImages);
// update product images 
router.put("/api/images/products/:id",upload.array("image"),updateProductImages)

module.exports = router;
