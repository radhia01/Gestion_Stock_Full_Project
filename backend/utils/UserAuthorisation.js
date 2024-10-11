
const {getPermissionsByRole}=require("../controler/permission")
const userAuthorization=(permissions)=>async(req,res,next)=>{

   const requiredPermissions=await getPermissionsByRole(req.role)
    try{
          
          const isAuthorized=permissions.every(permission=> requiredPermissions.includes(permission))
          if(!isAuthorized){
            return res.status(401).json({code:"you are Unauthorized"})
          }
           console.log(isAuthorized)
          next()
    }
    catch(error){

    }
}
module.exports=userAuthorization