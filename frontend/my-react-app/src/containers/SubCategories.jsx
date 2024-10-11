// import React from 'react'
// import {Box,Button,Typography,Modal,Divider,TextField,IconButton} from "@mui/material"
// import { useTranslation } from 'react-i18next'
// import  {useSelector,useDispatch} from 'react-redux'
// import { useMemo } from 'react'
// import { useEffect,useState } from 'react'
// import { toast } from 'react-toastify'
// import AddIcon from '@mui/icons-material/Add';
// import { DataGrid } from '@mui/x-data-grid';
// import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
// import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
//  import AddEditCategory from './AddEditCategory'
// import { resetResponse ,resetError} from '../redux/reducers/category'
// import { addSubCategory,getAllSubCategories } from '../redux/actions/subcategory'
// import { getAllCategories } from '../redux/actions/category'
// import AddEditSubCategory from './AddEditSubCat'
// // delete Modal 
// export const DeleteModal=({handleClose,selectedCategoryId,openDelete})=>{
//   const dispatch=useDispatch()
//   const {t}=useTranslation()
//   const {error,response}=useSelector(state=>state.category)
//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     textAlign:"center",
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 4,
//     fontSize:20
  
//   };
//     // const handleDeleteCategory=()=>{
     
//     //     dispatch(deleteCategory(selectedCategoryId))
//     //     handleClose();

//     //   }
       
//       useEffect(() => {
//         dispatch(resetResponse())
//         dispatch(resetError())
//       }, [dispatch])
      
//       useEffect(() => {
//         if(error){
//           return toast.error(error)
//         }
//       }, [error])
//       useEffect(() => {
//         if(response){
//           if(response==="add"){
//             toast.success(t("success_add_category"))
//           }
//          else if(response==="delete"){
//           toast.success(t("success_delete_category"))
//          }
//         else toast.success(t("success_update_category"))}
//       }, [response])
      
//   return (
//     <div>
  
//     <Modal
//       open={openDelete}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box sx={style}>
//         <Typography id="modal-modal-title"  component="h2">
//       {t("confirm_delete_category")}
//         </Typography>
//         <Divider/>
//         <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
//           <Button variant="contained" sx={{margin:2,backgroundColor:"green"}} onClick={()=>{
//             // handleDeleteCategory();
//             handleClose()
//           }}>{t("yes")}</Button>
//           <Button variant="contained" sx={{margin:2,backgroundColor:"red"}} onClick={handleClose}>{t("no")}</Button>
//         </Box>
//       </Box>
//     </Modal>
//   </div>
//   )
// }

// function SubCategories() {
//   const [open,setOpen]=React.useState(false)
//   const [openDelete, setopenDelete] = useState(false)
//   const [selectedCategoryId, setselectedCategoryId] = useState(null)
//   const handleClose=()=>{
//     setOpen(false)
//   }
//   const handleCloseDeleteModel=()=>{
//     setopenDelete(false)
    
//   }
//   const handleOpenEditModel=(id)=>{
//     setOpen(true)
//     setselectedCategoryId(id)
//   }
//   const handleOpenAddModel=()=>{
//     setOpen(true);
//     setselectedCategoryId(null)
//   }
//    const handleOpenDeleteModal=(id)=>{
//     setselectedCategoryId(id)
//     setopenDelete(true)
//    }
//   const {t}=useTranslation()
//   const dispatch=useDispatch()
//   useEffect(() => {
//     dispatch(getAllSubCategories())
//     dispatch(getAllCategories())
//    }, [dispatch])
//   const {subcategories}=useSelector(state=>state.subcategory)
//   const {categories}=useSelector(state=>state.category)

 
 
//   const getCategoryName=(id)=>{
//     console.log(categories)
//     const  category= categories && categories.find(element=>element.id===id);
//     return category ?  category.name :null
     
//   }
//   const newProducts = useMemo(() => {
//     return subcategories
//       ? subcategories
//           .map(product => ({
//             ...product,
//             id_category: getCategoryName(product.id_category)
//           }))
//       : [];
//   }, [ subcategories]);
  
//     const columns=[
//       { field: 'id', headerName: "id", width: 300 },
//       {field:"name",headerName:t("name"),editable:true,width:300},
//       {field:"id_category",headerName:t("category"),width:300
//       },
//       {
//         field: 'action',
//         headerName: "Action",
//         width: 300,
//         renderCell:(params)=>{
//           return (
//             <Box display="flex" sx={{justifyContent:"start",alignItems:"center",marginTop:1}}>
//                <IconButton color="error"  onClick={()=>handleOpenDeleteModal(params.id)} sx={{width:30, padding:2,
//             height:30,
//               "&:hover":{
//             color:"white",
//             backgroundColor:"red"
//           }}}>
//           <DeleteOutlineRoundedIcon  />
//         </IconButton>
            
//           <IconButton 
//           onClick={()=>handleOpenEditModel(params.id)} sx={{
//             width:30,
//             height:30,
//             color:"black",
//             "&:hover":{
//               color:"white",
//               backgroundColor:"#159A9C"
//             }}}>
//             < BorderColorRoundedIcon/>
//           </IconButton>
          
          
  
//             </Box>
            
//           )
//         }
    
//       }
//     ]
//   return (
//     <div>
//        <Box sx={{display:"flex",justifyContent:"space-between"}}>
//        <Typography align="start" variant="h5" sx={{my:4,fontSize:16,fontWeight:"bold",color:"#F2C12E"}}>{t("SubCategories_list")} </Typography>
//        <Button onClick={handleOpenAddModel}  sx={{backgroundColor:"#139950",height:50,px:5,fontSize:11,color:"white"}} ><AddIcon/>{t("add_new_category")}</Button>
//        </Box>
//        <Box  >
//        <DataGrid 
//        sx={{width:"100%",backgroundColor:"white"}}
//        columns={columns}
//        rows={newProducts}
//        >


//        </DataGrid>
//        {open && <AddEditSubCategory handleClose={handleClose} selectedCategoryId={selectedCategoryId} open={open}/> }
//        {/* {deleteCategory && <DeleteModal handleClose={handleCloseDeleteModel} openDelete={openDelete} selectedCategoryId={selectedCategoryId}/> } */}
//        </Box>
//     </div>
//   )
// }

// export default SubCategories
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import { deleteProduct } from '../redux/actions/products';
import {useDispatch,useSelector} from "react-redux"
import { useOutletContext } from 'react-router-dom';
import {useEffect } from 'react';
import { getAllCategories } from '../redux/actions/category';
import {useTranslation} from "react-i18next"
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import {toast} from 'react-toastify'
import { useMemo } from 'react';
import { resetError, resetResponse } from '../redux/reducers/product';
import { getAllSubCategories } from '../redux/actions/subcategory';
import { useState } from 'react';
export const DeleteModal=({open,handleClose,selectedProductId})=>{
  const dispatch=useDispatch()
   const {t}=useTranslation()

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    textAlign:"center"
  };
    const handleDeleteProduct=()=>{
      dispatch(deleteProduct(selectedProductId))
      
    }
 
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
      {t("confirm_delete_product")}
        </Typography>
        <Divider/>
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Button variant="contained" sx={{margin:2,backgroundColor:"green"}} onClick={()=>{
            handleDeleteProduct();
            handleClose()
          }}>{t("yes")}</Button>
          <Button variant="contained" sx={{margin:2,backgroundColor:"red"}} onClick={handleClose}>{t("no")}</Button>
        </Box>
      </Box>
    </Modal>
  </div>
  )
}
export default function Subcategories() {
  const { searchItem,setproductId } = useOutletContext();
  const [selectedProductId, setSelectedProductId] = React.useState(null);
  const { error,response } = useSelector(state => state.product)
  const {t}=useTranslation()
  const navigate=useNavigate()
  const handleOpen=(id)=>{
    setSelectedProductId(id)
    setOpen(true)
  }
    const updateProduct=(id)=>{
      setproductId(id)
      navigate("/add/product")
    }
 
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false)
  const ShowDetails=(id)=>{
    navigate(`/product/${id}`)
  }
  const columns = [
    { field: 'id', headerName: "id", width: 100 },
    {
      field: 'name',
      headerName: t("name"),
      width: 250,
      sortable:true
    },
    {
      field: 'id_category',
      headerName: t("category"),
      width: 200,
      editable: true,
    },
    
  ];
  
  const {categories}=useSelector(state=>state.category)
  console.log(categories)
  const {subcategories}=useSelector(state=>state.subcategory)
  const dispatch=useDispatch()
  useEffect(() => {
   dispatch(getAllCategories())
   dispatch(getAllSubCategories())
  }, [dispatch])
  const getCategoryName=(id)=>{
    console.log(categories)
    const  category= categories && categories.find(element=>element.id===id);
    return category ?  category.name :null
     
  }
  const newProducts = useMemo(() => {
    return subcategories
      ? subcategories
          .map(subcat => ({
            ...subcat,
            id_category: getCategoryName(subcat.id_category)
          }))
      : [];
  }, [subcategories]);
  const handleUpdate=(params)=>{
    const id=params.id;
    const name=params.name;
    const description=params.description;
    const price=params.price;
    const quantity=params.quantity;
    const data={
      id,
      name,
      description,
      price,
      quantity,

    };
   dispatch(updateProduct(data))
   
       
  }
  useEffect(() => {
   dispatch(resetError())
   dispatch(resetResponse())
  }, [dispatch])
  
  useEffect(() => {
    if(error){
     toast.error(error)
    }
   }, [error])
   useEffect(() => {
     if(response){
        if(response==="add"){
         toast.success(t("success_add_product"))
        }
        else if(response==="delete"){
         toast.success(t("success_delete_product"))
        }
        else {
         toast.success(t("success_update_product"))
        }
     }
    }, [response])
  
  return (
    <div>
    <Box sx={{display:"flex",justifyContent:"space-between"}}>
    <Typography align="start" variant="h5" sx={{my:4,fontSize:16,fontWeight:"bold",color:"#F2C12E"}}>{t("SubCategories_list")} </Typography>
   
    <Button onClick={()=>{setproductId(null);
      navigate("/add/product")} } sx={{backgroundColor:"#139950",height:50,px:2,fontSize:11,color:"white"}}><AddIcon/>{t("add_new_product")}</Button>
    </Box>
    <Divider/>
     <Box sx={{  marginTop:4 ,display:"flex",justifyContent:"center"}}>
      <DataGrid
        rows={newProducts}
        sx={{backgroundColor:"white"}}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        processRowUpdate={handleUpdate}
        onProcessRowUpdateError={error=>{console.log(error)}}
      />
    </Box>
    {open && <DeleteModal open={open} handleClose={handleClose}  selectedProductId={selectedProductId}/>}</div>
   
  );
}