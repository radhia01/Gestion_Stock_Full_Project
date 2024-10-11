import React from 'react';
import { Box ,Button,Container, TextField, Typography} from '@mui/material';
import { useState,useEffect } from 'react';
function SignUp() {
  const [user, setuser] = useState({
    username:"",
    email:"",
    password:"",
    role:"999323189841395713"
  })
  const handleChange=(e)=>{
    setuser({
      ...user,
      [e.target.name]:e.target.value
    });
    
  }
  const handleSubmit=async()=>{
      
  }
  return (
    <Container>
      <Box  sx={{

        display:"flex",
        flexDirection:"column",
        alignItems:"center",
         borderRadius:8,
        backgroundColor:"white",
        padding:6,
        width:"100%"
      }}>


 <Typography 
 variant='h4'
 sx={{color:"yellow"}}>S'inscrire</Typography>
 <Box 
 component="form"
 onSubmit={handleSubmit}
 sx={{
  mt:10,
  display:"flex",
  flexDirection:"column",
  width:"100%",
  gap:2,
  
  
 }}>
  
     <TextField
     required 
     fullwidth
     name="username"
     label="Nom"
     onChange={handleChange}>


     </TextField>
     <TextField
     required 
     fullwidth
     name="email"
     label="Email"
     onChange={handleChange}>


     </TextField>
     <TextField
     required 
     fullwidth
     type="password"
     name="Mot de passe"
     label="password"
     onChange={handleChange}>


     </TextField>
     <Button
     type="submit"  fullwidth variant='contained'>Terminer</Button>
 </Box>

      </Box>
    </Container>
  );
}

export default SignUp;