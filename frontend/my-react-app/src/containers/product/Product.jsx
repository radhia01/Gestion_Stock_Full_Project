import { Button, Typography ,Divider,ImageListItem,ImageList} from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import { TextField} from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getAllCategories } from '../../redux/actions/category';
import { getAllImages } from '../../redux/actions/image';
import {getAllBrands} from "../../redux/actions/brand"
import {toast} from "react-toastify"
import { useTranslation } from 'react-i18next';
import {useOutletContext} from "react-router-dom"
import axiosInstance from '../../axios/axios';
import {useMemo} from "react"
import dayjs from 'dayjs';
import usePermissions from '../../hooks/usePermissions';
import { useNavigate } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { resetError, resetResponse } from '../../redux/reducers/product';

function Product() {
  const dispatch = useDispatch()
  const isAuthorised=usePermissions(["add_product","edit_product"])
  const navigate=useNavigate()
  const {productId } = useOutletContext();
  const {images}=useSelector(state=>state.image)
  const { categories } = useSelector(state => state.category)
  const { brands } = useSelector(state => state.brand)
   const {error,response}=useSelector(state=>state.product)
   const [value, setValue] = React.useState(dayjs('2024-01-01'));
   const [manufacturedDate, setmanufacturedDate] = React.useState(dayjs('2024-01-01'));
  const [files, setfiles] = useState([])
  const [product, setProduct] = useState({
    name: "", description: "", price: "", quantity: "", id_category: "",id_brand:"",expired_date:"",expiry_quantity:"",created_on:""
  })
  const productItem=useSelector(state=>productId?state.product.products.find(product=>product.id===productId):null)
  const handleFiles=(e)=>{
  setfiles([...e.target.files])
  }
  useEffect(() => {
   if(productId){
    setProduct(productItem)
    setValue(dayjs(productItem.expired_date)); 
    setmanufacturedDate(dayjs(productItem.created_on)); 
   }
  }, [productId])
  const {t}=useTranslation()
  const ProductImages=useMemo(()=>{
    return productId?images.filter(image=>image.id_product===productId):null
       },[productId,images])
    
  const handleChange = (e) => {
        setProduct({
          ...product,
          [e.target.name]: e.target.value
        })
      }
      const handleDateChange = (newValue) => {
        setValue(newValue);
        setProduct(prev => ({
          ...prev,
          expired_date: newValue.toISOString(), // Mise à jour de la date d'expiration
        }));
      };
      
      const handleManufacturedDate = (newDate) => {
        setmanufacturedDate(newDate);
        setProduct(prev => ({
          ...prev,
          created_on: newDate.toISOString(), // Mise à jour de la date de création
        }));
      };
    const handleSubmitProduct = async (e) => {
        e.preventDefault();
        const form = new FormData();
        files.forEach((file) => {
          form.append("image", file);
        });
        console.log(product)
        const productData={...product,
          quantity:parseInt(product.quantity,10),
          expiry_quantity:parseInt(product.expiry_quantity,10)
        }
          if (productId) {
          
            const response = await axiosInstance.put(`/api/products/${productId}`, productData);
            const id = response.data.product.id;
            await axiosInstance.put(`/api/images/products/${id}`, form, {
              headers: { "Content-Type": "multipart/form-data" }
            });
            navigate("/products")
      } 
      else  {
        
        const response = await axiosInstance.post("/api/products", productData);
        const id = response.data.product.id;
        await axiosInstance.post(`/api/images/products/${id}`, form, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        
        setProduct({
          name: "",
          description: "",
          price: "",
          quantity: "",
          id_category: ""
        });
        
      }
      navigate("/products")
    
        
        }
    
         // use Effect 
  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllImages())
    dispatch(getAllBrands())
  }, [dispatch])


  
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
      if(response && response==="update"){
        toast.success(t("success_update_product"))
      }
      else if(response && response==="add"){
        toast.success(t("success_add_product"))
      }
     }, [response])
     
     if(!isAuthorised){
         return <h1>{t("not_authorized")}</h1>
     }
  return (
    <div>
      <Typography align='left' sx={{my:2,fontSize:16,fontWeight:"bold",color:"#F2C12E"}}>{productId?t("update_product"):t("add_new_product")}</Typography>
          <Box sx={{ display: "flex", flexDirection: "column" ,backgroundColor:"white",maxHeight:"550px",overflowY:"auto"}}>
           <Box sx={{padding:3,display:"flex"}}><InfoIcon/><Typography >{t("product_info")}</Typography></Box> 
          <Divider/>
        
          
            <Box display="flex">
            <TextField
              id="outlined-basic"
              label={t("product_name")}
              variant="outlined"
              name="name"
              fullWidth
              required
              value={product.name}
              sx={{ margin: 2 ,height:"50%"}}
            size="small"
              onChange={handleChange}
            />
            
             <TextField
              id="outlined-basic"
              fullWidth
              label={t("Product Price")}
              variant="outlined"
              name="price"
              required
              value={product.price}
              sx={{ margin: 2 }}
                size="small"
              onChange={handleChange}
            />
             <TextField
              id="outlined"
              label={t("Product Quantity")}
              variant="outlined"
              name="quantity"
              fullWidth
              required
              value={product.quantity}
              type="number"
              sx={{ margin: 2 }}
              size="small"
              onChange={handleChange}
            />
             <TextField
              id="outlined-basic"
              fullWidth
              label={t("quantity_alert")}
              variant="outlined"
              name="expiry_quantity"
              required
              value={product.expiry_quantity}
              sx={{ margin: 2 }}
                size="small"
              onChange={handleChange}
            />
              
            </Box>
            
            <Box display="flex">
            <FormControl sx={{width:"100%", margin: 2 }}>
              <InputLabel id="category-select-label">{t("category")}</InputLabel>
              <Select
                id="category-select"
                label={t("category")}
                name="id_category"
                value={product.id_category}
                onChange={handleChange}
              >
                {categories && categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{width:"100%", margin: 2 }}>
              <InputLabel id="category-select-label">{t("brand")}</InputLabel>
              <Select
                id="category-select"
                label={t("brand")}
                name="id_brand"
                value={product.id_brand}
                onChange={handleChange}
              >
                {brands && brands.map(brand => (
                  <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
           
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer   sx={{width:"100%",m:1}}components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label={t("expire_on")}
          value={value}
          onChange={(newValue) => handleDateChange(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer   sx={{width:"100%",m:1}}components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label={t("naufactured_on")}
          value={manufacturedDate}
          onChange={(newValue) => handleManufacturedDate(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
    
            </Box>
          
      <Box>
      <TextField
              id="outlined-basic"
              label={t("Product Description")}
              variant="outlined"
              defaultValue={product.description}
              name="description"
              sx={{ margin: 2,width:"50%" }}
              multiline
              required
              rows={4}
              
              onChange={handleChange}
            />
      </Box>

         
          
     

         
         

      <Box sx={{display:"flex",padding:2}} ><InfoIcon/><Typography >Images</Typography>
       
            </Box> 
            <Divider/>
            < input  type="file" id="image" multiple  style={{display:"none"}} onChange={handleFiles}/>
            <Box  display="flex" sx={{margin:2 ,justifyContent:"space-between"}}>
        
              <Button  variant="outlined"sx={{height:100}} onClick={()=>document.getElementById("image").click()}>Add Images </Button>
             
              <Box  >
           
      
           <ImageList sx={{ width: 700, height: 200 }} cols={3} rowHeight={100}>
      {ProductImages && ProductImages.map((image) => (
        <ImageListItem key={image.img}>
          <img
            srcSet={`${image.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${image.url}?w=164&h=164&fit=crop&auto=format`}
            loading="lazy"
          />
        </ImageListItem>

      ))}
      {files && files.map((file,index)=>(
               <ImageListItem key={index}>
                 <img 
              
             style={{margin:2}}
             src={URL.createObjectURL(file)}
             width="100"
             height="100"
               alt="image"/>
               </ImageListItem> 
             
            
           ))}
    </ImageList>
 
            </Box>
           </Box>
            <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
              <Button   sx={{margin:1,color:"white",backgroundColor:"green"}}variant="outlined" type="submit" onClick={handleSubmitProduct}>{productId ? t("update"):t("add")}</Button>
              <Button   variant="outlined" type="submit"  sx={{backgroundColor:"#B4BEC9",color:"white",margin:1,borderColor:"#B4BEC9"}}>{t("cancel")}</Button>
            </Box>
          </Box>
        
    
    </div>
  )
}

export default Product
