import { configureStore } from '@reduxjs/toolkit' 
// import { cartSlice } from './cartSlice'
import cartReducer from './cartSlice'; 

export const store = configureStore({
  reducer: {
    cart : cartReducer,
  },
})