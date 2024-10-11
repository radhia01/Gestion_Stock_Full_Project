import React from 'react'
import {Box,Button,Typography,Modal,Divider,TextField,IconButton} from "@mui/material"
import { useTranslation } from 'react-i18next'
import  {useSelector,useDispatch} from 'react-redux'
import { useEffect,useState } from 'react'
import { toast } from 'react-toastify'
import BallotIcon from '@mui/icons-material/Ballot';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { useOutletContext } from 'react-router-dom'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
 import AddEditRole from './AddEditRole'
import { resetResponse ,resetError} from '../../redux/reducers/category'
import { getAllRoles ,deleteRole} from '../../redux/actions/role'
import { useNavigate } from 'react-router-dom'
import usePermissions from '../../hooks/usePermissions'
// delete Modal 
export const DeleteModal=({handleClose,selectedRole,openDelete})=>{
  const dispatch=useDispatch()
  const {t}=useTranslation()
  const isAuth=usePermissions(["delete_role"])
  const {error,response}=useSelector(state=>state.category)
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
    const handleDeleteRole=()=>{
     
        dispatch(deleteRole(selectedRole))
        handleClose();

      }
       
      useEffect(() => {
        dispatch(resetResponse())
        dispatch(resetError())
      }, [dispatch])
      
      useEffect(() => {
        if(error){
          return toast.error(error)
        }
      }, [error])
      useEffect(() => {
        if(response && response==="delete"){
          toast.success(t("success_delete_category"))
        }
      }, [response])
      if(!isAuth) return (
        <Modal
      open={openDelete}
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
      open={openDelete}
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
            handleDeleteRole();
            handleClose()
          }}>{t("yes")}</Button>
          <Button variant="contained" sx={{margin:2,backgroundColor:"red"}} onClick={handleClose}>{t("no")}</Button>
        </Box>
      </Box>
    </Modal>
   
  </div>
  )
}

function Roles() {
  const [open,setOpen]=React.useState(false)
  const [openDelete, setopenDelete] = useState(false)
  const { searchItem,setproductId } = useOutletContext();
  const [selectedRole, setselectedRole] = useState(null)
  const isAuth=usePermissions(["view_roles"])
const {users}=useSelector(state=>state.user)
const navigate=useNavigate()
  const handleClose=()=>{
    setOpen(false)
  }
  const handleCloseDeleteModel=()=>{
    setopenDelete(false)
    
  }
  const handleOpenEditModel=(id)=>{
    setOpen(true)
    setselectedRole(id)
  }
  const handleOpenAddModel=()=>{
    setOpen(true);
    setselectedRole(null)
  }
   const handleOpenDeleteModal=(id)=>{
    setselectedRole(id)
    setopenDelete(true)
   }
   const handleOpenPermissionsModal=(id)=>{
    setselectedRole(id)
    setopenDelete(true)
   }
   
   
  const {t}=useTranslation()
  const dispatch=useDispatch()
  const {roles}=useSelector(state=>state.role)
  console.log(roles)
  console.log(users)
  useEffect(() => {
   dispatch(getAllRoles())
  }, [])
  const newRoles=roles && roles.filter(role=>role.name.toUpperCase().includes(searchItem.toUpperCase()));

    const columns=[
      { field: 'id', headerName: "id", width: 300 },
      {field:"name",headerName:t("name"),editable:true,width:300},
      {
        field: 'action',
        headerName: "Action",
        width: 300,
        renderCell:(params)=>{
          return (
            <Box display="flex" sx={{justifyContent:"start",alignItems:"center",marginTop:2}}>
               <IconButton color="error"  onClick={()=>handleOpenDeleteModal(params.id)} sx={{width:30, padding:2,
            height:30,
              "&:hover":{
            color:"white",
            backgroundColor:"red"
          }}}>
          <DeleteOutlineRoundedIcon  />
        </IconButton>
            
          <IconButton 
          onClick={()=>handleOpenEditModel(params.id)} sx={{
            width:30,
            height:30,
            color:"black",
            "&:hover":{
              color:"white",
              backgroundColor:"#159A9C"
            }}}>
            < BorderColorRoundedIcon/>
          </IconButton>
          
          <IconButton 
          onClick={()=>navigate(`/role/permissions/${params.id}`)} 
          sx={{
            width:30,
            height:30,
            color:"black",
            "&:hover":{
              color:"white",
              backgroundColor:"black"
            }}}>
            < BallotIcon/>
          </IconButton>
  
            </Box>
            
          )
        }
    
      }
    ]
    if(!isAuth) return <Box justifyContent="center"><Typography variant="h4">{t("not_authorized")}</Typography></Box> 
  return (
    <div><Box sx={{display:"flex",justifyContent:"space-between"}}>
    <Typography align="start" variant="h5" sx={{my:4,fontSize:22,fontWeight:"bold",color:"#F2C12E"}}>Roles </Typography>
    <Button onClick={handleOpenAddModel}  sx={{backgroundColor:"#139950",height:50,px:5,fontSize:11,color:"white"}} ><AddIcon/>{t("add_new_role")}</Button>
    </Box>
    <Box  >
    <DataGrid 
     rowHeight={70}
    sx={{width:"100%",backgroundColor:"white"}}
    columns={columns}
    rows={newRoles}
    >


    </DataGrid>
    {open && <AddEditRole handleClose={handleClose} selectedRole={selectedRole} open={open}/> }
    {openDelete && <DeleteModal handleClose={handleCloseDeleteModel} openDelete={openDelete} selectedRole={selectedRole}/> }
    </Box>
      
    </div>
  )
}

export default Roles