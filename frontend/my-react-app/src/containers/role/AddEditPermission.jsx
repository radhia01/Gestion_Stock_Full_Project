import React from 'react'
import {Typography,Modal,Box,Divider,TextField,Button} from "@mui/material"
import {useTranslation} from "react-i18next"
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addPermission, updatePermission } from '../../redux/actions/permission';
import {toast} from "react-toastify"
import { resetError } from '../../redux/reducers/permission';
import usePermissions from '../../hooks/usePermissions';
function AddEditPermission({open,handleClose,selectedPermission}) {
     const {error}=useSelector(state=>state.permission)
    const isAuth=usePermissions(["add_permission","edit_permission"])
     
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
     const Permission=useSelector(state=>selectedPermission?state.permission.permissions.find(permission=>permission.id===selectedPermission):null);
     useEffect(() => {
       if(selectedPermission){
        setname(Permission.name)
       }
     }, [selectedPermission])
     
     const handleSubmit=()=>{
      
            if(selectedPermission){
               
                dispatch(updatePermission({id:selectedPermission,name}))
            }
            else {
                dispatch(addPermission({name}))
            }
       handleClose()
     }
     useEffect(() => {
     error && toast.error(error)
     }, [error])
      useEffect(() => {
       dispatch(resetError())
      }, [dispatch])

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
    <div><Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
       <Box sx={style} >
        <Typography id="modal-modal-title"  component="h2" >
     { selectedPermission ? t("update_Permission"):t("add_new_permission")}
        </Typography>
        <Divider/>
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",padding:3}}>
         <TextField
         label={t("add_new_permission")}
         name="name"
         type="text"
         value={name}
         required
         onChange={handleChange}
         ></TextField>
  
          </Box>
         <Divider/>
         
          
          <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
                <Button   sx={{margin:1,color:"white",backgroundColor:"green"}}variant="outlined" type="submit" onClick={()=>handleSubmit(name)}>{selectedPermission ?t("update"):t("add")}</Button>
                <Button   variant="outlined" type="submit"  sx={{backgroundColor:"#B4BEC9",color:"white",margin:1,borderColor:"#B4BEC9"}} onClick={handleClose}>{t("cancel")}</Button>
              </Box>
      </Box></Modal></div>
  )
}

export default AddEditPermission