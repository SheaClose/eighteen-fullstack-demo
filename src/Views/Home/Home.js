import React, { Component } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import { getProducts } from "../../Ducks/reducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    let sale = this.props.products.filter(c => c.sale).map(prod => {
      return (
        <Link key={prod.id} to={`/product/${prod.id}`}>
          <div className="card">
            <img src={prod.img_url} alt={prod.title} width="100" />
            <div>{prod.title}</div>
          </div>
        </Link>
      );
    });

    return (
      <div className="home-comp">
        <SideBar />
        <main className="container">
          <Link to="/store">
            <section className="splash-img" />
          </Link>

          <section className="card-container">{sale}</section>
        </main>
      </div>
    );
  }
}

let MSP = ({ products }) => ({ products });

export default connect(
  MSP,
  { getProducts }
)(Home);
