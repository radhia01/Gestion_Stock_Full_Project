import {createSlice} from "@reduxjs/toolkit"
import { addCategory, deleteCategory, getAllCategories, updateCategory } from "../actions/category";

const categorySlice=createSlice({
    name:"category",
    initialState:{
        categories:null,
        isLoading:false,
        error:null,
        response:null
    },
    reducers:{
     resetResponse:(state)=>{
        state.response=null;
     },
     resetError:(state)=>{
        state.error=null;
     }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllCategories.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(getAllCategories.fulfilled,(state,action)=>{
            state.isLoading=false
            state.categories=action.payload.categories
          
        });
        builder.addCase(getAllCategories.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload
        });
        builder.addCase(addCategory.pending,(state)=>{
            state.isLoading=true
                   });
        builder.addCase(addCategory.fulfilled,(state,action)=>{
                       
            state.isLoading=false
            state.categories=[...state.categories,action.payload]
            state.response="add"
        }
        );
             
        builder.addCase(addCategory.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload
                   });
        builder.addCase(deleteCategory.pending,(state)=>{
            state.isLoading=true
                           });
        builder.addCase(deleteCategory.fulfilled,(state,action)=>{
                               
            state.isLoading=false
            state.categories=state.categories.filter(category=>category.id!==action.payload.id)
            state.response="delete"
                           });
        builder.addCase(deleteCategory.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload
                           });
        builder.addCase(updateCategory.pending,(state)=>{
            state.isLoading=true
                                           });
        builder.addCase(updateCategory.fulfilled,(state,action)=>{
                                               
            state.isLoading=false
            state.categories=state.categories.map(category=>category.id==action.payload.id?action.payload.category:category)
            state.response="update"
                                           });
        builder.addCase(updateCategory.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload
                                           });
       
    }
})
export default categorySlice.reducer;
export const {resetResponse,resetError}=categorySlice.actions;