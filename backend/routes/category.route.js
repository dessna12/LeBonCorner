const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// GET /api/categories
router.get('/', categoryController.getAll);

module.exports = router;
