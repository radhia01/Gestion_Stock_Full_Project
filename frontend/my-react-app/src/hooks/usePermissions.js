import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react'
import  {getAllPermissions} from "../redux/actions/permission"

const usePermissions=(requiredPermissions)=>{
    const dispatch=useDispatch()
    useEffect(() => {
      dispatch(getAllPermissions())
    }, [])
    
    const rolePermissions=useSelector(state=>state.role.permissions)
   
  const {permissions}=useSelector(state=>state.permission)
  const finalPermissions=[]
  try{  rolePermissions.map(permission=>{
    const per=permissions.find(element=>element.id===permission.permission)
       finalPermissions.push(per.name)
   })

    const isAuthorized=requiredPermissions.every(el=>finalPermissions.includes(el))
    return isAuthorized}
    catch(error){
      console.log(error)
    }
  
}
export default usePermissions;