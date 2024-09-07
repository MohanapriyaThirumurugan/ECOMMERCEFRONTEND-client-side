import { addCartItemRequest, addCartItemSuccess } from '../Slice/CartSlice';
import{setToken ,getToken,removeToken} from '../Axios'
import axios from 'axios';

export const addCartItem = (id, quantity) => async (dispatch) => {
    console.log(id);
    try {
        dispatch(addCartItemRequest());

        const token = getToken();

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${token}`, // Include the token in the request headers

            }
        }
        const { data } = await axios.get(`https://e-com-back-end.onrender.com/${id}`,config);
        if (!data || !data.product) {
            throw new Error("Product not found");
        }

        dispatch(addCartItemSuccess({
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].image,
            stock: data.product.stock,
            quantity
        }));
    } catch (error) {
        // Handle the error appropriately
        // console.error(error.message);
        console.error(error.response?.data?.message || error.message || "Something went wrong");

    }
};
