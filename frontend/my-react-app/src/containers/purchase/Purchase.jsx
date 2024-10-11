import React from 'react'
import { Box,Typography,Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { DataGrid } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add';
import AddPurchase from './AddPurchase';
import { useState } from 'react';
function Purchase() {
    const {t}=useTranslation()
    const [open, setopen] = useState(false)
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose=()=>{
      setopen(false)
    }
    const columns=[
        { field: 'id', headerName: t("supplier_name"), width: 300 },
        {field:"name",headerName:"Date",width:300},
        {field:"name",headerName:"Status",width:300},
        {field:"name",headerName:"Total",width:300},
        {field:"name",headerName:t("paid"),width:300},
        {field:"name",headerName:t("payment_status"),width:300},
    ]
  return (
    <div>
         <Box sx={{display:"flex",justifyContent:"space-between"}}>
       <Typography align="start" variant="h5" sx={{my:4,fontSize:16,fontWeight:"bold",color:"#F2C12E"}}>{t("purchase_list")} </Typography>
       <Button onClick={()=>setopen(true)}  sx={{backgroundColor:"#139950",height:50,px:5,fontSize:11,color:"white"}} ><AddIcon/>{t("add_purchase")}</Button>
       </Box>
       <Box  >
        
       {/* <DataGrid 
        rowHeight={70}
       sx={{width:"100%",backgroundColor:"white"}}
       columns={columns}
       rows={}
       >
        </DataGrid> */}
          </Box>
       <AddPurchase open={open} onClose={handleClose} />
    </div>
  )
}

export default Purchase