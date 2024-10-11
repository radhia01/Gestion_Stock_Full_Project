const express=require("express")
const router=express.Router()
const verifyUser=require("../utils/verifyUser")
const isAuthorized=require("../utils/UserAuthorisation")
const { addUser, getAllUsers, deleteUser, updateUser, sendEmail } = require("../controler/user")
// add new category 
router.post("/api/users",verifyUser,isAuthorized(["add_user"]),addUser)
// get all Users 
router.get("/api/users",verifyUser,isAuthorized(["view_users"]),getAllUsers)
// route to delete User 
router.delete("/api/users/:id",verifyUser,isAuthorized(["delete_user"]),deleteUser)
// update User 
router.put("/api/users/:id",verifyUser,isAuthorized(["edit_user"]),updateUser)
// send email
router.post("/api/users/send/email",verifyUser,sendEmail)
module.exports=router