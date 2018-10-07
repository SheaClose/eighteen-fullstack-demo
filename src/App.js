import React, { Component } from "react";
import routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./ContextProducts";
import Nav from "./Components/Nav/Nav";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      readProducts: this.readProducts,
      getProducts: this.getProducts
    };
  }
  readProducts = () => {
    return this.products;
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
      <Provider value={this.state}>
        <BrowserRouter>
          <div className="App">
            <Nav />
            {routes}
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
