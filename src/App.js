import React, { Component } from "react";
import routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./ContextProducts";
import { CartProvider } from "./cartContext";
import Nav from "./Components/Nav/Nav";
import axios from "axios";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartContext: {
        cart: [],
        getCart: this.getCart
      },
      products: [],
      readProducts: this.readProducts,
      getProducts: this.getProducts
    };
  }
  readProducts = () => {
    return this.products;
  };
  getCart = () => {
    axios.get("/api/cart").then(({ data }) => {
      let cart = Object.values(
        data.reduce((acc, item) => {
          !acc[item.id]
            ? (acc[item.id] = item)
            : (acc[item.id].quantity = +acc[item.id].quantity + 1);
          return acc;
        }, {})
      );
      this.setState({
        cartContext: { ...this.state.cartContext, ...{ cart } }
      });
    });
  };
  getProducts = () => {
    axios
      .get("/api/products")
      .then(({ data }) => this.setState(() => ({ products: data })));
  };

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <CartProvider value={this.state.cartContext}>
        <Provider value={this.state}>
          <BrowserRouter>
            <div className="App">
              <Nav />
              {routes}
            </div>
          </BrowserRouter>
        </Provider>
      </CartProvider>
    );
  }
}

export default App;
