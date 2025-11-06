const { pool } = require("../db");

async function getProducts(req, res) {
  try {
    const [rows] = await pool.query("SELECT id, name, price FROM products");
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error obteniendo productos" });
  }
}

async function addProduct(req, res) {
  const { name, price } = req.body || {};
  if (!name) return res.status(400).json({ error: "name requerido" });
  try {
    const [r] = await pool.execute(
      "INSERT INTO products (name, price) VALUES (?, ?)",
      [name, price ?? 0]
    );
    res.status(201).json({ id: r.insertId, name, price: price ?? 0 });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error creando producto" });
  }
}

module.exports = { getProducts, addProduct };
