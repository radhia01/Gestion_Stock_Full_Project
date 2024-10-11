import React from 'react'
import {Typography,Modal,Box,Divider,TextField,Button} from "@mui/material"
import {useTranslation} from "react-i18next"
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addRole, updateRole } from '../../redux/actions/role';
import usePermissions from '../../hooks/usePermissions';
function AddEditRole({open,handleClose,selectedRole}) {
    const isAuth=usePermissions(["add_role","edit_role"])
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      const {t}=useTranslation()
      const dispatch=useDispatch()
      const [name, setname] = useState("")
      const handleChange=(e)=>{
        setname(e.target.value)
        } 
     const role=useSelector(state=>selectedRole?state.role.roles.find(role=>role.id===selectedRole):null);
     useEffect(() => {
       if(selectedRole){
        setname(role.name)
       }
     }, [selectedRole])
     
     const handleSubmit=()=>{
      
            if(selectedRole){
               
                dispatch(updateRole({id:selectedRole,name}))
            }
            else {
                dispatch(addRole({name}))
            }
       handleClose()
     }
     if(!isAuth) return   <Modal
     open={open}
     onClose={handleClose}
     aria-labelledby="modal-modal-title"
     aria-describedby="modal-modal-description"
   >
     <Box sx={style}>
       <Typography id="modal-modal-title"  variant="h4">
     {t("not_authorized")}
       </Typography>
       <Divider/>
       
     </Box>
   </Modal>
  return (
    <div>  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
     <Box sx={style} >
      <Typography id="modal-modal-title"  component="h2" >
   { selectedRole ? t("update_role"):t("add_new_role")}
      </Typography>
      <Divider/>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",padding:3}}>
       <TextField
       label={t("add_new_role")}
       name="name"
       type="text"
       value={name}
       required
       onChange={handleChange}
       ></TextField>

        </Box>
       <Divider/>
       
        
        <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
              <Button   sx={{margin:1,color:"white",backgroundColor:"green"}}variant="outlined" type="submit" onClick={()=>handleSubmit(name)}>{selectedRole ?t("update"):t("add")}</Button>
              <Button   variant="outlined" type="submit"  sx={{backgroundColor:"#B4BEC9",color:"white",margin:1,borderColor:"#B4BEC9"}} onClick={handleClose}>{t("cancel")}</Button>
            </Box>
    </Box></Modal></div>
  )
}

export default AddEditRole