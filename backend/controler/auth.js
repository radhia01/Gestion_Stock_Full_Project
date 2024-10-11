const {PrismaClient}=require("@prisma/client")
const prisma=new PrismaClient();
const Cookies = require('js-cookie')
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
// signUp
const signUp=async(req,res)=>{
    const {firstName,lastName,email,password,phone,image_url}=req.body
    if(!firstName||!lastName||!email||!password||!phone||!image_url) {
        return res.status(400).json({code:"missing_fields"})
    }

    // search for user role 
    const role = await prisma.role.findFirst({
        where: {
          name: "admin"
        },
      })
    if(!role){
        return res.status(404).json({code:"user_not_found"})
    }
    try{
        // check if user already exist 
        const existingUser=await prisma.user.findFirst({where:{email:email}})
        if(existingUser){
            return res.status(409).json({code:"user_already_exist"})
        }
        // hash password
        const hashedPassword=await bcryptjs.hash(password,10)
        // create the new user
        const user=await prisma.user.create({data:{firstName,lastName,email,password:hashedPassword,id_role:role.id,phone,image_url}})
        return res.status(201).json(user)
    }
    catch(error){
 return res.status(500).json({code:"server_error",err:error.message})
    }
}
// signIn 
const signIn=async(req,res)=>{
    const {email,password}=req.body
    if(!email ||!password){
        return res.status(400).json({code:"missing_fields"})
    }
    try{
        // check if user already exist 
        const existingUser=await prisma.user.findFirst({where:{email}});
        if(!existingUser){
            return res.status(404).json({code:"user_not_found"});

        }
        // check if password is correct 
        const ckeckedPassword=await bcryptjs.compare(password,existingUser.password);
        if(!ckeckedPassword){
            return res.status(400).json({code:"password_incorrect"})
        }
        // generate token 
        const accessToken=jwt.sign({id:existingUser.id,role:existingUser.id_role},process.env.JWT_SECRET)
        res.cookie("accessToken",accessToken,{httpOnly:true,secure:"true",sameSite: 'None'}).status(200).json({user:existingUser,success:true})
    }
    catch(error){
        return res.status(500).json({code:"server_error",err:error.message})
    }
}
 const SignOut=(req,res)=>{
    
    res.clearCookie("accessToken",{ path: '/',secure: true,httpOnly:true  });
    console.log("logout")
return res.status(200).json({code:"Cookie_removed"})}
module.exports={signUp,signIn,SignOut}