const express=require("express")
const router=express.Router()
const { addCategory, getAllCategories, deleteCategory, updateCategory }=require("../controler/category")
const verifyUser=require("../utils/verifyUser")
const isAuthorized =require("../utils/UserAuthorisation")
// add new category 
router.post("/api/categories",verifyUser,isAuthorized(["add_category"]),verifyUser,addCategory)
// route to get all categories
router.get("/api/categories",verifyUser,isAuthorized(["view_categories"]),verifyUser,getAllCategories)
// delete an existing category
router.delete("/api/categories/:id",verifyUser,isAuthorized(["delete_category"]),verifyUser,deleteCategory)
// update category
router.put("/api/categories/:id",verifyUser,isAuthorized(["edit_category"]),updateCategory)
module.exports=router