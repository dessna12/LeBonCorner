const db = require('../config/db.sql');

const categoryRepository = {
  findAll,
};

async function findAll() {
  const [rows] = await db.execute('SELECT * FROM Category');
  return rows;
}

module.exports = categoryRepository;
