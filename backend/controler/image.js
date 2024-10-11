const {PrismaClient}=require("@prisma/client")
const prisma= new PrismaClient()
const cloudinary = require('../config/cloudinary');
// add new Image 
const addImages = async (req, res) => {
    try {
        const { id } = req.params;
        // Pour chaque fichier téléchargé
        const imagesPromises = req.files.map(async (file) => {
            const { secure_url } = await cloudinary.uploader.upload(file.path);
            // Insérer chaque image dans la base de données
            const newImage = await prisma.image.create(
                {
                    data:{
                        url:secure_url,
                        id_product:id
                    }
                }
            );
            return newImage;
        });
  
        const images = await Promise.all(imagesPromises);
  
        res.json({success:true});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: error.message,
        });
    }
};


// get all Images 
const getAllImages=async(req,res)=>{

    try{
        const images=await prisma.image.findMany()
        return res.status(200).json({images})
    }
    catch(error){
        return res.status(500).json({code:"server_error",err:error.message})
    }
}
// update images 
const updateProductImages=async(req,res)=>{
      const {id}=req.params;
      try {
        
           const imagesPromises = req.files.map(async (file) => {
            const { secure_url } = await cloudinary.uploader.upload(file.path);
            return secure_url; 
        });
     
        const images = await Promise.all(imagesPromises);
   
    const dataToadd=images.map(url=>(
        {
            id_product:id,
            url
        }
    ))
        await prisma.image.createMany({data:dataToadd})
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}
   
   
module.exports={addImages,getAllImages,updateProductImages}