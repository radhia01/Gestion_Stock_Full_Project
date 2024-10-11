import {createSlice} from "@reduxjs/toolkit"
import { addPermissionToRole, addRole, deleteRole, getAllRoles, getRolePermissions, updateRole } from "../actions/role";
import { removeRolePermissions } from "../actions/role";
const roleSlice=createSlice({
    name:"role",
    initialState:{
        isLoading:false,
        roles:null,
        response:null,
        error:null,
        permissions:null

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
        builder.addCase(addRole.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(addRole.fulfilled,(state,action)=>{
            state.roles=[...state.roles,action.payload]
            state.response="add"
        });
        builder.addCase(addRole.rejected,(state,action)=>{
           state.error=action.payload
        });
        builder.addCase(getAllRoles.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(getAllRoles.fulfilled,(state,action)=>{
            state.roles=action.payload.roles
        });
        builder.addCase(getAllRoles.rejected,(state,action)=>{
           state.error=action.payload
        });
        builder.addCase(deleteRole.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(deleteRole.fulfilled,(state,action)=>{
            state.roles=state.roles.filter(role=>role.id!=action.payload)
            state.response="delete"
        });
        builder.addCase(deleteRole.rejected,(state,action)=>{
           state.error=action.payload
        });
        builder.addCase(updateRole.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(updateRole.fulfilled,(state,action)=>{
            state.roles=state.roles.map(role=>role.id===action.payload.id?action.payload.updatedRole:role)
            state.response="update"
        });
        builder.addCase(updateRole.rejected,(state,action)=>{
           state.error=action.payload
        })
        builder.addCase(getRolePermissions.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(getRolePermissions.fulfilled,(state,action)=>{
            state.permissions=action.payload
        });
        builder.addCase(getRolePermissions.rejected,(state,action)=>{
           state.error=action.payload
        })
        builder.addCase(addPermissionToRole.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(addPermissionToRole.fulfilled,(state,action)=>{
            state.permissions=[...state.permissions,{permission:action.payload.id_permission}]
        });
        builder.addCase(addPermissionToRole.rejected,(state,action)=>{
           state.error=action.payload
        })
        builder.addCase(removeRolePermissions.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(removeRolePermissions.fulfilled,(state,action)=>{
            state.permissions=state.permissions.filter(element=>element.permission!==action.payload)
        });
        builder.addCase(removeRolePermissions.rejected,(state,action)=>{
           state.error=action.payload
        })
    }

    
})
export default roleSlice.reducer;
export const {resetError,resetResponse}=roleSlice.actions