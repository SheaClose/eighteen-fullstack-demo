module.exports = {
  addToCart(req, res) {
    const db = req.app.get("db");
    db.addToCart([req.sessionID, req.body.id, 1])
      .then(cart => {
        return res.status(200).json(cart);
      })
      .catch(console.log);
  },
  getFromCart(req, res) {
    const db = req.app.get("db");
    db.getFromCart(req.sessionID)
      .then(cart => {
        res.status(200).json(cart);
      })
      .catch(console.log);
  }
};
