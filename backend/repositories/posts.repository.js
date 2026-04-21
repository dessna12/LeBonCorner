const db = require('../config/db.sql.js');

const postRepository = {
  findAll,
  findById,
  findByUser,
  findByCategory,
  create,
  update,
  remove
};

// Find all posts
async function findAll () {
  const [rows] = await db.execute('SELECT * FROM Post');
  return rows;
}

// Find post by Id
async function findById(id) {
  const [rows] = await db.execute('SELECT * FROM Post WHERE id = ?', [id]);
  return rows[0] ?? null;
}

// Find post by userId
async function findByUser(userId) {
  const [rows] = await db.execute('SELECT * FROM Post WHERE user_id = ?', [userId]);
  return rows;
}

// Find posts by userId
async function findByCategory(categoryId) {
  const [rows] = await db.execute('SELECT * FROM Post WHERE category_id = ?', [categoryId]);
  return rows;
}

// Create post
async function create({ title, description, price, location, publication_date, user_id, category_id }) {
  const [result] = await db.execute(
    `INSERT INTO Post (title, description, price, location, publication_date, user_id, category_id)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [title, description ?? null, price ?? null, location ?? null, publication_date ?? null, user_id, category_id ?? null]
  );
  return findById(result.insertId);
}

// Update post
async function update(id, { title, description, price, location, publication_date, category_id }) {
  const [result] = await db.execute(
    `UPDATE Post SET title = ?, description = ?, price = ?, location = ?, publication_date = ?, category_id = ?
     WHERE id = ?`,
    [title, description ?? null, price ?? null, location ?? null, publication_date ?? null, category_id ?? null, id]
  );
  if (result.affectedRows === 0) return null;
  return findById(id);
}

// Remove post
async function remove(id) {
  const [result] = await db.execute('DELETE FROM Post WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = postRepository;
