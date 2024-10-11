import axiosInstance from "../../axios/axios"
import { createAsyncThunk} from "@reduxjs/toolkit"
export const getAllPermissions=createAsyncThunk("permissions/getpermissions",async(_,thunkAPI)=>{
   try{
      const response=await axiosInstance.get("/api/permissions")
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// add new permission
export const addPermission=createAsyncThunk("permissions/addPermission",async(data,thunkAPI)=>{
   try{
      const response=await axiosInstance.post("/api/permissions",data)
     return response.data
   }
   catch(error){
      error.response.data.code
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// delete permission
export const deletePermission=createAsyncThunk("permissions/deletePermission",async(id,thunkAPI)=>{
   try{
      const response=await axiosInstance.delete(`/api/permissions/${id}`)
     return response.data
   }
   catch(error){
      console.log(error.response.data.code)
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// update permission
export const updatePermission=createAsyncThunk("permissions/updatePermission",async(data,thunkAPI)=>{
   const {name,id}=data
   try{
      const response=await axiosInstance.put(`/api/permissions/${id}`,{name})
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );