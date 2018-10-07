import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Consumer } from "../../ContextProducts";
import "./Nav.css";

class Nav extends Component {
  state = {
    query: ""
  };

  handlChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  render() {
    return (
      <Consumer>
        {() => (
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
        )}
      </Consumer>
    );
  }
}
export default withRouter(Nav);
