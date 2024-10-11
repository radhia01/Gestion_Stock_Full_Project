const {PrismaClient}=require("@prisma/client")
const prisma = new PrismaClient();
// add new category 
const addBrand=async(req,res)=>{
    const {name}=req.body

    if(!name){
        return res.status(400).json({code:"missing_fields"})
    }
    try{
             const existingBrand=await prisma.brand.findFirst({where:{name:name}})
             if(existingBrand){
                return res.status(409).json({code:"Brand_already_exist"})
             }
        const brand=await prisma.brand.create({
            data:{
                name,
            }
        })
        return res.status(201).json(brand)

    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({code:"server_error",err:error.message})
    }
}
// get all brands
const getAllBrands=async(req,res)=>{
   

    
    try{
             const brands=await prisma.brand.findMany()
            
        return res.status(200).json({brands})

    }
    catch(error){
        return res.status(500).json({code:"server_error",err:error.message})
    }
}
// delete brand 
const deleteBrand=async(req,res)=>{
   
const {id}=req.params
    
    try{
             await prisma.brand.delete({
                where:{id}
             })
            
        return res.status(200).json(id)

    }
    catch(error){
        return res.status(500).json({code:"server_error",err:error.message})
    }
}
// update brand 
const updateBrand=async(req,res)=>{
   
    const {id}=req.params
    const {name}=req.body;
        
        try{
                 const updatedBrand=await prisma.brand.update({
                    where:{id},
                    data:{
                        name
                    }
                 })
                
            return res.status(200).json({id,updatedBrand})
    
        }
        catch(error){
            return res.status(500).json({code:"server_error",err:error.message})
        }
    }
module.exports={addBrand,getAllBrands,deleteBrand,updateBrand}