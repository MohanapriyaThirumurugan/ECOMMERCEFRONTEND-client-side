import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    // slice name
    name: 'products',
    // different stage of action
    initialState: {
        loading: false,
        products:[],
        productsearch:[],
        error: null,
    },
    reducers: {
        productsRequest(state, action){
            return {
                loading: true
            }
        },
   
        productsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                products: action.payload.products,
            };
        },
        
        productsFail(state, action){
            return {
                loading: false,
                error:  action.payload.errors
            }
        },
        
       
        adminProductsRequest(state, action){
            return {
                ...state,
                loading: true,
                

            }
        },
        adminProductsSuccess(state, action){
            return {
                ...state,
                loading: false,
                products:action.payload.products,
            }
        },
        adminProductsFail(state, action){
            return {
                ...state,
                loading: false,
                error:action.payload
            }
        },
        clearError(state, action){
            return {
                ...state,
                error:  null
            }
        }
    }
});

const { actions, reducer } = productsSlice;

// action creater to invoke the action
export const { 
    productsRequest, 
    productsSuccess, 
    productsFail,
    adminProductsFail,
    adminProductsRequest,
    adminProductsSuccess,
    clearError

} = actions;

export default reducer;
