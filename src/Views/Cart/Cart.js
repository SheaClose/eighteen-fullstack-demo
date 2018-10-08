import React, { Component } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { CartConsumer } from "../../cartContext";
import Delete from "@material-ui/icons/Delete";

class Cart extends Component {
  deleteFromCart({ id }) {
    console.log("id: ", id);
    axios.delete(`/api/cart/${id}`).then(res => {
      this.props.getCart();
    });
  }
  render() {
    let cartContents = () => (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Description</TableCell>
              <TableCell numeric>Quantity</TableCell>
              <TableCell numeric>Price</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.cart.map(item => {
              return (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    <img src={item.img_url} height="50" alt="" />
                  </TableCell>
                  <TableCell>{item.desc}</TableCell>
                  <TableCell numeric>{item.quantity}</TableCell>
                  <TableCell numeric>${item.price}</TableCell>
                  <TableCell>
                    <Delete
                      onClick={() => this.deleteFromCart(item)}
                      style={{ cursor: "pointer" }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
    let quant = this.props.cart.reduce((tot, elem) => {
      return (tot += +elem.price * +elem.quantity);
    }, 0);

    return (
      <div className="">
        <div style={{ marginTop: "20px", padding: "20px 20px 0px 20px" }}>
          {cartContents()}
        </div>
        <Paper
          style={{
            display: "inline-block",
            padding: "10px",
            position: "relative",
            top: "-7.5px",
            zIndex: "-10",
            left: "27.5vw"
          }}
        >
          <div>quantity: ${quant}</div>
        </Paper>
      </div>
    );
  }
}
export default function withCartContext(props) {
  return (
    <CartConsumer>
      {context => <Cart {...{ ...context, ...props }} />}
    </CartConsumer>
  );
}
