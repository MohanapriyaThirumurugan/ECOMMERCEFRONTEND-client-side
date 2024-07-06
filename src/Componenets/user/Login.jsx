import React, { useEffect, useState } from 'react'
import Metadata from '../layouts/Metadata'
import {login ,clearerrorauth }from '../../action/UserAction'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from 'react-toastify'
// import  {toast} from 'toast-library';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
function Login() {
    const{loading,error,isAuthenticated}=useSelector(state=>state.authstate)
    const redirect = location.search?'/'+location.search.split('=')[1]:'/';

    const [email,setemail]=useState("")
    const[password,setpassword]=useState("")
    const dispatch=useDispatch()
     const navigate=useNavigate()


  const submithandler=(e)=>{
    e.preventDefault()
    dispatch(login(email,password))
  }

  
  useEffect(()=>{
    if(isAuthenticated){
      navigate('/')
      // navigate(redirect)

    }
   if(error){
    toast.error(error,{
        position:'POSITION.BOTTOM.CENTER',
        type:error,
        onClose:()=>{
          dispatch(clearerrorauth())
        }
    })
    return
      
   }
  },[error,isAuthenticated,navigate, dispatch])
  return (
    <>
    <Metadata title={`login`}/>
     <div className="row wrapper"> 
		    <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submithandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={e=> setemail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={e=>setpassword(e.target.value)}
              />
            </div>

            <Link to='/forgotpassword' className="float-right mb-4">Forgot Password?</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              
            >
              LOGIN
            </button>

            <Link to='/register' className="float-right mt-3">New User?</Link>
          </form>
		  </div>
       {/* <p>Welcome to our e-commerce store! We offer a wide variety of products to meet all your needs. Our mission is to provide the best products at the most competitive prices, while ensuring a seamless shopping experience for our customers.</p>
      <p>Our team is dedicated to providing excellent customer service and support. We value your feedback and are constantly working to improve our offerings and services.</p>
      <p>Thank you for choosing our store!</p>  */}
    </div>
    </>
  )
}

export default Login