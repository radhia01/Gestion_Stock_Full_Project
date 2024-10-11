const {PrismaClient}=require("@prisma/client")
const prisma = new PrismaClient();
// add new category 
const addCategory=async(req,res)=>{
    const {name}=req.body
    if(!name){
        return res.status(400).json({code:"missing_fields"})
    }
    try{
             const existingCategory=await prisma.category.findFirst({where:{name:name}})
             if(existingCategory){
                return res.status(409).json({code:"Category_already_exist"})
             }
        const category=await prisma.category.create({
            data:{
                name
            }
        })
        return res.status(201).json(category)

    }
    catch(error){
        return res.status(500).json({code:"server_error",err:error.message})
    }
}
// get all categories 
const getAllCategories=async(req,res)=>{
    try{
        const categories=await prisma.category.findMany()
        return res.status(200).json({categories})
    }
    catch(error){
        return res.status(500).json({code:"server_error",err:error.message})
    }
}
// delete category 
const deleteCategory=async(req,res)=>{
    const {id}=req.params
    try{
          await prisma.category.delete ({
            where:{
                id
            }
          })
          return res.status(200).json({id})
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({code:"server_error",err:error.message})
    }
}
// update category 
const updateCategory=async(req,res)=>{
    const {id}=req.params
    const {name}=req.body
    try{
         const category= await prisma.category.update ({
            where:{id},
            data:{name}
          })
          return res.status(200).json({id,category})
    }
    catch(error){
        console.log(error.message)

        return res.status(500).json({code:"server_error",err:error.message})
    }
}
module.exports={addCategory,getAllCategories,deleteCategory,updateCategory}