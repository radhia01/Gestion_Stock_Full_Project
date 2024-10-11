import { combineReducers } from "redux";
import auth from "./auth";
import product from "./product"
import category  from "./category";
import image  from "./image";
import subcategory from "./subcategory";
import brand from "./brand";
import user from "./user"
import role from "../reducers/role"
import permission from "./permission";
const reducers=combineReducers({
   auth,
   product,
   category,
   image,
   subcategory,
   brand,
   user,
   role,
   permission
   
   
})
export default reducers;