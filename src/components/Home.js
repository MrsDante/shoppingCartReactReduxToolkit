import React, { useEffect } from 'react';
import { getAllProducts, productsFetch } from '../features/productSlice';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(getAllProducts);

  useEffect(() => {
     dispatch(productsFetch())
  }, []);

  console.log(products)

  return (
    <div>Home</div>
  )
}

export default Home