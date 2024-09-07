import axios from "axios";
import { setToken ,getToken,removeToken} from "../Axios.jsx";

import{loginRequest,
    loginSuccess,
    loginFail,
    clearerror,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserFail,
    loadUserSuccess,
    loadUserRequest,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    clearUpdateProfile,
    updatePasswordFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    forgotPasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    resetPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess


} from '../Slice/AuthSlice.jsx'
import {
    usersRequest,
    usersSuccess,
    usersFail,
    userRequest,
    userSuccess,
    userFail,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFail,
    updateUserRequest,
    updateUserSuccess,
    updateUserFail
} from '../Slice/UserSlice.jsx'

 export const login = (email, password) => async (dispatch) => {
    

    try {
        dispatch(loginRequest())
        const { data }  = await axios.post(`https://e-com-back-end.onrender.com/login`,{email,password});
        // console.log(data["token"]);
        setToken(data.token);

        dispatch(loginSuccess(data))
    } catch (error) {
        dispatch(loginFail(error.response.data.message))
    }


}



 // AuthSlice.jsx
export const clearerrorauth = () => (dispatch) => {
    dispatch(clearerror());
};


export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest())
        //mutipart for we using pic in regiterration 
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data }  = await axios.post(`https://e-com-back-end.onrender.com/register`,userData);
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }

}
//get my profile route
export const loadUser = () => async (dispatch) => {
    try {
      dispatch(loadUserRequest());
  
      const token = getToken();
  
      if (!token) {
       console.log("user not found");
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      };
  
      const { data } = await axios.get(`https://e-com-back-end.onrender.com/myprofile`, config);
      dispatch(loadUserSuccess(data));
    } catch (error) {
      dispatch(loadUserFail(error.response.data.message));
    }
  };
// logout
export const logout = ()=> async (dispatch) => {

    try {
        await axios.get(`https://e-com-back-end.onrender.com/logout`);
        dispatch(logoutSuccess())
        removeToken();
       
    } catch (error) {
        dispatch(logoutFail())
    }

}

export const myprofileupdate=({formData,id}) => async (dispatch) => {

    try {
        dispatch(updateProfileRequest())
        const token = getToken();

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${token}`, // Include the token in the request headers

            }
        }

        const { data }  = await axios.put(`https://e-com-back-end.onrender.com/updateprofile/${id}`,formData, config);
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
    }

}

export const passwordchange=(formData,id) => async (dispatch) => {
    

    try {
        console.log(formData);
        dispatch(updatePasswordRequest())
        const token = getToken();
        console.log(token);

        const config = {
            headers: { 
                'Content-type': 'Application/json',
                 'Authorization': `Bearer ${token}`, // Include the token in the request headers

            }
        }

         await axios.put(`https://e-com-back-end.onrender.com/changepassword/${id}`,formData, config);
         dispatch(updatePasswordSuccess())
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message))
    }

}

export const forgotPassword = (formData) => async (dispatch) => {

    try {
        dispatch(forgotPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data} =  await axios.post(`https://e-com-back-end.onrender.com/forgotpassword`, formData, config);
        dispatch(forgotPasswordSuccess(data))
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message))
    }

}

export const resetPassword = (formData, token) => async (dispatch) => {

    try {
        dispatch(resetPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data} =  await axios.post(`https://e-com-back-end.onrender.com/resetpassword/${token}`, formData, config);
        dispatch(resetPasswordSuccess(data))
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
    }

}
// get all user by admin
export const getUsers =  async (dispatch) => {

    try {
        dispatch(usersRequest())
        const token = getToken();
        console.log(token);

        const config = {
            headers: { 
                'Content-type': 'Application/json',
                 'Authorization': `Bearer ${token}`, // Include the token in the request headers

            }
        }
        const { data }  = await axios.get(`https://e-com-back-end.onrender.com/admin/getalluser`,config);
        dispatch(usersSuccess(data))
    } catch (error) {
        dispatch(usersFail(error.response.data.message))
    }

}
// get single user by admin

export const getUser = id => async (dispatch) => {

    try {
        dispatch(userRequest())
        const token = getToken();
        console.log(token);

        const config = {
            headers: { 
                'Content-type': 'Application/json',
                 'Authorization': `Bearer ${token}`, // Include the token in the request headers

            }
        }
        const { data }  = await axios.get(`https://e-com-back-end.onrender.com/admin/getbyid/${id}`,config);
        dispatch(userSuccess(data))
    } catch (error) {
        dispatch(userFail(error.response.data.message))
    }

}
// delete single by admin
export const deleteUser = id => async (dispatch) => {

    try {
        dispatch(deleteUserRequest())
        const token = getToken();
        console.log(token);

        const config = {
            headers: { 
                'Content-type': 'Application/json',
                 'Authorization': `Bearer ${token}`, // Include the token in the request headers

            }
        }
        await axios.delete(`https://e-com-back-end.onrender.com/admin/delete/${id}`,config);
        dispatch(deleteUserSuccess())
    } catch (error) {
        dispatch(deleteUserFail(error.response.data.message))
    }

}
// update by user by admin
export const updateUser = (id, formData) => async (dispatch) => {

    try {
        dispatch(updateUserRequest())
        const token = getToken();
        console.log(token);

        const config = {
            headers: { 
                'Content-type': 'Application/json',
                 'Authorization': `Bearer ${token}`, // Include the token in the request headers

            }
        }
       
        await axios.put(`https://e-com-back-end.onrender.com/admin/update/${id}`, formData, config);
        dispatch(updateUserSuccess())
    } catch (error) {
        dispatch(updateUserFail(error.response.data.message))
    }

}
