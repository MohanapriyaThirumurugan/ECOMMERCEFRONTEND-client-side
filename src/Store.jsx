import { configureStore } from '@reduxjs/toolkit'
import productsreducer from '../src/Slice/ProductsSlice.jsx' 
import singleproductreducer from  '../src/Slice/Singleproduct.jsx'
import authreducer from './Slice/AuthSlice.jsx'
import cartreducer from './Slice/CartSlice.jsx'
import orderreducer from './Slice/OrderSlice.jsx'
import UserSlice from './Slice/UserSlice.jsx'
import searchslice from './Slice/Searchslice.jsx'

export default configureStore({
  reducer: {
    products:productsreducer,
    productsingle:singleproductreducer,
    authstate:authreducer,
    cartstate:cartreducer,
    orderstate:orderreducer,
    userstate:UserSlice,
    searchproduct:searchslice
  }

})


