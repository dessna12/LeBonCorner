const db = require('../config/db.sql');

const userRepository = {
  findByEmail,
  findById,
  create,
};

async function findByEmail(email) {
  const [rows] = await db.execute('SELECT * FROM User WHERE email = ?', [email]);
  return rows[0] ?? null;
}

async function findById(id) {
  const [rows] = await db.execute('SELECT id, name, email, creation_date FROM User WHERE id = ?', [id]);
  return rows[0] ?? null;
}

async function create({ name, email, password }) {
  const [result] = await db.execute(
    'INSERT INTO User (name, email, password) VALUES (?, ?, ?)',
    [name, email, password]
  );
  return findById(result.insertId);
}

module.exports = userRepository;
