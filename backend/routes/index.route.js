const express = require('express');
const router = express.Router()

const postRoutes = require('./posts.route');
conversationRoute = require('./conversation.route')

router.use('/posts', postRoutes);
router.use('/conversations', conversationRoute)

module.exports = router;
