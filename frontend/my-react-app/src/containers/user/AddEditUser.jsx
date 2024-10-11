import React from 'react'
import { Dialog,DialogTitle,DialogContent, TextField,Box,Button ,Select,FormControl,InputLabel,MenuItem, Typography} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState,useEffect } from 'react'
import { addUser,updateUser } from '../../redux/actions/user'
import { useDispatch,useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { resetError } from '../../redux/reducers/user'
import { getAllRoles } from '../../redux/actions/user'
import usePermissions from '../../hooks/usePermissions'
function AddEditUser({onClose,open,userId}) {
    const {t}=useTranslation()
    const dispatch=useDispatch()
    const isAuth=usePermissions(["add_user","edit_user"])
    const {error}=useSelector(state=>state.user)
    const {roles}=useSelector(state=>state.role)
    const [user, setuser] = useState({
        firstName:"",lastName:"",email:"",phone:"",id_role:""
    })
   
    const userData=useSelector(state=>userId?state.user.users.find(user=>user.id===userId):null)
    const handleChange=(e)=>{
        setuser({...user,
            [e.target.name]:e.target.value
        })
    }
   const handleSubmit=(e)=>{
    e.preventDefault()
    if(userId){
        
          
    dispatch(updateUser(user))
    }
    else { dispatch(addUser(user))}
    setuser({...user,
        firstName:"",
        lastName:"",
        email:"",
        phone:""
    })
      if(!error){
        onClose()
       
      }
     
   }
   useEffect(() => {
    if(userId){
        setuser(userData)
    }
   }, [userId])
   
   useEffect(() => {
    dispatch(resetError())
   }, [])
   
   useEffect(() => {
     error && toast.error(error)
   }, [error])
     useEffect(() => {
      dispatch(getAllRoles())
     }, [])
      
     if (!isAuth) 
      return (
        <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open}>
          <DialogContent>
            <Box><Typography>{t("not_authorized")}</Typography></Box>
          </DialogContent>
        </Dialog>
      );
    
    
    
  return (
    <div>
      <Dialog  fullWidth maxWidth="lg" onClose={onClose} open={open}>
      <DialogTitle sx={{backgroundColor:"#D9D9D9"}}>{userId?t("update_user"):t("add_new_user")}</DialogTitle>
      <DialogContent>
        <Box display="flex"> <TextField
        name="firstName"
        placeholder='add user firstname'
        label="firstName"
        fullWidth
        sx={{margin:2}}
        onChange={handleChange}
        value={user.firstName}
        ></TextField>
         <TextField
        name="lastName"
        placeholder='add user lastname'
        label="lastName"
        fullWidth
        sx={{margin:2}} 
        onChange={handleChange}
        value={user.lastName}
        ></TextField></Box>
        
         <Box display="flex"> <TextField
        name="email"
        placeholder='add user email'
        label="email"
        fullWidth
        type="email"
        sx={{margin:2}}
        onChange={handleChange}
        value={user.email}
        ></TextField>
         <TextField
        name="phone"
        placeholder='add user phone'
        label="phone"
        fullWidth
        sx={{margin:2}} 
        onChange={handleChange}
        value={user.phone}
        ></TextField></Box>
        <FormControl sx={{width:"47%", margin: 2 }}>
              <InputLabel id="category-select-label">role</InputLabel>
              <Select
                id="role-select"
                label="role"
                name="id_role"
                value={user.id_role}
                onChange={handleChange}
              >
                {roles && roles.map(role => (
                  <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
      </DialogContent>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
              <Button   sx={{margin:1,color:"white",backgroundColor:"green"}}variant="outlined" type="submit"  onClick={handleSubmit}>{userId?t("update"):t("add")}</Button>
              <Button   variant="outlined" type="submit"  onClick={onClose} sx={{backgroundColor:"#B4BEC9",color:"white",margin:1,borderColor:"#B4BEC9"}}>{t("cancel")}</Button>
            </Box>
    </Dialog>
      
    </div>
  )
}

export default AddEditUser