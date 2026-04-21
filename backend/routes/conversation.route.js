const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversation.controller');

router.get('/', conversationController.getAll)
router.get('/:id', conversationController.getById);
router.post('/', conversationController.create);
router.post('/:id/message', conversationController.addMessage);
router.post('/:id/message/:messageId/reaction', conversationController.addReaction);

module.exports = router;