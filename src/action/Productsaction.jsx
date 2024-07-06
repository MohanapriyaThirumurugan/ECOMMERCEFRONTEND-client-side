import axios from 'axios'
import{productsRequest, productsSuccess, productsFail,adminProductsFail,adminProductsSuccess,adminProductsRequest} from '../Slice/ProductsSlice.jsx'
import { getToken,removeToken } from '../Axios.jsx'
 const getproducts=(keyword, price, category, rating, currentPage)=>async(dispatch)=>{
    try {
        // taking the reqiest
        dispatch(productsRequest())

        // for product search

       let link=`http://localhost:8000/getall?page=${currentPage}`
       if(keyword){
           link  +=    `&keyword=${keyword}`
       }
       if(price) {
        link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
    }
     if(category) {
        link += `&category=${category}`
    }
    if(rating) {
        link += `&ratings=${rating}`
    }

    console.log(link);
        const{data}=await axios.get(link)
        //products is there are not
        dispatch(productsSuccess({products:data}))
        
    } catch (error) {
        //handle the error
        dispatch(productsFail(error.response.data.message))
    }
   
}
 export default getproducts

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
 
        const { data }  =  await axios.get(`http://localhost:8000/admin/getadminproducts`,config);
        dispatch(adminProductsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(adminProductsFail(error.message))
    }
    
 }
 


// import AxiosService from '../Axios.jsx'; // Import the configured Axios instance
// import { productsRequest, productsSuccess, productsFail } from '../Slice/ProductsSlice.jsx';

// const getproducts = (keyword, price, category, rating, currentPage) => async (dispatch) => {
//     try {
//         // Initiate the request
//         dispatch(productsRequest());

//         // Construct the query URL
//         let link = `/getall?page=${currentPage}`;
//         if (keyword) {
//             link += `&keyword=${keyword}`;
//         }
//         if (price) {
//             link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
//         }
//         if (category) {
//             link += `&category=${category}`;
//         }
//         if (rating) {
//             link += `&ratings=${rating}`;
//         }

//         // Make the request using AxiosService
//         const {data} = await AxiosService.get(link);

//         // Dispatch success action
//         dispatch(productsSuccess({ products:data }));
//     } catch (error) {
//         // Handle the error
//         console.error('Full error details:', error);
//        dispatch(productsFail(error.response.data.message));
//     }
// };

// export default getproducts;

  