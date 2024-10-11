const express=require("express")
const router=express.Router()
const verifyUser=require("../utils/verifyUser")
const { getAllPermissions, addPermission, deletePermission, updatePermission}=require("../controler/permission")
const { getPermissionsByRole } = require("../controler/role")
const  isAuthorized =require("../utils/UserAuthorisation")
// get all  permission 
router.get("/api/permissions",verifyUser,isAuthorized(["view_permissions"]),getAllPermissions)
// add new permission 
router.post("/api/permissions",verifyUser,isAuthorized(["add_permission"]),addPermission)
// delete a permission
router.delete("/api/permissions/:id",verifyUser,isAuthorized(["delete_permission"]),deletePermission)
// route to update category
router.put("/api/permissions/:id",verifyUser,isAuthorized(["edit_permission"]),updatePermission)

module.exports=router