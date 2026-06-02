const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate       = require('../validators/validator.middleware');
const profileSchema   = require('../validators/profile.schema');

router.use(authMiddleware);

router.get('/', userController.getProfile);
router.put('/', validate(profileSchema.update), userController.updateProfile);
router.delete('/', userController.deleteProfile);

module.exports = router;
