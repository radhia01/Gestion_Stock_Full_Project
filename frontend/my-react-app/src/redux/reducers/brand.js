import {createSlice} from "@reduxjs/toolkit"
import { addBrand, deleteBrand, getAllBrands, updateBrand } from "../actions/brand";
const brandSlice=createSlice({
    name:"brand",
    initialState:{
        isLoading:false,
        brands:null,
        response:null,
        error:null
    },
    reducers:{
        resetError:(state)=>{
            state.error=null
        },
        resetResponse:(state)=>{
            state.response=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(addBrand.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(addBrand.fulfilled,(state,action)=>{
            state.brands=[...state.brands,action.payload]
            state.response="add"
        });
        builder.addCase(addBrand.rejected,(state,action)=>{
           state.error=action.payload
        });
        builder.addCase(getAllBrands.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(getAllBrands.fulfilled,(state,action)=>{
            state.brands=action.payload.brands
        });
        builder.addCase(getAllBrands.rejected,(state,action)=>{
           state.error=action.payload
        });
        builder.addCase(deleteBrand.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(deleteBrand.fulfilled,(state,action)=>{
            state.brands=state.brands.filter(brand=>brand.id!=action.payload)
            state.response="delete"
        });
        builder.addCase(deleteBrand.rejected,(state,action)=>{
           state.error=action.payload
        });
        builder.addCase(updateBrand.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(updateBrand.fulfilled,(state,action)=>{
            state.brands=state.brands.map(brand=>brand.id===action.payload.id?action.payload.updatedBrand:brand)
            state.response="update"
        });
        builder.addCase(updateBrand.rejected,(state,action)=>{
           state.error=action.payload
        })
    }

    
})
export default brandSlice.reducer;
export const {resetError,resetResponse}=brandSlice.actions