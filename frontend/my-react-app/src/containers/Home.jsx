import * as React from 'react';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {getAllRoles} from "../redux/actions/role"
import { useDispatch ,useSelector} from 'react-redux';
import {getAllUsers}from "../redux/actions/user"
import {getAllProducts} from "../redux/actions/products"
import { Typography,Box,Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { getAllCategories } from '../redux/actions/category';
import { getAllImages } from '../redux/actions/image';
import { useMemo } from 'react';
import InventoryIcon from '@mui/icons-material/Inventory';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { BarChart } from '@mui/x-charts/BarChart';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body3,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A3037',
  }),
})); 





export default function Home() {
  const {t}=useTranslation();

  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getAllRoles())
    dispatch(getAllUsers())
    dispatch(getAllProducts())
    dispatch(getAllCategories())
    dispatch(getAllImages())
  
   }, [dispatch])
   
   const { roles, users, products, categories, images } = useSelector(state => ({
    roles: state.role.roles,
    users: state.user.users,
    products: state.product.products,
    categories: state.category.categories,
    images: state.image.images,
  }));
  const currentDate=new Date()
    const getSupplierNumber=()=>{
      const role=roles && roles.find(role=>role.name==="supplier")
      const supplierNumbers=role && users && users.filter(user=>user.id_role===role.id)
      return supplierNumbers ? supplierNumbers.length:null
    }
    const getCustomerNumber=()=>{
      const role=roles && roles.find(role=>role.name==="customer")
      const supplierNumbers=role && users && users.filter(user=>user.id_role===role.id)
      return supplierNumbers ? supplierNumbers.length:null
    }
    const getCategoryName=(id)=>{
  
      const  category= categories && categories.find(element=>element.id===id);
      return category ?  category.name :null
       
    }
    const getProductName=(id)=>{
      const productName=products && products.find(product=>product.id===id)
      
      return productName? productName.name :null
    }
    const getProductImage=(id)=>{
      const image=images && images.find(image=>image.id_product===id)
      return image? image.url:null
     }
   const newProducts = useMemo(() => {
     return products
       ? products
           .map(product => ({
             ...product,
             id_category: getCategoryName(product.id_category)
           }))
       : [];
   }, [products, categories]);
   const columns = [
    
     {
       field: 'name',
       headerName: t("name"),
       width: 240,
       sortable:true,
       renderCell:(params)=>{
         return   <div style={{display:"flex",alignItems:"center"}}><img  width={50} height={50} style={{marginTop:4,marginRight:5}} src={getProductImage(params.id)}/><span >{getProductName(params.id)}</span></div>}
     },
  
     
     {
       field: 'quantity',
       headerName: t('quantity'),
       sortable: true,
       width: 250,
       editable:true
       
   
     },
     
    
     
   ];
   const iconData = [
    { icon: PersonIcon, label: "suppliers", color: "#F2C12E" ,fnt:getSupplierNumber()},
    { icon: PersonIcon, label: "customers", color: "#1C93FF" ,fnt:getCustomerNumber()},
    { icon: DescriptionIcon, label: "purchase_invoices", color: "#981CFF",fnt:getSupplierNumber() },
    { icon: DescriptionIcon, label: "sales_invoices", color: "#194FE8" ,fnt:getSupplierNumber()},
  ];

const len=Math.ceil(newProducts.length/3);
const recentProducts=newProducts && newProducts.slice(0,len)
const outOfStock=products && products.filter(product=>product.quantity===0)
let totalQuantityInStock=0;
products && products.filter(product=>product.quantity!==0).map(product=>
  totalQuantityInStock=totalQuantityInStock+product.quantity
)

const categoryData = useMemo(() => {
  return categories?.map(category => {
    const count = products?.filter(product => product.id_category === category.id).length;
    return { id: category.id, value: count, label: category.name };
  }) || [];
}, [categories, products]);

const data=categories && categories.map(category=>{

  return category.name
})
const values=categories && categories.map(category=>{
  const categoryProducts=products && products.filter(product=>product.id_category===category.id)
   const values=categoryProducts.reduce((prev,current)=>{return prev+current.quantity},0)
  return  values
})
 const productsExpiringSoon=newProducts && newProducts.filter(product=> {

  const expiredDate= new Date(product.expired_date);
  const expiredThreshold=new Date(currentDate.setDate(currentDate.getDate()+10))
  return expiredDate > currentDate && expiredDate <= expiredThreshold;


 })
 const palette = ['lightcoral', 'slateblue'];
  return (
    <div >
      <Box component="section">
      <Stack direction="row" spacing={3}>
        {iconData.map((item,index)=>{
          const Icon=item.icon
          return (<Item key={index} sx={{padding:3 ,width:290,display:"flex", backgroundColor:item.color, color:"white",justifyContent:"space-between"}}>
            <Box sx={{  display: "flex",flexDirection:"column"}}>
            <Box ><Typography variant="h5">{item.fnt}</Typography></Box>
           <Box><Typography> {t(item.label) }</Typography></Box></Box>
           <Box><Icon sx={{fontSize:60}}/></Box> </Item>)
            
          

        })}
      
      </Stack>
      <Stack direction="row" spacing={3} sx={{marginTop:5}}>
    <Item sx={{padding:3 ,width:290,display:"flex", backgroundColor:"white", color:"black",justifyContent:"space-between",border:"1px solid #D9D9D9"}}>
        <Box><DoDisturbOnIcon sx={{fontSize:50,marginTop:1}}/></Box><Box sx={{  display: "flex",flexDirection:"column"}}>
      
        <Box ><Typography variant="h5">{outOfStock && outOfStock.length}</Typography></Box>
       <Box><Typography sx={{color:"#8C8C8C" ,fontSize:15}}> {t("out_of_stock") }</Typography></Box>
       
       </Box> 
       </Item>
       <Item sx={{padding:3 ,width:290,display:"flex", backgroundColor:"white", color:"black",justifyContent:"space-between",border:"1px solid #D9D9D9"}}>
        <Box><InventoryIcon sx={{fontSize:50,marginTop:1}}/></Box><Box sx={{  display: "flex",flexDirection:"column"}}>
      
        <Box ><Typography variant="h5">{totalQuantityInStock}</Typography></Box>
       <Box><Typography sx={{color:"#8C8C8C" ,fontSize:15}}> {t("Total_quantity_in_stock") }</Typography></Box>
       
       </Box> 
       </Item>
       <Item sx={{padding:3 ,width:280,display:"flex", backgroundColor:"white", color:"black",justifyContent:"space-between",border:"1px solid #D9D9D9"}}>
        <Box><MonetizationOnIcon sx={{fontSize:50,marginTop:1}}/></Box><Box sx={{  display: "flex",flexDirection:"column"}}>
      
        <Box ><Typography variant="h5">0</Typography></Box>
       <Box><Typography sx={{color:"#8C8C8C" ,fontSize:15}}> {t("total_purchase_amount") }</Typography></Box>
       </Box> 
       </Item>
       <Item sx={{padding:3 ,width:290,display:"flex", backgroundColor:"white", color:"black",justifyContent:"space-between",border:"1px solid #D9D9D9"}}>
        <Box><MonetizationOnIcon sx={{fontSize:50,marginTop:1}}/></Box><Box sx={{  display: "flex",flexDirection:"column"}}>
      
        <Box ><Typography variant="h5">0</Typography></Box>
       <Box><Typography sx={{color:"#8C8C8C" ,fontSize:15}}> {t("total_sale_amount") }</Typography></Box>
       
       </Box> 
       </Item>
    </Stack>
     
      </Box>
    

      <Box  component="section"  display="flex"  sx={{padding:1,marginTop:10}}>
     
        <Box sx={{backgroundColor:"white",border:"1px solid #D9D9D9",marginRight:2}}>
        <Typography align="start"  sx={{fontSize:17,color:"black",padding:1,fontWeight:"bold"}}>{t("recent_products")} </Typography>

<Box sx={{  marginTop:1 ,width:"100%"}}>

 <DataGrid
 rowHeight={70}
   rows={recentProducts}
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

 />
 
</Box>
        </Box>
   
        <Box sx={{backgroundColor:"white",border:"1px solid #D9D9D9"}}>
        <Typography align="start"  sx={{fontSize:17,color:"black",padding:1,fontWeight:"bold"}}>{t("products_expiring_soon")} </Typography>

<Box sx={{  marginTop:1,width:"100%"}}>

 <DataGrid
 rowHeight={70}
   rows={productsExpiringSoon}
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

 />
 
</Box>
        </Box>
   
   
    </Box>
   
     <Box display="flex"   sx={{marginTop:10}}>
      <Box sx={{ backgroundColor:"white",border:"1px solid #D9D9D9" ,marginRight:10}}>  <Typography align="start"  sx={{fontSize:17,color:"black",padding:1,fontWeight:"bold"}}>{t("products_per_category")} </Typography> <PieChart
      colors={palette}
      
      series={[
        {
          data: categoryData
        },
      ]}
      width={550}
      height={200}
    /></Box>
    
    
    <Box sx={{ backgroundColor:"white",border:"1px solid #D9D9D9"}}>  
      
    <Typography align="start" sx={{fontSize:17,color:"black",padding:1,fontWeight:"bold"}}>{t("total_by_category")} </Typography>
    <BarChart
      xAxis={[{ scaleType: 'band', data: data }]}
      series={[{ data: values}]}
      width={550}
      height={250}
    />
      </Box>
      </Box>
    
    </div>
    
  );
}