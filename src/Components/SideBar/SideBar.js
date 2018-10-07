import React, { Component } from "react";
import { Consumer } from "../../ContextProducts";
import { Link } from "react-router-dom";
import "./SideBar.css";

class SideBar extends Component {
  render() {
    return (
      <Consumer>
        {() => {
          return (
            <div className="side-bar">
              <ul>
                <Link to="/store/jeans">
                  <li className="product-li">Jeans</li>
                </Link>
                <Link to="/store/shirt">
                  <li className="product-li">Shirts</li>
                </Link>
                <Link to="/store/dress">
                  <li className="product-li">Dresses</li>
                </Link>
                <Link to="/store/shoe">
                  <li className="product-li">Shoes</li>
                </Link>
              </ul>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default SideBar;
