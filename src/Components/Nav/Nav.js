import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getProductsByQuery } from "../../Ducks/reducer";

import "./Nav.css";

class Nav extends Component {
  state = {
    query: ""
  };

  handlChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();
    this.props.getProductsByQuery(this.state.query).then(prods => {
      let q = this.state.query;
      this.setState({ query: "" }, () => {
        this.props.history.push(`/store?q=${q}`);
      });
    });
  };

  render() {
    return (
      <nav>
        <Link to="/">
          <div className="Logo">Holy Shirt</div>
        </Link>
        <div className="right_nav">
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="Search For Product"
              onChange={this.handlChange}
              type="text"
              name="query"
              value={this.state.query}
            />
          </form>
          <div>
            <Link to="/cart">
              <span role="img" aria-label="cart" className="cart">
                &#128722;
              </span>
            </Link>
            <span role="img" aria-label="user-icon" className="icon">
              &#x265F;
            </span>
          </div>
        </div>
      </nav>
    );
  }
}
export default withRouter(
  connect(
    state => state,
    { getProductsByQuery }
  )(Nav)
);
