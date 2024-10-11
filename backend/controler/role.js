const {PrismaClient}=require("@prisma/client");
const prisma=new PrismaClient();

// add new role 
const addRole=async(req,res)=>{
    const {name}=req.body
    if(!name) {
        return res.status(400).json({code:"missing_fields"})
    }
    try{
        // check if user already exist 
        
        const role=await prisma.role.create({data:{name}})
        return res.status(201).json(role)
    }
    catch(error){
        console.log(error.message)
 return res.status(500).json({code:"server_error"})
    }
}
// get all roles 
const getRoles=async(req,res)=>{

    try{
        // check if user already exist 
        
        const roles=await prisma.role.findMany()
        return res.status(200).json({roles})
    }
    catch(error){
 return res.status(500).json({code:"server_error"})
    }
}
// delete role 
const deleteRole=async(req,res)=>{
    const {id}=req.params
    try{
        await prisma.role.delete({where:{id}})
        return res.status(200).json(id)
    }
    catch(error){
 return res.status(500).json({code:"server_error"})
    }
}
// update role 
const updateRole=async(req,res)=>{
    const {id}=req.params
    const {name}=req.body
    try{
       const updatedRole= await prisma.role.update(
        {where:{id},
        data:{name}})
        return res.status(200).json({id,updatedRole})
    }
    catch(error){
 return res.status(500).json({code:"server_error"})
    }
}
// get permissions by role 
const getPermissionsByRole=async(req,res)=>{
    const {id}=req.params;

  try{
         const permissions=await prisma.role_Permissions.findMany({
            where:{id_role:id}
         })
         const newPermissions=permissions.map(permission=>{
            return {
                permission:permission.id_permission
            }
         })
          return res.status(200).json(newPermissions);
  }
  catch(error){
    console.log(error.message)
    return res.status(500).json({code:"server_error"})
  }
}
const addPermissiontoRole=async(req,res)=>{
    const {idRole,idPermission}=req.params
   
    try{
          const newPermission= await prisma.role_Permissions.create({
            data:{
                id_role:idRole,
                id_permission:idPermission
            }
           })
              return res.status(200).json(newPermission)
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({code:"server_error"})
    }
}
/// remove permission from role 
const removePermissionFromRole=async(req,res)=>{
    const {idRole,idPermission}=req.params
   console.log(req.params)
    try{
           await prisma.role_Permissions.delete({where: {
            id_role_id_permission: {  // Assure-toi que c'est bien le nom de ta clé composite
                id_role: idRole,
                id_permission: idPermission,
            }
        }})
          
              return res.status(200).json(idPermission)
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({code:"server_error"})
    }
}
module.exports={addRole,getRoles,deleteRole,updateRole,addPermissiontoRole,getPermissionsByRole,removePermissionFromRole}