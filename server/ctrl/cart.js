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
  },
  async deleteFromCart(req, res) {
    const db = req.app.get("db");
    await db.query(`delete from cart where product_id = $1`, req.params.id);
    res.status(200).json("done");
  }
};
