const {PrismaClient}=require("@prisma/client")
const prisma = new PrismaClient();
// add new permission 
const addPermission=async(req,res)=>{
    const {name}=req.body
    if(!name){
        return res.status(400).json({code:"missing_fields"})
    }
    try{
             const existingPermission=await prisma.permission.findFirst({where:{name:name}})
             if(existingPermission){
                return res.status(409).json({code:"Permission_already_exist"})
             }
        const permission=await prisma.permission.create({
            data:{
                name
            }
        })
        return res.status(201).json(permission)

    }
    catch(error){
        return res.status(500).json({code:"server_error",err:error.message})
    }
}
// get all permissions 
const getAllPermissions=async(req,res)=>{
    try{
        const permissions=await prisma.permission.findMany()
        return res.status(200).json(permissions)
    }
    catch(error){
        return res.status(500).json({code:"server_error",err:error.message})
    }
}
// delete Permission 
const deletePermission=async(req,res)=>{
    const {id}=req.params
    try{
          await prisma.permission.delete ({
            where:{
                id
            }
          })
          return res.status(200).json(id)
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({code:"server_error",err:error.message})
    }
}
// update Permission 
const updatePermission=async(req,res)=>{
    const {id}=req.params
    const {name}=req.body
    try{
         const updatedPermission= await prisma.permission.update ({
            where:{id},
            data:{name}
          })
          return res.status(200).json({id,updatedPermission})
    }
    catch(error){
        console.log(error.message)

        return res.status(500).json({code:"server_error",err:error.message})
    }
}
const getPermissionsByRole=async(role)=>{
   

  try{
         const rolePermissions=await prisma.role_Permissions.findMany({
            where:{id_role:role}
         })
         const permissionsList=[]
           const permissions=await prisma.permission.findMany();
           rolePermissions.map(permission=>{
            const pemissionName=permissions.find(per=>per.id===permission.id_permission)
            permissionsList.push(pemissionName.name)
         })
          return permissionsList;
  }
  catch(error){
    console.log(error.message)
 
  }
}





module.exports={addPermission,getAllPermissions,deletePermission,updatePermission,getPermissionsByRole}