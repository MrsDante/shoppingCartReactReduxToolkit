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
        toast.success(`${action.payload.title} добавлен в корзину`, {
            position: 'bottom-left',
        })
        }

        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      },
      removeFromCart(state, action) {
        const nextCartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload.id);

        state.cartItems = nextCartItems;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

        toast.error(`${action.payload.title} удален из корзины`, {
            position: 'bottom-left',
        })
      },
      decreaseCart(state, action) {
        const itemIndex = state.cartItems.findIndex(
            cartItem => cartItem.id === action.payload.id
        )

        if (state.cartItems[itemIndex].cardQuabtity > 1) {
            state.cartItems[itemIndex].cardQuabtity -= 1;

            toast.info(`Количество ${action.payload.title} уменьшено на единицу`, {
                position: 'bottom-left',
            })
        } else if (state.cartItems[itemIndex].cardQuabtity === 1) {
            const nextCartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload.id);

            state.cartItems = nextCartItems;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    
            toast.error(`${action.payload.title} удален из корзины`, {
                position: 'bottom-left',
            });
        }
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      },
      clearCart(state, action) {
        state.cartItems = [];
        toast.error(`Корзина пуста`, {
            position: 'bottom-left',
        });
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      },
      getTotals(state, action) {
        let { total, quantity} = state.cartItems.reduce((cartTotal, cartItem) => {
            const { price, cardQuabtity } = cartItem;
            const itemTotal = price * cardQuabtity;

            cartTotal.total += itemTotal;
            cartTotal.quantity += cardQuabtity;

            return cartTotal;
        }, {
            total: 0,
            quantity: 0
        });

        state.cartTotalQuantity = quantity;
        state.cartTotalAmount = total;
        //let total = state.cartItems.reduce((acc, el) => acc += el.cardQuabtity, 0);
        //state.cartTotalQuantity = total;
      },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } = cartSlice.actions;

export default cartSlice.reducer;