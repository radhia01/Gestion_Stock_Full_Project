import axiosInstance from "../../axios/axios"
import { createAsyncThunk} from "@reduxjs/toolkit"
export const getAllSubCategories=createAsyncThunk("categories/getCategories",async(_,thunkAPI)=>{
   try{
      const response=await axiosInstance.get("/api/subcategories")
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// add new category
export const addSubCategory=createAsyncThunk("subcategories/addsubCategory",async(data,thunkAPI)=>{
   const {name,id_category}=data
   try{

      const response=await axiosInstance.post(`/api/subcategories/categories/${id_category}`,{name})
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// // delete category
// export const deleteCategory=createAsyncThunk("categories/deleteCategory",async(id,thunkAPI)=>{
//    try{
//       const response=await axiosInstance.delete(`/api/categories/${id}`)
//      return response.data
//    }
//    catch(error){
//       return  thunkAPI.rejectWithValue(error.response.data.code)


//    }
// } );
// // update category
// export const updateCategory=createAsyncThunk("categories/updateCategory",async(data,thunkAPI)=>{
//    const {name,id}=data
//    try{
//       const response=await axiosInstance.put(`/api/categories/${id}`,{name})
//      return response.data
//    }
//    catch(error){
//       return  thunkAPI.rejectWithValue(error.response.data.code)


//    }
// } );