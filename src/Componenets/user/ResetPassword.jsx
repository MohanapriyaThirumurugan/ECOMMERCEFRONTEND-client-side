import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import {useNavigate, useParams} from 'react-router-dom';
import { resetPassword ,clearerrorauth} from '../../action/UserAction';
import { useDispatch, useSelector } from 'react-redux';

function ResetPassword() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const { isAuthenticated, error }  = useSelector(state => state.authstate)
    const navigate = useNavigate();
    const { token } = useParams();

    const submitHandler  = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        
        dispatch(resetPassword(formData, token))
    }

    useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(clearerrorauth());
        }
        else{
            toast('Password updated successfully', {
                type: 'success',
                position: 'top-center',
            });
        }
      }, [error, dispatch]);

  return (
    <>
     <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Set Password
                    </button>

                </form>
            </div>
        </div>

    </>
  )
}

export default ResetPassword
// import React, { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { loadUser, logout } from '../../action/UserAction';

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, user } = useSelector(state => state.authstate);

//   useEffect(() => {
//     if (isAuthenticated) {
//       dispatch(loadUser());
//     }
//   }, [dispatch, isAuthenticated]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   return (
//     <header>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <Link className="navbar-brand" to="/">YourAppName</Link>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ml-auto">
//             {isAuthenticated ? (
//               <>
//                 <li className="nav-item">
//                   <span className="nav-link">Hello, {user && user.name}</span>
//                 </li>
//                 <li className="nav-item">
//                   <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
//                 </li>
//               </>
//             ) : (
//               <li className="nav-item">
//                 <Link className="nav-link" to="/login">Login</Link>
//               </li>
//             )}
//           </ul>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;
