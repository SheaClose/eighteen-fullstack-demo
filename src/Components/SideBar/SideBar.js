import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
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
  }
}
export default SideBar;
