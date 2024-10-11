import {createSlice} from "@reduxjs/toolkit"
import { addPermission, deletePermission, getAllPermissions, updatePermission } from "../actions/permission";
const permissionSlice=createSlice({
    name:"permission",
    initialState:{
        isLoading:false,
        permissions:null,
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
        builder.addCase(addPermission.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(addPermission.fulfilled,(state,action)=>{
            state.permissions=[...state.permissions,action.payload]
            state.response="add"
        });
        builder.addCase(addPermission.rejected,(state,action)=>{
           state.error=action.payload
        });
        builder.addCase(getAllPermissions.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(getAllPermissions.fulfilled,(state,action)=>{
            state.permissions=action.payload
        });
        builder.addCase(getAllPermissions.rejected,(state,action)=>{
           state.error=action.payload
        });
        builder.addCase(deletePermission.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(deletePermission.fulfilled,(state,action)=>{
            state.permissions=state.permissions.filter(permission=>permission.id!=action.payload)
            state.response="delete"
        });
        builder.addCase(deletePermission.rejected,(state,action)=>{
           state.error=action.payload
        });
        builder.addCase(updatePermission.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(updatePermission.fulfilled,(state,action)=>{
            state.permissions=state.permissions.map(permission=>permission.id===action.payload.id?action.payload.updatedPermission:permission)
            state.response="update"
        });
        builder.addCase(updatePermission.rejected,(state,action)=>{
           state.error=action.payload
        })
    }

    
})
export default permissionSlice.reducer;
export const {resetError,resetResponse}=permissionSlice.actions