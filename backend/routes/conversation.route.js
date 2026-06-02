const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversation.controller');
const isParticipant = require('../middlewares/isParticipant.middleware')

router.get('/', conversationController.getAll)
router.post('/', conversationController.create);
router.get('/:id', isParticipant, conversationController.getById);
router.post('/:id/message', isParticipant, conversationController.addMessage);
router.post('/:id/message/:messageId/reactions', isParticipant, conversationController.addReaction);

module.exports = router;