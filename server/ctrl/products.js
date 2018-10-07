module.exports = {
  getProducts(req, res) {
    const db = req.app.get("db");
    return db.products
      .find()
      .then(prods => {
        return res.status(200).json(prods);
      })
      .catch(console.log);
  }
};
