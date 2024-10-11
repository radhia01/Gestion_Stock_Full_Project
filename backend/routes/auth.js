const express=require("express")
const router=express.Router()
const {signUp, signIn, SignOut}=require("../controler/auth")
// signUp route 
router.post("/api/signUp",signUp)
router.post("/api/signIn",signIn)
router.get("/api/signOut",SignOut)
module.exports=router