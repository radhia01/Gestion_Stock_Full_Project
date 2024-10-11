import * as React from 'react';
import {Typography,Box} from "@mui/material"
import { useParams } from 'react-router-dom';
import { getAllProducts } from '../../redux/actions/products';
import { useEffect } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getAllCategories } from '../../redux/actions/category';
import { getAllImages } from '../../redux/actions/image';
import { getAllBrands } from '../../redux/actions/brand';
import usePermissions from '../../hooks/usePermissions';
function ProductDetails() {
  const {t}=useTranslation()
  const isAuth=usePermissions((["view_product"]))
   const {products}=useSelector(state=>state.product)
   const {categories}=useSelector(state=>state.category)
   const {images}=useSelector(state=>state.image)
   const {brands}=useSelector(state=>state.brand)
   const [productImages, setproductImages] = React.useState([])
const {id}=useParams()
    const dispatch=useDispatch()
  useEffect(() => {
     dispatch(getAllProducts())
     dispatch(getAllCategories())
     dispatch(getAllImages())
     dispatch(getAllBrands())
  }, [dispatch])
  const getCategoryName=(id)=>{
    const category=categories && categories.find(category=>category.id===id)
    return category.name
   
  }
  const getBrandName=(id)=>{
    const brand=brands && brands.find(brand=>brand.id===id)
    return brand.name
   
  }
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };
  useEffect(() => {
    const getImagesByProduct=(idProduct)=>{
       const productimg=images && images.filter(image=>image.id_product===idProduct)
    
       setproductImages(productimg[0])
    }
    
    getImagesByProduct(id)
     
  }, [])
  
  
    const product=products && products.find(product=>product.id===id)
    if(!isAuth){
         return <Box justifyContent="center"><Typography variant="h4">{t("not_authorized")}</Typography></Box>
    }
    return (
      <Box>
            <Typography align='start' sx={{my:4,fontSize:16,fontWeight:"bold"}}>{t("product_details")}</Typography>
            <Box display="flex" justifyContent="space-between"  >
              <table style={{width:"50%", height:"100%",backgroundColor:"white",border:"1px solid #B4BEC9"}}>
        
        <tr style={{height:50}}>
          <th>{t("product_name")}</th>
          <td>{product.name}</td>
         
        </tr>
        <tr style={{height:50}}>
          <th>{t("Product_Description")}</th>
          <td>{product.description}</td>
        </tr>
        <tr  style={{height:50}}>
          <th>{t("Product_Price")}</th>
          <td>{ formatPrice(product.price)}</td>
        </tr>
        <tr  style={{height:50}}>
          <th>{t("Product_Quantity")}</th>
          <td>{product.quantity}</td>
        </tr>
        <tr  style={{height:50}}>
          <th>{t("category")}</th>
          <td>{getCategoryName(product.id_category)}</td>
        </tr>
        <tr  style={{height:50}}>
          <th>{t("brand")}</th>
          <td>{getBrandName(product.id_brand)}</td>
        </tr>
    </table>
   <div>
   {productImages && 
        <img  height="350" width="350" src={productImages.url} />}</div> 
            </Box>
       </Box>
    );
  
}

export default ProductDetails
