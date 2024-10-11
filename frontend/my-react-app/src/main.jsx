
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify"
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import Home from "./containers/Home.jsx"
import {Provider} from "react-redux"
import SignIn from "./containers/auth/SignIn.jsx"
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from "react-router-dom"
import Products from './containers/product/Products.jsx';
import Categories from './containers/category/Categories.jsx';
import Users from './containers/user/Users.jsx';
import PrivateRoutes from './utils/PrivateRoute.jsx';
import Product from './containers/product/Product.jsx';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import ProductDetails from './containers/product/ProductDetails.jsx';
import SubCategories from './containers/SubCategories.jsx';
import Brands from './containers/brand/Brands.jsx';
import ExpiredProducts from './containers/product/ExpiredProducts.jsx';
import Roles from './containers/role/Roles.jsx';
import Permissions from './containers/role/Permissions.jsx';
import RolePermissions from './containers/role/RolePermissions.jsx';
import Purchases from './containers/purchase/Purchases.jsx';
import LowStock from './containers/product/LowStock.jsx';
import Sales from './containers/sales/Sales.jsx';
import Test from "./containers/Test.jsx"
const router=createBrowserRouter(createRoutesFromElements(
  <>
      <Route path="/signin" element={<SignIn />} />
      <Route element={<PrivateRoutes/>}>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="users" element={<Users />} />
        <Route path="add/product" element={<Product />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="subcategories" element={<SubCategories />} />
        <Route path="brands" element={<Brands />} />
        <Route path="expired/products" element={<ExpiredProducts />} />
        <Route path="expired/products" element={<ExpiredProducts />} />
        <Route path="users" element={<Users />} />
        <Route path="roles" element={<Roles />} />
        <Route path="permissions" element={<Permissions />} />
        <Route path="/role/permissions/:id" element={<RolePermissions />} />
       
        <Route path="purchases" element={<Purchases />} />
        <Route path="low/stock" element={<LowStock />} />
        <Route path="expired/products" element={<ExpiredProducts />} />
        <Route path="sales" element={<Sales />} />
        <Route path="test" element={<Test />} />
        {/* Ajoutez d'autres routes protégées ici */}
      </Route>
      </Route>
      
      
    </>
))
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
 <PersistGate loading={null} persistor={persistor}>
 <I18nextProvider i18n={i18n}>
    <RouterProvider router={router}/>
    </I18nextProvider>
    <ToastContainer/>
 </PersistGate>
    
  </Provider>
  
)
