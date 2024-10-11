import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import { deleteProduct, getAllProducts } from '../../redux/actions/products';
import {useDispatch,useSelector} from "react-redux"
import { useOutletContext } from 'react-router-dom';
import {useEffect } from 'react';
import { getAllCategories } from '../../redux/actions/category';
import usePermissions from '../../hooks/usePermissions';
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
import { getAllImages } from '../../redux/actions/image';
import { useMemo } from 'react';
import { resetError, resetResponse } from '../../redux/reducers/product';
export const DeleteModal=({open,handleClose,selectedProductId})=>{
  const dispatch=useDispatch()
   const {t}=useTranslation()
    const isAuth=usePermissions(["delete_product"])
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
    if(!isAuth)
      return   <Modal
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
export default function Products() {
  const { searchItem,setproductId } = useOutletContext();
  const [selectedProductId, setSelectedProductId] = React.useState(null);
  const { error,response } = useSelector(state => state.product)
 const isAuth=usePermissions(["view_products"])
  const {images}=useSelector(state=>state.image)
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
    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price);
    };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false)
  const ShowDetails=(id)=>{
    navigate(`/product/${id}`)
  }
  const {products}=useSelector(state=>state.product)
  const {categories}=useSelector(state=>state.category)


  const dispatch=useDispatch()
  useEffect(() => {
   dispatch(getAllProducts())
   dispatch(getAllCategories())
   dispatch(getAllImages())
  }, [])
  
  const getProductImage=(id)=>{
   const image=images && images.find(image=>image.id_product===id)
   return image? image.url:null
  }
  const getProductName=(id)=>{
    const productName=products && products.find(product=>product.id===id)
    
    return productName? productName.name :null
  }
  const getCategoryName=(id)=>{
   console.log(categories)
    const  category= categories && categories.find(element=>element.id===id);
    return category ?  category.name :null
     
  }
  const newProducts = useMemo(() => {
    return products
      ? products
          .map(product => ({
            ...product,
            id_category: getCategoryName(product.id_category)
          }))
          .filter(product =>
            product.name.toUpperCase().includes(searchItem.toUpperCase()) ||
            product.description.toUpperCase().includes(searchItem.toUpperCase())
          )
      : [];
  }, [products, searchItem, categories]);
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
     if(response && response==="delete"){
         toast.success(t("success_delete_product"))
     }
    }, [response])
  const columns = [
    
    {
      field: 'name',
      headerName: t("name"),
      width: 300,
      sortable:true,
      renderCell:(params)=>{
        return   <div style={{display:"flex",alignItems:"center"}}><img  width={50} height={50} style={{marginTop:4,marginRight:5}} src={getProductImage(params.id)}/><span >{getProductName(params.id)}</span></div>}
    },
    {
      field: 'description',
      headerName: t("description"),
      width: 200,
      editable: true,
    },
    {
      field: 'price',
      headerName: t('price'),
      sortable: true,
      width: 120,
      editable:true,
      renderCell:(params)=>{
        return <span>{formatPrice(params.row.price)}</span>
      }
      
      
    },
    
    {
      field: 'quantity',
      headerName: t('quantity'),
      sortable: true,
      width: 110,
      editable:true
      
  
    },
    {
      field: 'id_category',
      headerName: t("category"),
      sortable: false,
      width: 160,
  
    },
    {
      field: 'action',
      headerName: "Action",
      width: 160,
      renderCell:(params)=>{
        return (
          <Box display="flex" sx={{justifyContent:"start",alignItems:"center",marginTop:1}}>
            <IconButton color="error"  onClick={()=>handleOpen(params.id)} sx={{width:30, padding:2,
            height:30,
              "&:hover":{
            color:"white",
            backgroundColor:"red"
          }}}>
          <DeleteOutlineRoundedIcon  />
        </IconButton><IconButton onClick={()=>ShowDetails(params.id)}  sx={{
          width:30, padding:2,
            height:30,
            "&:hover":{
            color:"white",
            backgroundColor:"#002333"
          }}}
          >
          < RemoveRedEyeRoundedIcon/>
        </IconButton>
        <IconButton onClick={()=>updateProduct(params.id)} sx={{
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
  ];
  if(!isAuth)
    return <Box justifyContent="center"><Typography variant="h4">{t("not_authorized")}</Typography></Box>
  
  return (
    <div>
    <Box sx={{display:"flex",justifyContent:"space-between"}}>
    <Typography align="start"  sx={{my:4,fontSize:22,fontWeight:"bold",color:"#F2C12E"}}>{t("products_list")} </Typography>
   
    <Button onClick={()=>{setproductId(null);
      navigate("/add/product")} } sx={{backgroundColor:"#139950",height:50,px:2,fontSize:11,color:"white"}}><AddIcon/>{t("add_new_product")}</Button>
    </Box>
    <Divider/>
     <Box sx={{  marginTop:4 ,display:"flex",justifyContent:"center"}}>
      <DataGrid
      rowHeight={70}
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