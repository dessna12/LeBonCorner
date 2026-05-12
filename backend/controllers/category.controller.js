const categoryRepository = require('../repositories/category.repository');

const categoryController = {
  getAll,
};

async function getAll(req, res, next) {
  try {
    const categories = await categoryRepository.findAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
}

module.exports = categoryController;
