import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {  Typography } from '@mui/material';
import { getAllProducts } from '../../redux/actions/products';
import {useDispatch,useSelector} from "react-redux"
import { useOutletContext } from 'react-router-dom';
import {useEffect } from 'react';
import { getAllCategories } from '../../redux/actions/category';
import usePermissions from '../../hooks/usePermissions';
import {useTranslation} from "react-i18next"
import Divider from '@mui/material/Divider';
import {toast} from 'react-toastify'
import { getAllImages } from '../../redux/actions/image';
import { useMemo } from 'react';
import { resetError, resetResponse } from '../../redux/reducers/product';

export default function ExpiredProducts() {
  const { searchItem,setproductId } = useOutletContext();
  const { error,response } = useSelector(state => state.product)
 const isAuth=usePermissions(["view_expired_products"])
  const {images}=useSelector(state=>state.image)
  const {t}=useTranslation()    
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
    const  category= categories && categories.find(element=>element.id===id);
    return category ?  category.name :null
     
  }
  const currentDate=new Date()
  const newProducts = useMemo(() => {
    return products
      ? products.filter(product=>new Date(product.expired_date)<currentDate)
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
    console.log(newProducts)
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
    const getProductDate=(date)=>{
      
      return date ? date.slice(0,10):null
    }
  const columns = [
    { field: 'id', headerName: "id", width: 260 },
    {
      field: 'name',
      headerName: t("name"),
      width: 300,
      sortable:true,
      renderCell:(params)=>{
        return   <div style={{display:"flex",alignItems:"center"}}><img  width={50} height={50} style={{marginTop:4,marginRight:5}} src={getProductImage(params.id)}/><span >{getProductName(params.id)}</span></div>}
    },
    {
      field: 'created_on',
      headerName: t("manufactured_on"),
      width: 200,
      editable: true,
      renderCell:(params)=>{
        return <span>{getProductDate(params.row.created_on)}</span>
      }
    },
    {
      field: 'expired_date',
      headerName: t("expire_on"),
      width: 200,
      editable: true,
      renderCell:(params)=>{
        return <span>{getProductDate(params.row.expired_date)}</span>
      }
    },
  ];
  if(!isAuth)
    return <Box justifyContent="center"><Typography variant="h4">{t("not_authorized")}</Typography></Box>
  
  return (
    <div>
    <Box sx={{display:"flex",justifyContent:"space-between"}}>
    <Typography align="start"  sx={{my:4,fontSize:22,fontWeight:"bold",color:"#F2C12E"}}>{t("expired_products")} </Typography>
    </Box>
    <Divider/>
     <Box sx={{  marginTop:4 ,display:"flex",justifyContent:"center"}}>
      {newProducts.length!==0 ?   <DataGrid
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
        onProcessRowUpdateError={error=>{console.log(error)}}
      />
      :<Typography>Aucun produit expiré </Typography>}
     
    </Box>
  </div>
   
  );
}