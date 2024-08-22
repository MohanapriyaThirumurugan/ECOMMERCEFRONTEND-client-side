import { createSlice } from "@reduxjs/toolkit";

const searchslice=createSlice({
    name:'searchproduct',
    initialState:{
        loading:false,
        productsearch:[],
        error:null,
        
    },
    reducers:{
        searchRequest(state) {
            return {
                ...state,
            loading: true
            };
        },
        searchSuccess(state, action) {
            return {
                ...state,
                loading: false,
                productsearch:action.payload.productsearch,
            };
        },
        searchFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload.errors
            };
        },
    }
})

const {actions,reducer}=searchslice;
export const{
    searchRequest,
    searchSuccess,
    searchFail
}=actions;
export default reducer;