import React from 'react'
import {Box,Button,Typography,Modal,Divider,TextField,IconButton} from "@mui/material"
import { useTranslation } from 'react-i18next'
import  {useSelector,useDispatch} from 'react-redux'
import { useEffect,useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify'
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import { resetResponse ,resetError} from '../../redux/reducers/brand'
import {getAllUsers,deleteUser} from "../../redux/actions/user"
import { getAllRoles } from '../../redux/actions/role'
import AddEditUser from './AddEditUser'
import usePermissions from '../../hooks/usePermissions'
// delet frm e Modal 
export const DeleteModal=({handleClose,selectedBrandId,openDelete,selectedUser})=>{
  const dispatch=useDispatch()
  const isAuth=usePermissions(["delete_user"])
  const {t}=useTranslation()
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
    const handleDeleteUser=()=>{
        dispatch(deleteUser(selectedUser))
        handleClose();

      }
       

  if(!isAuth) return    <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    
  
    <Box display="flex" justifyContent="center" sx={{padding:20}}> <Typography variant="h4">{t("not_authorized")}</Typography></Box>
  </Box>
</Modal>
     
      
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
            handleDeleteUser();
            handleClose()
          }}>{t("yes")}</Button>
          <Button variant="contained" sx={{margin:2,backgroundColor:"red"}} onClick={handleClose}>{t("no")}</Button>
        </Box>
      </Box>
    </Modal>
   
  </div>
  )
}

function Users() {
  const [open,setOpen]=React.useState(false)
  const { searchItem } = useOutletContext();

  const [openDelete, setopenDelete] = useState(false)
  const [selectedUser, setselectedUser] = useState(null)
  const {users,error}=useSelector(state=>state.user)
  const [userId, setuserId] = useState(null)
  const isAuth=usePermissions(["view_users"])
  const {t}=useTranslation()
  const dispatch=useDispatch()
   const {roles}=useSelector(state=>state.role)
  const handleClose=()=>{
    setOpen(false)
  }
  const handleCloseDeleteModel=()=>{
    setopenDelete(false)
    
  }
  const handleOpenEditModel=(id)=>{
    setOpen(true)
    setuserId(id)
  }
  const handleOpenAddModel=()=>{
    setOpen(true);
    setuserId(null)
  }
   const handleOpenDeleteModal=(id)=>{
    setselectedUser(id)
    setopenDelete(true)
    
   }
   const getFullName = (id) => {
    const user = users ? users.find(user => user.id === id) : null;
    return user ? `${user.firstName} ${user.lastName}` : 'Utilisateur non trouvé';
};

const getUserImage = (id) => {
    const user = users ? users.find(user => user.id === id) : null;
    return user ? user.image_url : 'URL d\'image non trouvée';
};
  const getUserRole=(id)=>{
     const role=roles && roles.find(role=>role.id===id);
     return role? role.name :null;
  }
  const filteredUsers=users && users.filter(user=>getUserRole(user.id_role)==="customer" || getUserRole(user.id_role)==="supplier" && user.firstName.toUpperCase().includes(searchItem.toUpperCase()))
  console.log(searchItem)
  useEffect(() => {
   dispatch(getAllUsers())
   dispatch(getAllRoles())
  }, [])
  useEffect(() => {
    dispatch(resetResponse())
    dispatch(resetError())
  }, [dispatch])
 
  
    const columns=[
     
      {field:"userName",headerName:t("userName"),editable:true,width:200,
        renderCell:(params)=>{
          return <>  
           <div>
            {params.row ? (
                <div style={{ display: "flex" }}>
                    <img width="60" height="55" style={{ marginTop: 7, marginRight: 3 }} src={getUserImage(params.row.id)} />
                    <span>{getFullName(params.row.id)}</span>
                </div>
            ) : (
                <span>Aucun utilisateur trouvé</span>
            )}
        </div>
          </>
        }
      },
      {field:"id_role",headerName:t("role"),editable:true,width:200,
        renderCell:(params)=>{
          return <span>{getUserRole(params.row.id_role)}</span>
        }
      },
      {field:"email",headerName:t("email"),editable:true,width:300},
      {field:"phone",headerName:t("phone"),editable:true,width:150},
      {
        field: 'action',
        headerName: "Action",
        width: 200,
        renderCell:(params)=>{
          return (
            <Box display="flex" sx={{justifyContent:"start",alignItems:"center",marginTop:3}}>
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
          
          
  
            </Box>
            
          )
        }
    
      }
    ]
   
     if(!isAuth) return <Box justifyContent="center"><Typography variant="h4">{t("not_authorized")}</Typography></Box>
  return (
    <div>
   
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
       <Typography align="start" variant="h5" sx={{my:4,fontSize:22,fontWeight:"bold",color:"#F2C12E"}}>{t("users_list")} </Typography>
       <Button onClick={handleOpenAddModel}  sx={{backgroundColor:"#139950",height:50,px:5,fontSize:11,color:"white"}} ><AddIcon/>{t("add_new_user")}</Button>
       </Box>
       <Box  >
       <DataGrid 
        rowHeight={85}
       sx={{width:"95%",backgroundColor:"white"}}
       columns={columns}
       rows={ filteredUsers}
       >


       </DataGrid>
       {openDelete && <DeleteModal handleClose={handleCloseDeleteModel} openDelete={openDelete} selectedUser={selectedUser}/> }
       </Box>
       {open && <AddEditUser onClose={handleClose} userId={userId} open={open}/>}
     
    </div>
  )
}

export default Users