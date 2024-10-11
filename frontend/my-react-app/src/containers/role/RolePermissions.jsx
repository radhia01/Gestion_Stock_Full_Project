import React from 'react';
import { Box, Typography, Checkbox,Card,Button ,Modal,Divider,Select,Dialog,FormControl,Stack,InputLabel,MenuItem, DialogContent, DialogTitle} from '@mui/material';
import { useOutletContext } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import {getAllPermissions} from "../../redux/actions/permission"
import { useEffect,useState } from 'react';
import {useSelector,useDispatch} from "react-redux"
import { addPermissionToRole, getAllRoles, removeRolePermissions } from '../../redux/actions/role';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getRolePermissions } from '../../redux/actions/role';
import { styled } from '@mui/material/styles';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import usePermissions from '../../hooks/usePermissions';
const AddPermission=({id,handleClose,getRoleName,permissions,rolePermissions})=>{
  
  const dispatch=useDispatch()
  const {t}=useTranslation()
   const [idper, setidper] = useState("")
   const isAuth=usePermissions(["add_permission_to_role"])
   const handleChange=(e)=>{
   setidper(e.target.value)
   }
   const handleSubmit=()=>{
    console.log(idper)
    dispatch(addPermissionToRole({id_role:id,id_permission:idper}))
    handleClose()
   }
   if(!isAuth) return    
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
   
   
<DialogContent>
  <Typography variant="h4">{t("not_authorized")}</Typography>
   </DialogContent>

</Dialog>
 
  return (
    
    
   <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>Add new Permission to {getRoleName(id) } role </DialogTitle>
      <DialogContent>
      <FormControl sx={{width:"100%", margin: 2 }}>
    <InputLabel id="category-select-label">permission</InputLabel>
    <Select
      id="category-select"
      label="permmission"
      name="id_category"
      onChange={handleChange}
    >
      {permissions && permissions.map(element=>{
        const isFound=rolePermissions && rolePermissions.find(role=>role.permission===element.id)
        if(!isFound){
          return (
            <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
          )
        }
        return null 
      })}
    </Select>
  </FormControl>
  <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
              <Button   sx={{margin:1,color:"white",backgroundColor:"green"}}variant="outlined" type="submit"  onClick={handleSubmit}>{t("add")}</Button>
              <Button   variant="outlined" type="submit"  onClick={handleClose} sx={{backgroundColor:"#B4BEC9",color:"white",margin:1,borderColor:"#B4BEC9"}}>{t("cancel")}</Button>
            </Box>
      </DialogContent>
   
  </Dialog>
    
    
  )
}
export const DeleteModal=({open,handleClose,id,idPermission})=>{
  const dispatch=useDispatch()
  const {t}=useTranslation()
  const isAuth=usePermissions(["delete_permission_from_role"])
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    textAlign:"center",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    fontSize:20
  
  };
    const handleDeleteCategory=()=>{
     
        dispatch(removeRolePermissions({id_role:id,id_permission:idPermission}))
        handleClose();

      }
       
     
      if(!isAuth) return (
        <Modal
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
      )  
      
      
  return (
    <div>
  <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title"  component="h2">
      {t("confirm_delete_category")}
        </Typography>
        <Divider/>
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Button variant="contained" sx={{margin:2,backgroundColor:"green"}} onClick={()=>{
            handleDeleteCategory();
            handleClose()
          }}>{t("yes")}</Button>
          <Button variant="contained" sx={{margin:2,backgroundColor:"red"}} onClick={handleClose}>{t("no")}</Button>
        </Box>
      </Box>
    </Modal> 
    
  </div>
  )
}

function RolePermissions() {
    const {id}=useParams()
    const dispatch=useDispatch()
    const {t}=useTranslation()
    const { searchItem } = useOutletContext();
    const [idPermission, setidPermission] = useState(null)
    const [OpenDelete, setOpenDelete] = useState(false)
    const isAuth=usePermissions(["view_role_permissions"])
    useEffect(() => {
      dispatch(getRolePermissions(id))
      dispatch(getAllPermissions())
  }, [])
   const {permissions}=useSelector(state=>state.permission)
   const rolePermissions=useSelector(state=>state.role.permissions)
  console.log(rolePermissions)
    const [open, setopen] = useState(false)
    useEffect(() => {
     dispatch(getAllRoles())
    }, [dispatch])
      const {roles}=useSelector(state=>state.role)
   
      const getRoleName=(id)=>{
        const role=roles && roles.find(role=>role.id===id)
        
        return role? role.name:null
      }
      const getPermissionName=(id)=>{
        
        const permission=permissions && permissions.find(permission=>permission.id===id)
        const permissionName=permission.name.split("_")[1]
        const permissionNamePart2=permission.name.split("_")[2]
        const permissionNamePart3=permission.name.split("_")[3]

        const finalName=permissionNamePart3? permission.name.split("_")[0]+" "+permissionName.charAt(0).toUpperCase()+ permissionName.slice(1)+" "+permissionNamePart2+" "+permissionNamePart3:permissionNamePart2 && !permissionNamePart3? 
        permission.name.split("_")[0]+" "+permissionName.charAt(0).toUpperCase()+ permissionName.slice(1)+" "+permissionNamePart2 :permission.name.split("_")[0]+" "+permissionName.charAt(0).toUpperCase()+ permissionName.slice(1)

        return finalName? finalName:null
      }
      const handleClose=()=>{
        setopen(false)
      }
      const handleOpenDeleteModel=(idper)=>{
        setOpenDelete(true)
        setidPermission(idper)
      }
      const handleCloseDeleteModel=()=>{
        setOpenDelete(false);
        setidPermission(null)
      }
      const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(3),
        margin:theme.spacing(2),
        dispatch:"flex",
        alignContent:"space-between",
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
          backgroundColor: '#1A2027',
        }),
      }));
      const newRolePermissions=rolePermissions && rolePermissions.filter(roleper=>getPermissionName(roleper.permission).toUpperCase().includes(searchItem.toUpperCase()));
  
      if(!isAuth) return <Box justifyContent="center"><Typography variant="h4">{t("not_authorized")}</Typography></Box> 
      return (
    <div>
       <Box>
        <Box display="flex" justifyContent="space-between">
          <Box>
          <Typography align="start" variant="h5" sx={{ my: 4, fontSize: 16, fontWeight: 'bold', color: '#F2C12E' }}>
          Permissions 
          
        </Typography>
        <Typography variant='h6'>{getRoleName(id)} role</Typography>
          </Box>

          <Button  onClick={()=>setopen(true)} sx={{backgroundColor:"#139950",height:50,px:2,fontSize:11,color:"white"}}><AddIcon/>{t("add_new_permission")}</Button>
          </Box>
   <Stack   direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap' ,padding:2 }}> {newRolePermissions.map(role=>(
    <Item  key={role.id} sx={{ width: 'calc(20% - 8px)'  ,marginBottom:"12px"}}>{getPermissionName(role.permission)} <Button onClick={()=>handleOpenDeleteModel(role.permission)} ><ClearRoundedIcon sx={{color:"red"}}/></Button></Item>

))}</Stack>
         
          </Box>
         {setOpenDelete && <DeleteModal  open={OpenDelete} id={id} idPermission={idPermission} handleClose={handleCloseDeleteModel}/>} 
          {open && <AddPermission id={id}  handleClose={handleClose} getRoleName={getRoleName} permissions={permissions} rolePermissions={rolePermissions}/>}
     
    </div>
  );
}

export default RolePermissions;
