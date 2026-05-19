const db = require('../config/db.sql');

const userRepository = {
  findByEmail,
  findById,
  findByResetToken,
  create,
  updatePassword
};

async function findByEmail(email) {
  const [rows] = await db.execute('SELECT * FROM User WHERE email = ?', [email]);
  return rows[0] ?? null;
}

async function findById(id) {
  const [rows] = await db.execute('SELECT id, name, email, creation_date FROM User WHERE id = ?', [id]);
  return rows[0] ?? null;
}

async function findByResetToken(token){
  const [rows] = await db.execute('SELECT * FROM User WHERE reset_token = ?', [token])
  return rows[0] ?? null;
}

async function create({ name, email, password }) {
  const [result] = await db.execute(
    'INSERT INTO User (name, email, password) VALUES (?, ?, ?)',
    [name, email, password]
  );
  return findById(result.insertId);
}

async function updatePassword(id, hashPassword){
  await db.execute('UPDATE User SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id= ?', [hashPassword, id])
}

module.exports = userRepository;
