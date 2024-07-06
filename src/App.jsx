import React, { useEffect } from "react";
import Header from "./Componenets/layouts/Header.jsx";
import Fooder from "./Componenets/layouts/Fooder.jsx";
import Home from "./Componenets/Home.jsx";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from "./Componenets/Product/ProductDetails.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductSearch from "./Componenets/Product/ProductSearch.jsx";
import Login from "./Componenets/user/Login.jsx";
import Register from "./Componenets/user/Register.jsx";
// import Store from "./Store.jsx";
 import { loadUser } from "./action/UserAction.jsx";
import Profile from "./Componenets/user/Profile.jsx";
import UpdateProfile from "./Componenets/user/UpdateProfile.jsx";
import Updatepassword from "./Componenets/user/Updatepassword.jsx";
import Forgotpassword from "./Componenets/user/Forgotpassword.jsx";
import ResetPassword from "./Componenets/user/ResetPassword.jsx";
import Cart from "./Componenets/cart/Cart.jsx";
import ShippingInfo from "./Componenets/cart/ShippingInfo.jsx";
import ConfrimOrder from "./Componenets/cart/ConfrimOrder.jsx";
import axios from 'axios'
import { useState } from "react";
import Payment from "./Componenets/cart/Payment.jsx";
import{setToken,getToken} from './Axios.jsx'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Ordercompleted from "./Componenets/cart/Ordercompleted.jsx";
import Userorder from "./Componenets/Order/Userorder.jsx";
import OrderDetails from "./Componenets/Order/OrderDetails.jsx";
import Dashboard from "./Componenets/admin/Dashboard.jsx";
import ProductList from "./Componenets/admin/ProductList.jsx";
import NewProduct from "./Componenets/admin/NewProduct.jsx";
import Updateproduct from "./Componenets/admin/Updateproduct.jsx";
import OrderList from "./Componenets/admin/OrderList.jsx";
import UpdateOrder from "./Componenets/admin/UpdateOrder.jsx";
import UserList from "./Componenets/admin/UserList.jsx";
import UserUpdate from "./Componenets/admin/UserUpdate.jsx";
import ReveiwList from "./Componenets/admin/ReveiwList.jsx";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("pk_test_51PH4R9SIDWBvgV79FcbUL0HDLyGIPfNL1PROpAsQhPV8oHPU0zEKUNVYUfQsfjgg7O4UecR2OWpqNU8MqUajQ2r400c7GBzv5y")
const dispatch = useDispatch();

useEffect(()=>{
  // dispatch(loadUser());
  async function fetchStripeApiKey() {
    try {
      const token = getToken();

        const config = {
            headers: { 
                'Content-type': 'Application/json',
                 Authorization: `Bearer ${token}`, // Include the token in the request headers

            }
        }
      const response = await axios.get('http://localhost:8000/payments',config);
      setStripeApiKey(response.data.stripeApiKey);
      console.log(response.data.stripeApiKey);
    } catch (error) {
    console.error('Error fetching Stripe API key:', error);
    }
  }
  fetchStripeApiKey();
  dispatch(loadUser());


},[dispatch])

  return (
    <>
      <BrowserRouter>
      <div className="App">
        <HelmetProvider>
          <Header />
          <div className='container container-fluid'>
          <ToastContainer theme="dark"autoClose={5000}/>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/search/:keyword" element={<ProductSearch/>}></Route>
            <Route path="/productdetails/:id" element={<ProductDetails/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/myprofile" element={<Profile/>}></Route>
            <Route path="/myprofile/update/:id" element={<UpdateProfile/>}></Route>
            <Route path="/myprofile/update/password/:id" element={<Updatepassword/>}></Route>
            <Route path="/forgotpassword" element={<Forgotpassword/>}></Route>
            <Route path="/resetpassword/:token" element={<ResetPassword/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/shipping" element={<ShippingInfo/>}></Route>
            <Route path="/order/confirm" element={<ConfrimOrder/>}></Route>
            <Route path='/payments' element={<Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>} />
            <Route path="/order/success" element={<Ordercompleted/>}></Route>
            <Route path="/order/userorders" element={<Userorder/>}></Route>
            <Route path="/order/details/:id" element={<OrderDetails/>}></Route>


         </Routes>
          </div>
          {/* Admin routes */}
          <Routes>
          <Route path='/admin/dashboard' element={ <Dashboard/> } />
          <Route path='/admin/productList' element={ <ProductList/> } />
          <Route path='/admin/newproduct' element={ <NewProduct/> } />
          <Route path='/admin/updateproduct/:id' element={ <Updateproduct/> } />
          <Route path='/admin/adminorder/' element={ <OrderList/> } />
          <Route path='/admin/updateorder/:id' element={ <UpdateOrder/> } />
          <Route path='/admin/users' element={ <UserList/> } />
          <Route path='/admin/usersList/:id' element={ <UserUpdate/> } />
          <Route path='/admin/reviewList' element={ <ReveiwList/> } />

          </Routes>
          <Fooder />

        </HelmetProvider>
        </div>
      </BrowserRouter>
     
    </>
  );
}

export default App;
