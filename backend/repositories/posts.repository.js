const db = require('../config/db.sql.js');

const postRepository = {
  findAll,
  findById,
  findByUser,
  findByCategory,
  search,
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

// Search posts
async function search({ q, categoryId, minPrice, maxPrice }) {
  let sql = 'SELECT * FROM Post WHERE 1=1'
  const params = []

  if(q){
    sql+= 'AND (title LIKE ? OR description LIKE ?)';
    params.push(`%${q}%`, `%${q}%`)
  }

  if(categoryId){
    sql+= 'AND category_id=?';
    params.push(Number(categoryId))
  }

  if(minPrice){
    sql+= 'AND price >=?';
    params.push(Number(minPrice))
  }

  if(maxPrice){
    sql+= 'AND price <=?';
    params.push(Number(maxPrice))
  }

  const [rows]=db.execute(sql, params)
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
