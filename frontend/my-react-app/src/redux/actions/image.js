import axiosInstance from "../../axios/axios"
import { createAsyncThunk} from "@reduxjs/toolkit"
export const getAllImages=createAsyncThunk("images/getImages",async(_,thunkAPI)=>{
   try{
      const response=await axiosInstance.get("/api/images")
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );

