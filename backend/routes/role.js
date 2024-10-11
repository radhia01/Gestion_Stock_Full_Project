const express=require("express")
const router=express.Router()
const {addRole, getRoles, updateRole, deleteRole, addPermissiontoRole, getPermissionsByRole, removePermissionFromRole}=require("../controler/role")
const verifyUser=require("../utils/verifyUser")
const isAuthorized=require("../utils/UserAuthorisation")
// signUp route 
router.post("/api/roles",verifyUser,isAuthorized(["add_role"]),addRole)
router.get("/api/roles",verifyUser,isAuthorized(["view_roles"]),getRoles)
router.put("/api/roles/:id",verifyUser,isAuthorized(["edit_role"]),updateRole)
router.delete("/api/roles/:id",verifyUser,isAuthorized(["delete_role"]),deleteRole)
// add permission to role 
router.post("/api/roles/:idRole/permissions/:idPermission",verifyUser,isAuthorized(["add_permission_to_role"]),addPermissiontoRole)
// get role permissions 
router.get("/api/roles/:id/permissions",verifyUser,isAuthorized(["view_role_permissions"]),getPermissionsByRole)
router.delete("/api/roles/:idRole/permissions/:idPermission",verifyUser,isAuthorized(["delete_permission_from_role"]),removePermissionFromRole)
module.exports=router