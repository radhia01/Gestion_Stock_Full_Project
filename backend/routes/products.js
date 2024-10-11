const express=require("express")
const router=express.Router()
const verifyUser=require("../utils/verifyUser")
const {addRole, getAllProducts, addProduct, deleteProduct, updateProduct}=require("../controler/product")
const isAuthorized =require("../utils/UserAuthorisation")
// get all  products 
router.get("/api/products",verifyUser,getAllProducts)
// add new product 
router.post("/api/products",verifyUser,isAuthorized(["add_product"]),addProduct)
// delete a product
router.delete("/api/products/:id",verifyUser,isAuthorized(["delete_product"]),deleteProduct)
// route to update category
router.put("/api/products/:id",verifyUser,isAuthorized(["edit_product"]),updateProduct)
module.exports=router