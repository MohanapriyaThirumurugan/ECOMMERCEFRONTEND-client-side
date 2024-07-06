import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {logout} from '../../action/UserAction.jsx'// Import your logout action
import Search from './Search.jsx';
import {DropdownButton, Dropdown, Image} from 'react-bootstrap';
import { useNavigate ,useLocation} from 'react-router-dom'





function Header() {
  const { isAuthenticated, user } = useSelector(state => state.authstate);
  const { items:cartItems } = useSelector(state => state.cartstate)

  const dispatch = useDispatch();
  const navigate=useNavigate()

  const logoutHandler = () => {
    console.log('Logout Handler Called');
    dispatch(logout());
    navigate('/login');
  };
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     console.log('User is not authenticated, navigating to login');
  //     navigate('/login');
  //   }
  // }, [isAuthenticated, navigate]);
  useEffect(() => {
    const publicRoutes = ['/login', '/register','/forgotpassword'];
    if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
      console.log('User is not authenticated, navigating to login');
      navigate('/login');
    }
  }, [isAuthenticated, navigate, location.pathname]);


  return (
    <>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img width="150px" alt='JVLcart Logo' src="/images/shopicart.png" />
            </Link>
            </div>
        </div>
  
        <div className="col-12 col-md-6 mt-2 mt-md-0">
           <Search/>
        </div>
  
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          { isAuthenticated ? 
            (
              <Dropdown className='d-inline' >
                  <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                    <figure className='avatar avatar-nav'>
                      <Image width="50px" src={user.avatar??'./images/default_image.png'}  />
                    </figure>
                    <span>{user.name}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      { user.role === 'admin' && <Dropdown.Item onClick={() => {navigate('admin/dashboard')}} className='text-dark'>Dashboard</Dropdown.Item> }
                      <Dropdown.Item onClick={() => {navigate('/myprofile')}} className='text-dark'>Profile</Dropdown.Item>
                      <Dropdown.Item onClick={() => {navigate('/order/userorders')}} className='text-dark'>Orders</Dropdown.Item>
                      <Dropdown.Item onClick={logoutHandler} className='text-danger'>Logout</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
            )
          
          :
            <Link to="/login"  className="btn" id="login_btn">Login</Link>
          }
          <Link to="/cart"><span id="cart" className="ml-3">Cart</span></Link>
          <span className="ml-1" id="cart_count">{cartItems.length}</span>
        </div>
    </nav>
    </>
  );
}

export default Header;
