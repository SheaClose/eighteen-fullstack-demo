module.exports = {
  getProducts(req, res) {
    const { q } = req.query;
    const db = req.app.get("db");
    if (q) {
      return db.products
        .find()
        .then(prods => {
          let filtered = prods.filter(prod => {
            let includesQ = !!Object.values(prod).find(val => {
              if (typeof val === "string")
                return val.toLowerCase().includes(q.toLowerCase());
              else return false;
            });
            return includesQ;
          });
          return res.status(200).json(filtered);
        })
        .catch(console.log);
    }
    return db.products
      .find()
      .then(prods => {
        return res.status(200).json(prods);
      })
      .catch(console.log);
  },
  getProductsByCat(req, res) {
    const { cat } = req.params;
    const db = req.app.get("db");
    db.products
      .find({ category: cat })
      .then(prods => res.status(200).json(prods))
      .catch(console.log);
  }
};
