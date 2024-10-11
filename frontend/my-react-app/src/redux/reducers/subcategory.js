import {createSlice} from "@reduxjs/toolkit"
import { addSubCategory, getAllSubCategories } from "../actions/subcategory";

const subcategorySlice=createSlice({
    name:"subcategory",
    initialState:{
        subcategories:null,
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
        builder.addCase(getAllSubCategories.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(getAllSubCategories.fulfilled,(state,action)=>{
            state.isLoading=false
            state.subcategories=action.payload.subCategories
          
        });
        builder.addCase(getAllSubCategories.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload
        });
        builder.addCase(addSubCategory.pending,(state)=>{
            state.isLoading=true
                   });
        builder.addCase(addSubCategory.fulfilled,(state,action)=>{
                       
            state.isLoading=false
            state.products=[...state.subcategories,action.payload.subCategory]
            state.response="add"
        }
        );
             
        builder.addCase(addSubCategory.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload
                   });
       
       
    }
})
export default subcategorySlice.reducer;
export const {resetResponse,resetError}=subcategorySlice.actions;