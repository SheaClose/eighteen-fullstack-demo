module.exports = {
  addToCart(req, res) {
    const db = req.app.get("db");
    console.log("[req.sessionID, req.body.id, 1]: ", [
      req.sessionID,
      req.body.id,
      1
    ]);
    db.addToCart([req.sessionID, req.body.id, 1])
      .then(cart => {
        console.log("cart: ", cart);
        return res.status(200).json(cart);
      })
      .catch(console.log);
  },
  getFromCart(req, res) {
    const db = req.app.get("db");
    db.getFromCart(req.sessionID)
      .then(cart => {
        console.log("cart: ", cart);
        res.status(200).json(cart);
      })
      .catch(console.log);
  }
};
