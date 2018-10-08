module.exports = {
  async getProducts(req, res) {
    const db = req.app.get("db");
    let prods = await db.products.find();
    return res.status(200).json(prods);
  }
};
