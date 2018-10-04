import axios from "axios";
const GET_PRODUCTS = "GET_PRODUCTS";
const GET_PRODUCTS_BY_QUERY = "GET_PRODUCTS_BY_QUERY";
const GET_PRODUCTS_BY_CAT = "GET_PRODUCTS_BY_CAT";

const intialState = {
  products: []
};

export default function reducer(state = intialState, action) {
  console.log("action: ", action.payload);
  switch (action.type) {
    case GET_PRODUCTS + "_FULFILLED":
      return { ...state, products: action.payload };
    case GET_PRODUCTS_BY_QUERY + "_FULFILLED":
      return { ...state, products: action.payload };
    case GET_PRODUCTS_BY_CAT + "_FULFILLED":
      return { ...state, products: action.payload };
    default:
      return state;
  }
}

export function getProducts() {
  // console.log(axios.get("/api/products")); s
  return {
    type: GET_PRODUCTS,
    payload: axios.get("/api/products").then(({ data }) => {
      return data;
    })
  };
}

export function getProductsByQuery(val) {
  return {
    type: GET_PRODUCTS_BY_QUERY,
    payload: axios.get(`/api/products?q=${val}`).then(({ data }) => {
      return data;
    })
  };
}

export function getProductsByCat(cat) {
  return {
    type: GET_PRODUCTS_BY_CAT,
    payload: axios.get(`/api/products/${cat}`).then(({ data }) => data)
  };
}
