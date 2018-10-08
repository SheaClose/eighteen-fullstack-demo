import React, { Component } from "react";
import { Consumer } from "../../ContextProducts";
import { CartConsumer } from "../../cartContext";
import axios from "axios";
import SideBar from "../../Components/SideBar/SideBar";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import "./Store.css";

class Store extends Component {
  state = {
    snackbarBool: false
  };
  addToCart = id => {
    return axios.post("/api/cart", { id }).then(({ data }) => {
      this.props.getCart();
      this.handleSnackBar(true);
    });
  };
  handleSnackBar = snackbarBool => {
    this.setState({ snackbarBool });
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
            : cat
              ? prod.category === cat
              : true;
        })
        .map(product => (
          <div className="my-card store-card" key={product.id}>
            <img src={product.img_url} alt={product.title} />
            <div>{product.desc}</div>
            <div>${product.price}</div>
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
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center"
                }}
                open={this.state.snackbarBool}
                autoHideDuration={4000}
                onClose={() => this.handleSnackBar(false)}
                ContentProps={{
                  "aria-describedby": "message-id"
                }}
                message={<span id="message-id">Added to cart</span>}
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => this.handleSnackBar(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                ]}
              />
              <div className="store-main">{prodCards(ctx.products)}</div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default function storeCartContet(props) {
  return (
    <CartConsumer>
      {context => <Store {...{ ...props, ...context }} />}
    </CartConsumer>
  );
}
