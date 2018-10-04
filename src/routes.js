import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Views/Home/Home";
import Cart from "./Views/Cart/Cart";
import Product from "./Views/Product/Product";
import Store from "./Views/Store/Store";

export default (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/Cart" component={Cart} />
    <Route path="/Product/:id" component={Product} />
    <Route path="/Store/:cat" component={Store} />
    <Route path="/Store" component={Store} />
    <Route path="*" render={() => <h1>404 Not Found</h1>} />
  </Switch>
);
