import { productRequest,
    productSuccess, 
    productFail,
    createReviewFail,
    createReviewRequest,
    createReviewSuccess,
    clearError,
    clearReviewSubmitted,
    clearProduct,
    newProductFail,
    newProductSuccess,
    newProductRequest,
    clearProductCreated,
    deleteProductFail,
    deleteProductRequest,
    deleteProductSuccess,
    clearProductDeleted,
    updateProductFail,
    updateProductRequest,
    updateProductSuccess,
    clearProductUpdated,
    reviewsRequest,
    reviewsFail,
    reviewsSuccess,
    deleteReviewFail,
    deleteReviewRequest,
    deleteReviewSuccess,
    clearReviewDeleted
   } from '../Slice/Singleproduct';
 import axios from 'axios';
 import { getToken,removeToken,setToken } from '../Axios';
// import { loadConfigFromFile } from 'vite';

export const getProduct = (id )=> async (dispatch) => {


  try { 
    
    const token = getToken();
      console.log(token);

      const config = {
          headers: { 
              'Content-type': 'Application/json',
               'Authorization': `Bearer ${token}`, // Include the token in the request headers

          }
      }

      dispatch(productRequest()) 
      const { data }  =  await axios.get(`http://localhost:8000/getproductbyid/${id}`,config);
      dispatch(productSuccess(data))
  } catch (error) {
      //handle error
      dispatch(productFail(error.response.data.message))
  }
  
}
export default getProduct

export const createReview = formData => async (dispatch) => {


  try {  
      dispatch(createReviewRequest()) 
      const token = getToken();
      console.log(token);

      const config = {
          headers: { 
              'Content-type': 'Application/json',
               'Authorization': `Bearer ${token}`, // Include the token in the request headers

          }
      }

    //   const { data }  =  await axios.put(`http://localhost:8000/review`, formData, config);
    // Example URL if the backend expects the product ID in the URL path
const { data } = await axios.put(`http://localhost:8000/review`, formData, config);

      dispatch(createReviewSuccess(data))
  } catch (error) {
      //handle error
      dispatch(createReviewFail(error.response.data.message))
  }
  
}

// Admin
export const createNewProduct  =  productData => async (dispatch) => {

    try {  
        dispatch(newProductRequest()) 
        const token = getToken();
      console.log(token);

      const config = {
          headers: { 
              'Content-type': 'Application/json',
               'Authorization': `Bearer ${token}`, // Include the token in the request headers

          }
      }
        const { data }  =  await axios.post(`http://localhost:8000/createproduct`, productData,config);
        dispatch(newProductSuccess(data))
    } catch (error) {
        //handle error
        dispatch(newProductFail(error.response.data.message))
    }
    
}
export const deleteProduct  =  id => async (dispatch) => {

    try {  
        dispatch(deleteProductRequest()) 
        const token = getToken();
      console.log(token);

      const config = {
          headers: { 
              'Content-type': 'Application/json',
               'Authorization': `Bearer ${token}`, // Include the token in the request headers

          }
      }
        await axios.delete(`http://localhost:8000/delete/${id}`,config);
        dispatch(deleteProductSuccess())
    } catch (error) {
        //handle error
        dispatch(deleteProductFail(error.response.data.message))
    }
    
}

export const updateProduct  =  (id, productData) => async (dispatch) => {
    console.log(id,productData);

    try {  
        dispatch(updateProductRequest()) 
        const token = getToken();
        console.log(token);
  
        const config = {
            headers: { 
                'Content-type': 'Application/json',
                 'Authorization': `Bearer ${token}`, // Include the token in the request headers
  
            }
        }
        const { data }  =  await axios.put(`http://localhost:8000/edit/${id}`, productData,config);
        dispatch(updateProductSuccess(data))
    } catch (error) {
        //handle error
        dispatch(updateProductFail(error.response.data.message))
    }
    
}

export const getReviews = id => async (dispatch) => {
    try {
        dispatch(reviewsRequest());
        const token = getToken();
        console.log(token);
  
        const config = {
            headers: { 
                'Content-type': 'Application/json',
                 'Authorization': `Bearer ${token}`, // Include the token in the request headers
  
            },
            params:{id}
        }

                console.log('Axios Config:', config);

        const { data } = await axios.get(`http://localhost:8000/getsinglereview`,  config);
        console.log(data);
        dispatch(reviewsSuccess(data));
    } catch (error) {
        dispatch(reviewsFail(error.response.data.message));
    }
}


export const deleteReview =  (productId, id) => async (dispatch) => {
    console.log(productId, id);

    try {  
        dispatch(deleteReviewRequest()) 
        const token = getToken();
        console.log(token);
  
        const config = {
            headers: { 
                'Content-type': 'Application/json',
                 'Authorization': `Bearer ${token}`, // Include the token in the request headers
  
            },
            // params: { productId, id } // Pass productId and id as query parameters

        }
        await axios.delete(`http://localhost:8000/deletereveiw/${productId}/${id}`,config);
        dispatch(deleteReviewSuccess())
    } catch (error) {
        //handle error
        dispatch(deleteReviewFail(error.response.data.message))
    }
    
}