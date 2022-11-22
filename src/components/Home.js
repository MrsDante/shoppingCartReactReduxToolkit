import React, { useEffect } from 'react';
import { getAllProducts, productsFetch } from '../features/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(getAllProducts);

  useEffect(() => {
     dispatch(productsFetch());
  }, []);

  console.log(products)

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate('/cart');
    console.log(product)
  };

  return (
    <div className="home-container">
      <>
      <h2>Новые поступления</h2>
      <div className="products">
        {products.map((product, index) => (
          <div key={product.id} className="product">
            <h3>{product.title}</h3>
            <img className="product-image"
             src={product.image} alt={product.title} />
            <div className="details">
              <span>{product.description}</span>
              <span className="price">${product.price}</span>
            </div>
            <button onClick={() => handleAddToCart(product)}>Добавить в корзину</button>
          </div>))}
      </div>
      </>
    </div>
  )
}

export default Home