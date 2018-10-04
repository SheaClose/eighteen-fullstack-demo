import React, { Component } from "react";
import axios from "axios";
//import './Cart.css';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
  }
  componentDidMount() {
    axios.get("/api/cart").then(({ data }) => {
      console.log(" data: ", data);
      this.setState({ cart: data });
    });
  }

  render() {
    let cartContents = this.state.cart.map(item => {
      return (
        <div
          style={{ display: "flex", justifyContent: "space-evenly" }}
          key={item.id}
        >
          <img src={item.img_url} height="50" alt="" />
          <span>{item.desc}</span>
          <span>{item.quantity}</span>
          <span>${item.price}</span>
        </div>
      );
    });
    let quant = this.state.cart.reduce(
      (tot, elem) => (tot += elem.price * elem.quantity),
      0
    );
    console.log("quant: ", quant);
    return (
      <div className="">
        <div>{cartContents}</div>
        <h1>quantity: ${quant}</h1>
      </div>
    );
  }
}
export default Cart;
