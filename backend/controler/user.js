const {PrismaClient}=require("@prisma/client")
const prisma = new PrismaClient();
const bcryptjs=require("bcryptjs");
const nodemailer=require("nodemailer")
const generator=require("generate-password");
// add new category 

const sendEmail=async(req,res)=>{
    const {email,userPassword}=req.body
    console.log(req.body)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
      });
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: '👋 Voici votre mot de passe🚀',
         text: `Votre mot de passe est : ${userPassword}`
      };
  try{ 

    await transporter.sendMail(mailOptions);

}
     
   catch(error){
    return   res.status(error.message)
   }

}
      
const addUser=async(req,res)=>{
    const {firstName,lastName,email,phone,id_role}=req.body
const userPassword=generator.generate({
    length:10,
    numbers:true,
    symbols:true,
    uppercase:true,
    lowercase:true,
    exclude:false

})
const url="https://res.cloudinary.com/db8b6npfz/image/upload/v1718096251/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz_roxy9m.jpg"

    if(!firstName||!lastName||!email||!phone){
        return res.status(400).json({code:"missing_fields"})
    }
    try{

    
        
          // check if user already exist 
             const existingUser=await prisma.user.findFirst({where:{email}})
             if(existingUser){
                return res.status(409).json({code:"User_already_exist"})
             }
             // generate a password for the user 
          
          
          // hash password 
          const hashedPassword=await bcryptjs.hash(userPassword,10)
          const user=await prisma.user.create({
            data:{
                firstName,lastName,email,password:hashedPassword,id_role,image_url:url,phone
            }
        })
         await sendEmail({body:{email,userPassword}},res)
        return res.status(201).json(user)

    }
    catch(error){
        return res.status(500).json({code:"server_error",err:error.message})
    }
}
// get all Users
const getAllUsers=async(req,res)=>{
   

    
    try{
             const users=await prisma.user.findMany()
            
        return res.status(200).json({users})

    }
    catch(error){
        return res.status(500).json({code:"server_error",err:error.message})
    }
}
// delete User 
const deleteUser=async(req,res)=>{
   
const {id}=req.params
    
    try{
             await prisma.user.delete({
                where:{id}
             })
            
        return res.status(200).json(id)

    }
    catch(error){
        return res.status(500).json({code:"server_error",err:error.message})
    }
}
// update User 
const updateUser=async(req,res)=>{
   
    const {id}=req.params
    const {firstName,lastName,email,phone,image_url,password,id_role}=req.body;
          console.log(req.body)
        try{
                 const updatedUser=await prisma.user.update({
                    where:{id},
                    data:{
                        firstName,
                        lastName,
                        email,
                        phone,
                        image_url,
                        password,
                        id_role
                    }
                 })
                 console.log("well")
                
            return res.status(200).json({id,updatedUser})
    
        }
        catch(error){
            console.log(error.message)
            return res.status(500).json({code:"server_error",err:error.message})
        }
    }
module.exports={addUser,getAllUsers,deleteUser,updateUser,sendEmail}