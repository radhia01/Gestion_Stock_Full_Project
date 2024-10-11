
import React from 'react';
import {DialogTitle,Dialog,DialogContent,Box,TextField,Select,FormControl,InputLabel,MenuItem, Button} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect,useState } from 'react';
import {useDispatch,useSelector} from "react-redux"
import {getAllProducts} from "../../redux/actions/products"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
function AddPurchase({open,onClose}) {
  const [date, setdate] = useState(dayjs('2022-04-17'));
  const [purchase, setpurchase] = useState({
    order_date:"",id_status:"",id_user:""
  });
  const [quantity, setquantity] = useState("")
  const handleChange=()=>{
    
  }
  const {t}=useTranslation()
  const dispatch=useDispatch()
  useEffect(() => {
     dispatch(getAllProducts())
  }, [])
  const {products}=useSelector(state=>state.product)
  const handleDate=(newValue)=>{
    setdate(newValue);
    setpurchase({...purchase,
    order_date:newValue
       })
    }
  return (
    <div>


<Dialog onClose={onClose} fullWidth maxWidth="lg" open={open}
PaperProps={{
style:{
  position:"absolute",
  top:"15%",
  left:"50%",
  transform: 'translate(-50%, -15%)'
}}}

 
>
      <DialogTitle sx={{ backgroundColor: '#D9D9D9' }}>{t("add_purchase")}</DialogTitle>
      <DialogContent>
        <Box display="flex">
          <TextField
            name="supplier_name"
            label={t("supplier_name")}
            sx={{margin:2}}
            fullWidth
           ></TextField>
          
            <FormControl fullWidth   sx={{margin:2}}>
        <InputLabel id="demo-simple-select-label">Product</InputLabel>
        <Select
      
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
        >
          {products && products.map(product=>{
            return (
              <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
            )
          })}
         
        </Select>
      </FormControl>
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer   fullWidth sx={{width:"100%",m:1}}components={['DatePicker', 'DatePicker']}>
        <DatePicker
        
          label={t("created_on")}
          value={date}
          onChange={(newValue) =>handleDate (newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
        </Box>
        < Box display="flex">
          <TextField name="" fullwidth   sx={{margin:2}} label={t("quantity")}></TextField>
          <TextField name="" fullwidth   sx={{margin:2}} label={t("unit_price")}></TextField>
          <TextField name="" fullwidth   sx={{margin:2}} label="total"></TextField>
          
        </Box>
       
            <Box>
            <TextField
            label={t("add_note")}
            sx={{m:2,width:800}}
            multiline
            rows={5} 
            variant="outlined" 
        />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
              <Button   sx={{margin:1,color:"white",backgroundColor:"green"}}variant="outlined" type="submit" >{t("add")}</Button>
              <Button   variant="outlined" type="submit"  sx={{backgroundColor:"#B4BEC9",color:"white",margin:1,borderColor:"#B4BEC9"}}>{t("cancel")}</Button>
            </Box>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default AddPurchase