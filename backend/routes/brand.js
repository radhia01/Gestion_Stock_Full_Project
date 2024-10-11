const express=require("express")
const router=express.Router()
const verifyUser=require("../utils/verifyUser")
const { addBrand, getAllBrands, deleteBrand, updateBrand } = require("../controler/brand")
const isAuthorized=require("../utils/UserAuthorisation");
// add new category 
router.post("/api/brands",verifyUser,isAuthorized(["add_brand"]),addBrand)
// get all brands 
router.get("/api/brands",verifyUser,isAuthorized(["view_brands"]),getAllBrands)
// route to delete brand 
router.delete("/api/brands/:id",verifyUser,isAuthorized(["delete_brand"]),deleteBrand)
// update brand 
router.put("/api/brands/:id",verifyUser,isAuthorized(["edit_brand"]),updateBrand)
module.exports=router