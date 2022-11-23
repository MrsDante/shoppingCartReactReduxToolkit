import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, decreaseCart, removeFromCart } from '../features/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  }

console.log(cart)
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      { cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>В корзине ничего нет</p>
          <div className="start-shopping">
            <Link to="/">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              fill="currentColor" 
              className="bi bi-arrow-left-circle" 
              viewBox="0 0 16 16">
              <path 
                fillRule="evenodd" 
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg>
              <span>Перейти к покупкам</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Товар</h3>
            <h3 className="price">Цена</h3>
            <h3 className="quantity">Количество</h3>
            <h3 className="total">Итого</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems?.map(cartItem => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-product">
                  <img src={cartItem.image} alt={cartItem.title} />
                  <div>
                    <h3>{cartItem.title}</h3>
                    <p>{cartItem.description}</p>
                    <button onClick={() => handleRemoveFromCart(cartItem)}>Удалить</button>
                  </div>
                </div>
                <div className="cart-product-price">${cartItem.price}</div>
                <div className="cart-product-quantity">
                  <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                  <div className="count">{cartItem.cardQuabtity}</div>
                  <button onClick={() => handleIncreaseCart(cartItem)}>+</button>
                </div>
                <div className="cart-product-total-price">
                  ${cartItem.price * cartItem.cardQuabtity}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="clear-cart">Очистить корзину</button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Итог</span>
                <span className="amount">${cart.cartTotalAmount}</span>
              </div>
              <p>Расчет доставки будет доступен при оформлении заказа</p>
              <button>Оформить заказ</button>
              <div className="continue-shopping">
            <Link to="/">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              fill="currentColor" 
              className="bi bi-arrow-left-circle" 
              viewBox="0 0 16 16">
              <path 
                fillRule="evenodd" 
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg>
              <span>Продолжить покупки</span>
            </Link>
          </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart