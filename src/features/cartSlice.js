import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
      addToCart(state, action) {
        const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

        if (itemIndex >= 0) {
            state.cartItems[itemIndex].cardQuabtity += 1;
            toast.info(`increased ${state.cartItems[itemIndex].title} cart quantity`, {
                position: 'bottom-left',
            })
        } else {
        const tempProduct = {...action.payload, cardQuabtity: 1};
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.title} added to cart`, {
            position: 'bottom-left',
        })
        }

        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      },
      removeFromCart(state, action) {
        const nextCartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload.id);

        state.cartItems = nextCartItems;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        
        toast.success(`${action.payload.title} removed from cart`, {
            position: 'bottom-left',
        })
      },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;