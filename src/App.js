import React, { Component } from "react";
import routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />
          {routes}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
