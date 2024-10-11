const {PrismaClient}=require("@prisma/client")
const prisma= new PrismaClient()
// add new product 
const addProduct=async(req,res)=>{
    console.log(req.body)
    const {name,description,price,quantity,id_category,id_brand,expiry_quantity,expired_date,created_on}=req.body
    if(!name||!description||!price||!quantity||!id_category||!expiry_quantity||!expired_date||!id_brand||!created_on){
        return res.status(400).json({code:"missing_fields"})
    }
   
    try{
        const product=await prisma.product.create({
            data:{
                name,description,price,quantity,id_category,id_brand,expired_date,expiry_quantity,created_on
            }
        })
        return res.status(201).json({product,success:true})
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({code:"server_error",err:error.message})
    }
}
// get product 
const getProduct=async(req,res)=>{
    const {id}=req.params
   
    try{
        const product=await prisma.product.findUnique({
            where:{id}
        })
        if(!product){
            return  res.status(404).json({code:"product_not_found"})
        }
        return res.status(200).json({product})
    }
    catch(error){
        return res.status(500).json({code:"server_error"})
    }
}
// get all products 
const getAllProducts=async(req,res)=>{

    try{
        const products=await prisma.product.findMany()
        return res.status(200).json({products})
    }
    catch(error){
        return res.status(500).json({code:"server_error",err:error.message})
    }
}
// delete a product 
const deleteProduct=async(req,res)=>{
    const {id}=req.params
   
    try{
       await prisma.image.deleteMany({where:{id_product:id}})
       await prisma.product.delete({
            where:{
                id
            }
        })
        return res.status(200).json({id})
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({code:"server_error"})
       
    }
}
// update a product 
const updateProduct=async(req,res)=>{
    const {id}=req.params
    const {name,description,price,quantity,expired_date,expiry_quantity,created_on}=req.body
   
    try{
        const product=await prisma.product.update({
            where:{
                id
            },
            data:{name,description,price,quantity,expired_date,expiry_quantity,created_on}
        })
        return res.status(200).json({id,product,successUpdate:true})
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({code:"server_error"})
    }
}
module.exports={addProduct,deleteProduct,updateProduct,getAllProducts,getProduct}