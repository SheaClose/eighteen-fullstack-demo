import React, { Component } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import { Consumer } from "../../ContextProducts";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    let sale = products =>
      products.filter(c => c.sale).map(prod => (
        <Link key={prod.id} to={`/product/${prod.id}`}>
          <div className="my-card">
            <img src={prod.img_url} alt={prod.title} width="100" />
            <div>{prod.title}</div>
          </div>
        </Link>
      ));

    return (
      <Consumer>
        {ctx => (
          <div className="home-comp">
            <SideBar />
            <main className="my-container">
              <Link to="/store">
                <section className="splash-img" />
              </Link>

              <section className="card-container">{sale(ctx.products)}</section>
            </main>
          </div>
        )}
      </Consumer>
    );
  }
}

export default Home;
