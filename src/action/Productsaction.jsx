import axios from 'axios'
import{productsRequest, productsSuccess, productsFail,
  adminProductsFail,
  adminProductsSuccess,
  adminProductsRequest,

  
} from '../Slice/ProductsSlice.jsx'

import { searchFail,searchRequest,searchSuccess } from '../Slice/Searchslice.jsx';
import { getToken,removeToken } from '../Axios.jsx'

const fetchAllProducts = () => async (dispatch) => {
    try {
      dispatch(productsRequest());
      const { data } = await axios.get('https://e-com-back-end.onrender.com/getall');
      dispatch(productsSuccess({
        products: data.products,
        // count: data.count,
        // resPerPage: 10 // Default value or set dynamically if needed
      }));
    } catch (error) {
      dispatch(productsFail(error.response?.data?.message || 'Error fetching products'));
    }
  };
  
  export default fetchAllProducts;

  export const searchProducts = (keyword) => async (dispatch) => {
    try {
      dispatch(searchRequest());
      const { data } = await axios.get(`https://e-com-back-end.onrender.com/pro/search?keyword=${keyword}`);
      dispatch(searchSuccess({
        productsearch: data.productsearch,
      //   count: data.count,
      //   resPerPage: 10 // Default value or set dynamically if needed
      }));
    } catch (error) {
      dispatch(searchFail(error.response?.data?.message || 'Error searching products'));
    }

  }

 export const getAdminProducts =() =>async (dispatch) => {

    try {  
        dispatch(adminProductsRequest()) 
        const token = getToken();
      console.log(token);

      const config = {
          headers: { 
              'Content-type': 'Application/json',
               'Authorization': `Bearer ${token}`, // Include the token in the request headers

          }
      }
 
        const { data }  =  await axios.get(`https://e-com-back-end.onrender.com/admin/getadminproducts`,config);
        dispatch(adminProductsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(adminProductsFail(error.message))
    }
    
 }
 


