const { pool } = require("../db");

async function listUsers(req, res) {
  try {
    const [rows] = await pool.query("SELECT id, username, email, created_at FROM users ORDER BY id DESC");
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error listando usuarios" });
  }
}

async function getUser(req, res) {
  try {
    const [rows] = await pool.query("SELECT id, username, email, created_at FROM users WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error obteniendo usuario" });
  }
}

async function createUser(req, res) {
  const { username, email } = req.body || {};
  if (!username || !email) return res.status(400).json({ error: "username y email son requeridos" });
  try {
    const [r] = await pool.execute(
      "INSERT INTO users (username, email) VALUES (?, ?)",
      [username, email]
    );
    res.status(201).json({ id: r.insertId, username, email });
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "username o email ya existe" });
    }
    console.error(e);
    res.status(500).json({ error: "Error creando usuario" });
  }
}

async function updateUser(req, res) {
  const { username, email } = req.body || {};
  try {
    const [r] = await pool.execute(
      "UPDATE users SET username = COALESCE(?, username), email = COALESCE(?, email) WHERE id = ?",
      [username ?? null, email ?? null, req.params.id]
    );
    if (!r.affectedRows) return res.status(404).json({ error: "Usuario no encontrado" });
    const [rows] = await pool.query("SELECT id, username, email, created_at FROM users WHERE id = ?", [req.params.id]);
    res.json(rows[0]);
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "username o email ya existe" });
    }
    console.error(e);
    res.status(500).json({ error: "Error actualizando usuario" });
  }
}

async function deleteUser(req, res) {
  try {
    const [r] = await pool.execute("DELETE FROM users WHERE id = ?", [req.params.id]);
    if (!r.affectedRows) return res.status(404).json({ error: "Usuario no encontrado" });
    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error borrando usuario" });
  }
}

module.exports = { listUsers, getUser, createUser, updateUser, deleteUser };
