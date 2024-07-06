import {adminOrdersFail, 
    adminOrdersRequest, 
    adminOrdersSuccess, 
      createOrderFail,
     createOrderRequest, 
     createOrderSuccess, 
     deleteOrderFail, 
     deleteOrderRequest,
      deleteOrderSuccess, 
      orderDetailFail, 
      orderDetailRequest, 
      orderDetailSuccess, 
      updateOrderFail, 
      updateOrderRequest, 
      updateOrderSuccess, 
      userOrdersFail, 
      userOrdersRequest, 
      userOrdersSuccess } from '../Slice/OrderSlice';
import axios from 'axios';
import { setToken,getToken,removeToken } from '../Axios';


export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch(createOrderRequest());
        const token = getToken();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.post(`http://localhost:8000/neworder`, order, config);
        console.log('Order creation response:', data);

        dispatch(createOrderSuccess(data));
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message));
    }
};


// to get user order
export const userOrders = async(dispatch) => {
    try {
        const token = getToken();

       const config = {
           headers: {
               'Content-type': 'application/json',
               Authorization: `Bearer ${token}`, // Include the token in the request headers

           }
       }
       dispatch(userOrdersRequest())
       const {data} = await axios.get(`http://localhost:8000/myorder`,config)
       dispatch(userOrdersSuccess(data))

    } catch (error) {
        const errorMessage = error.response && error.response.data ? error.response.data.message : error.message;
        dispatch(userOrdersFail(errorMessage));
    }
}

// to get the specific order
export const orderDetail = (id )=> async(dispatch) => {
    try {
       dispatch(orderDetailRequest())
       const token = getToken();

       const config = {
           headers: {
               'Content-type': 'application/json',
               Authorization: `Bearer ${token}`, // Include the token in the request headers

           }
       }

       const {data} = await axios.get(`http://localhost:8000/getsingleoder/${id}`,config)
       dispatch(orderDetailSuccess(data))
    } catch (error) {
        dispatch(orderDetailFail(error.response.data.message))
    }
}

export const adminOrders = async(dispatch) => {
    try {
        const token = getToken();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`, // Include the token in the request headers
 
            }
        }
       dispatch(adminOrdersRequest())
       const {data} = await axios.get(`http://localhost:8000/gellallordereduser`,config)
       dispatch(adminOrdersSuccess(data))
    } catch (error) {
        dispatch(adminOrdersFail(error.response.data.message))
    }
}

export const deleteOrder = (id) => async(dispatch) => {
    console.log(id);
    try {
        const token = getToken();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`, // Include the token in the request headers
 
            }
        }
       dispatch(deleteOrderRequest())
       await axios.delete(`http://localhost:8000/deleteorder/${id}`,config)
       dispatch(deleteOrderSuccess())
    } catch (error) {
       dispatch(deleteOrderFail(error.message))
    }
}
export const updateOrder = (id, orderData)  => async(dispatch) => {
    try {
        
       dispatch(updateOrderRequest())
       const token = getToken();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`, // Include the token in the request headers
 
            }
        }
       const { data} = await axios.put(`http://localhost:8000/upadateitem/${id}`, orderData,config)
       dispatch(updateOrderSuccess(data))
    } catch (error) {
       dispatch(updateOrderFail(error.response.data.message))
    }
}
