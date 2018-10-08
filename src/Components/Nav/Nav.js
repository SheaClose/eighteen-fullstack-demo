import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { CartConsumer } from "../../cartContext";
import CartIcon from "@material-ui/icons/ShoppingCart";
import TextField from "@material-ui/core/TextField";

import "./Nav.css";

class Nav extends Component {
  state = {
    query: ""
  };
  componentDidMount() {
    this.props.getCart();
  }

  handlChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  render() {
    return (
      <CartConsumer>
        {({ cart }) => {
          // let length = cart.reduce()
          return (
            <nav>
              <Link to="/">
                <div className="Logo">Holy Shirt</div>
              </Link>
              <div className="right_nav">
                <form
                  onSubmit={async e =>
                    (await e.preventDefault()) &
                    (await this.props.history.push(
                      `/store?query=${this.state.query}`
                    )) &
                    (await this.setState(() => ({ query: "" })))
                  }
                >
                  <TextField
                    label="Search For Product"
                    value={this.state.query}
                    onChange={this.handlChange}
                    id="standard-bare"
                    name="query"
                  />
                </form>
                <div style={{ alignSelf: "center" }}>
                  <Link
                    to="/cart"
                    style={{ textDecoration: "none", position: "relative" }}
                  >
                    <span role="img" aria-label="cart">
                      <CartIcon style={{ fontSize: "2.5em" }}>5</CartIcon>
                      <span
                        style={{
                          fontSize: ".8em",
                          color: "white",
                          position: "absolute",
                          right: "52%",
                          top: "-18.5px"
                        }}
                      >
                        {cart.length}
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </nav>
          );
        }}
      </CartConsumer>
    );
  }
}
export default withRouter(function withCartConsumer(props) {
  return (
    <CartConsumer>
      {context => <Nav {...{ ...props, ...context }} />}
    </CartConsumer>
  );
});
