import axiosInstance from "../../axios/axios"
import { createAsyncThunk} from "@reduxjs/toolkit"
export const getAllProducts=createAsyncThunk("products/getProducts",async(_,thunkAPI)=>{
   try{
      const response=await axiosInstance.get("/api/products")
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// delete product 
export const deleteProduct=createAsyncThunk("products/deleteProduct",async(id,thunkAPI)=>{
   try{
      const response=await axiosInstance.delete(`/api/products/${id}`)
     return response.data
   }
   catch(error){
   
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// add new product 
export const addProduct=createAsyncThunk("products/addProduct",async(data,thunkAPI)=>{
   console.log(data)
   try{
      const response=await axiosInstance.post(`/api/products`,data)
     return response.data
   }
   catch(error){
     
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// update product 
export const updateProduct=createAsyncThunk("products/updateProduct",async(data,thunkAPI)=>{
   try{
      const {name,price,description,quantity,id,expired_date,created_on}=data;
      const response=await axiosInstance.put(`/api/products/${id}`,{
         name,
      description,
      price,
      quantity,
      expired_date,
      created_on
      })
     return response.data
   }
   catch(error){
   
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );