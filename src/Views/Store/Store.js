import React, { Component } from "react";
import { Consumer } from "../../ContextProducts";
import axios from "axios";
import SideBar from "../../Components/SideBar/SideBar";

import "./Store.css";

class Store extends Component {
  addToCart = id => {
    return axios.post("/api/cart", { id }).then(res => {
      alert("Item added to Cart");
    });
  };
  render() {
    let prodCards = products =>
      products
        .filter(prod => {
          let search = this.props.location.search.split("=").pop();
          let { cat } = this.props.match.params;
          return search
            ? !!Object.values(prod).find(
                val =>
                  typeof val === "string"
                    ? val.toLowerCase().includes(search.toLowerCase())
                    : false
              )
            : console.log("cat", cat) || prod.category === cat;
        })
        .map(product => (
          <div className="card store-card" key={product.id}>
            <img src={product.img_url} alt={product.title} />
            <h4>{product.desc}</h4>
            <h4>${product.price}</h4>
            <button onClick={() => this.addToCart(product.id)}>
              Add To Cart
            </button>
          </div>
        ));

    return (
      <Consumer>
        {ctx => {
          return (
            <div className="store-container">
              <SideBar />
              <div className="store-main">{prodCards(ctx.products)}</div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default Store;
