import {createSlice} from "@reduxjs/toolkit"
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../actions/products"
const productSlice=createSlice({
    name:"product",
    initialState:{
        products:null,
        isLoading:false,
        error:null,
        response:null
      
    },
    reducers:{
       resetError:(state)=>{
        state.error=null
       },
       resetResponse:(state)=>{
        state.response=null
       },
       setResponse:(state,action)=>{
        state.response=action.payload
       }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.pending,(state)=>{
            state.isLoading=true

        });
        builder.addCase(getAllProducts.fulfilled,(state,action)=>{
            state.isLoading=false
            state.products=action.payload.products
        });
        builder.addCase(getAllProducts.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload
        });
        builder.addCase(deleteProduct.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(deleteProduct.fulfilled,(state,action)=>{
            state.isLoading=false
            state.products=state.products.filter(product=>product.id!==action.payload.id)
            state.response="delete"        
                   });
        builder.addCase(deleteProduct.rejected,(state,action)=>{
           state.isLoading=false
           state.error=action.payload
                })   
        builder.addCase(addProduct.pending,(state)=>{
            state.isLoading=true
          
                           });
        builder.addCase(addProduct.fulfilled,(state,action)=>{
            state.isLoading=false
            state.products=[...state.products,action.payload.product]
            state.response="add"
           
                           });
        builder.addCase(addProduct.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload
                           })         
        builder.addCase(updateProduct.pending,(state)=>{
           state.isLoading=true;
         
                                           });
        builder.addCase(updateProduct.fulfilled,(state,action)=>{
            state.isLoading=false
            state.products=state.products.map(product=>product.id===action.payload.id?action.payload.product:product)
            
                                           });
        builder.addCase(updateProduct.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload
                                           })         
    }
})
export default productSlice.reducer;
export const {resetError,resetResponse,setResponse}=productSlice.actions;