import {createSlice} from "@reduxjs/toolkit"
import { addUser, deleteUser, getAllRoles, getAllUsers, updateUser } from "../actions/user"
const userSlice=createSlice({
    name:"user",
    initialState:{
        users:null,
        isLoading:false,
        error:null,
        response:null,
        roles:null
      
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
        builder.addCase(getAllUsers.pending,(state)=>{
            state.isLoading=true

        });
        builder.addCase(getAllUsers.fulfilled,(state,action)=>{
            state.isLoading=false
            state.users=action.payload.users
        });
        builder.addCase(getAllUsers.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload
        });
        builder.addCase(deleteUser.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(deleteUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.users=state.users.filter(user=>user.id!==action.payload)
            state.response="delete"        
                   });
        builder.addCase(deleteUser.rejected,(state,action)=>{
           state.isLoading=false
           state.error=action.payload
                })   
        builder.addCase(addUser.pending,(state)=>{
            state.isLoading=true
          
                           });
        builder.addCase(addUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.users=[...state.users,action.payload]
            state.response="add"
           
                           });
        builder.addCase(addUser.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload
                           })         
        builder.addCase(updateUser.pending,(state)=>{
           state.isLoading=true;
         
                                           });
        builder.addCase(updateUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.users=state.users.map(user=>user.id===action.payload.id?action.payload.updatedUser:user)
            
                                           });
        builder.addCase(updateUser.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload  })
        builder.addCase(getAllRoles.pending,(state)=>{
                state.isLoading=true;});
                                              
        builder.addCase(getAllRoles.fulfilled,(state,action)=>{
                state.isLoading=false
                state.roles=action.payload});  
        builder.addCase(getAllRoles.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload
                                           })      
       
           
    }
})
export default userSlice.reducer;
export const {resetError,resetResponse,setResponse}=userSlice.actions;