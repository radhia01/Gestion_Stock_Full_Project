import {createSlice} from "@reduxjs/toolkit"
import {  getAllImages } from "../actions/image"
const imageSlice=createSlice({
    name:"image",
    initialState:{
        images:null,
        isLoading:false,
        error:null,
      
    },
    extraReducers:(builder)=>{
       
        builder.addCase(getAllImages.pending,(state)=>{
            state.isLoading=true
   
           });
           builder.addCase(getAllImages.fulfilled,(state,action)=>{
               console.log(action.payload)
               state.isLoading=false
               state.images=action.payload.images
           });
           builder.addCase(getAllImages.rejected,(state,action)=>{
               state.isLoading=false
               state.error=action.payload
           });
    }   
})      

export default imageSlice.reducer;