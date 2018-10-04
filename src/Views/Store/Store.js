import React, { Component } from "react";
import { connect } from "react-redux";
import { getProductsByCat, getProducts } from "../../Ducks/reducer";
import axios from "axios";
import SideBar from "../../Components/SideBar/SideBar";

import "./Store.css";

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.getProds();
  }

  getProds = () => {
    if (!this.props.location.search) {
      if (this.props.match.params.cat) {
        this.props.getProductsByCat(this.props.match.params.cat);
      } else {
        this.props.getProducts();
      }
    }
  };

  clear() {
    this.props.getProducts().then(() => this.props.history.push("/store"));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.cat !== this.props.match.params.cat)
      this.getProds();
  }
  addToCart = id => {
    return axios.post("/api/cart", { id }).then(res => {
      alert("Item added to Cart");
    });
  };
  render() {
    let prodCards = this.props.products.map(product => {
      return (
        <div className="card store-card" key={product.id}>
          <img src={product.img_url} alt={product.title} />
          <h4>{product.desc}</h4>
          <h4>${product.price}</h4>
          <button onClick={() => this.addToCart(product.id)}>
            Add To Cart
          </button>
        </div>
      );
    });
    return (
      <div className="store-container">
        <SideBar />
        <div className="store-main">{prodCards}</div>
      </div>
    );
  }
}
export default connect(
  state => state,
  {
    getProductsByCat,
    getProducts
  }
)(Store);
