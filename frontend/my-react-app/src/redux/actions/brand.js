import axiosInstance from "../../axios/axios"
import { createAsyncThunk} from "@reduxjs/toolkit"
// add new brand 
export const addBrand=createAsyncThunk("brands/AddBrand",async(name,thunkAPI)=>{
   try{
      const response=await axiosInstance.post("/api/brands",name)
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// get all brands 

export const getAllBrands=createAsyncThunk("brands/getAllBrands",async(_,thunkAPI)=>{
   try{
      const response=await axiosInstance.get("/api/brands")
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// delete a brand 

export const deleteBrand=createAsyncThunk("brands/deleteBrand",async(id,thunkAPI)=>{
   console.log(id)
   try{
      const response=await axiosInstance.delete(`/api/brands/${id}`)
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// update a brand 

export const updateBrand=createAsyncThunk("brands/updateBrand",async(data,thunkAPI)=>{
   const {name,id}=data
   try{
      const response=await axiosInstance.put(`/api/brands/${id}`,{name})
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );