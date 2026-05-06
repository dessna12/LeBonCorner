const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts.controller');
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', authMiddleware, postController.getAll)
router.get('/:id', postController.getById);
router.get('/user/:userId', postController.getByUser);
router.get('/category/:categoryId', postController.getByCategory);

router.post('/', postController.create);
router.put('/:id', postController.update);
router.delete('/:id', postController.remove);

module.exports = router;