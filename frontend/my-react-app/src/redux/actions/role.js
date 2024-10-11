import axiosInstance from "../../axios/axios"
import { createAsyncThunk} from "@reduxjs/toolkit"
// add new Role 
export const addRole=createAsyncThunk("Roles/AddRole",async(name,thunkAPI)=>{
   try{
      const response=await axiosInstance.post("/api/roles",name)
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// get all Roles 

export const getAllRoles=createAsyncThunk("Roles/getAllRoles",async(_,thunkAPI)=>{
   try{
      const response=await axiosInstance.get("/api/roles")
      console.log(response.data)
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// delete a Role 

export const deleteRole=createAsyncThunk("Roles/deleteRole",async(id,thunkAPI)=>{
   console.log(id)
   try{
      const response=await axiosInstance.delete(`/api/roles/${id}`)
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// update a Role 

export const updateRole=createAsyncThunk("Roles/updateRole",async(data,thunkAPI)=>{
   const {name,id}=data
   try{
      const response=await axiosInstance.put(`/api/roles/${id}`,{name})
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// add permission to role 

export const addPermissionToRole=createAsyncThunk("Roles/addPermission",async(data,thunkAPI)=>{
   const {id_role,id_permission}=data
   try{
      const response=await axiosInstance.post(`/api/roles/${id_role}/permissions/${id_permission}`)
      console.log(response.data)
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// get role permissions 
export const getRolePermissions=createAsyncThunk("Roles/getPermissions",async(id,thunkAPI)=>{
  
   try{
      const response=await axiosInstance.get(`/api/roles/${id}/permissions`)
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
export const removeRolePermissions=createAsyncThunk("Roles/removePermissions",async(data,thunkAPI)=>{
  const {id_role,id_permission}=data
   try{
      const response=await axiosInstance.delete(`/api/roles/${id_role}/permissions/${id_permission}`)
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );