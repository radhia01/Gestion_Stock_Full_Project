import React from 'react'
import {Box,Button,Typography,Modal,Divider,IconButton} from "@mui/material"
import { useTranslation } from 'react-i18next'
import  {useSelector,useDispatch} from 'react-redux'
import { deleteBrand } from '../../redux/actions/brand'
import { useEffect,useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify'
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import { resetResponse ,resetError} from '../../redux/reducers/brand'
import AddEditBrand from './AddEditBrand'
import { getAllBrands } from '../../redux/actions/brand'
import usePermissions from '../../hooks/usePermissions'
// delete Modal 
export const DeleteModal=({handleClose,selectedBrandId,openDelete})=>{
  const dispatch=useDispatch()
const isAuth=usePermissions(["delete_brand"])
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
    const handleDeleteBrand=()=>{
        dispatch(deleteBrand(selectedBrandId))
        handleClose();

      }
       

  if(!isAuth) return 
  <Modal
  open={openDelete}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title"  component="h2">
  {t("not_authorized")}
    </Typography>
    <Divider/>
    
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
            handleDeleteBrand();
            handleClose()
          }}>{t("yes")}</Button>
          <Button variant="contained" sx={{margin:2,backgroundColor:"red"}} onClick={handleClose}>{t("no")}</Button>
        </Box>
      </Box>
    </Modal>
    
  </div>
  )
}

function Brands() {
  const [open,setOpen]=React.useState(false)
  const { searchItem,setproductId } = useOutletContext();
  const [openDelete, setopenDelete] = useState(false)
  const [selectedBrandId, setselectedBrandId] = useState(null)
  const isAuthorized=usePermissions(["view_brands"])
  const handleClose=()=>{
    setOpen(false)
  }
  const handleCloseDeleteModel=()=>{
    setopenDelete(false)
    
  }
  const handleOpenEditModel=(id)=>{
    setOpen(true)
    setselectedBrandId(id)
  }
  const handleOpenAddModel=()=>{
    setOpen(true);
    setselectedBrandId(null)
  }
   const handleOpenDeleteModal=(id)=>{
    setselectedBrandId(id)
    setopenDelete(true)
    
   }
  const {t}=useTranslation()
  const dispatch=useDispatch()
  const {brands,error,response}=useSelector(state=>state.brand)
  useEffect(() => {
   dispatch(getAllBrands())
  }, [])
  useEffect(() => {
    dispatch(resetResponse())
    dispatch(resetError())
  }, [dispatch])
  
    const columns=[
      {field:"name",headerName:t("name"),editable:true,width:300},
      {field:"created_on",headerName:t("created_date"),editable:true,width:300,
        renderCell:(params)=>{
          return <span>{getDate(params.row.created_on)}</span>
        }
      },
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
          
          
  
            </Box>
            
          )
        }
    
      }
    ]
    useEffect(() => {
      if(error){
        return toast.error(error)
      }
    }, [error])
    useEffect(() => {
      if(response && response==="delete"){
        toast.success(t("success_delete_brand"))
      }
    }, [response])
    useEffect(() => {
      dispatch(resetError())
      dispatch(resetResponse())
    }, [])

    const getDate=(date)=>{
      const categoryDate=date.slice(0,10)
      return categoryDate? categoryDate :null
    }
      const newBrands=brands && brands.filter(brand=>brand.name.toUpperCase().includes(searchItem.toUpperCase()))
      if(!isAuthorized)
        return <Box justifyContent="center"><Typography variant="h4">{t("not_authorized")}</Typography></Box>
  return (
    <div>
    <Box sx={{display:"flex",justifyContent:"space-between"}}>
       <Typography align="start" variant="h5" sx={{my:4,fontSize:22,fontWeight:"bold",color:"#F2C12E"}}>{t("Brands_list")} </Typography>
       <Button onClick={handleOpenAddModel}  sx={{backgroundColor:"#139950",height:50,px:5,fontSize:11,color:"white"}} ><AddIcon/>{t("add_new_brand")}</Button>
       </Box>
       <Box   sx={{width:"90%"}}>
       <DataGrid 
        rowHeight={70}
       sx={{width:"100%",backgroundColor:"white"}}
       columns={columns}
       rows={newBrands}
       >


       </DataGrid>
       {open && <AddEditBrand handleClose={handleClose} setselectedBrandId={setselectedBrandId}  selectedBrandId={selectedBrandId} open={open}/> }
       {openDelete && <DeleteModal handleClose={handleCloseDeleteModel} openDelete={openDelete} selectedBrandId={selectedBrandId}/> }
       </Box>
      
      
    </div>
  )
}

export default Brands