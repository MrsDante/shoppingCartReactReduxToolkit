import axios from "axios";

export default axios.create({
    baseURL: 'https://fakestoreapi.com',
});

//'https://fakestoreapi.com/products/

/*
export default axios.create({
    baseURL: 'http://www.omdbapi.com',
});
*/