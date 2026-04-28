const express = require('express');
const router = express.Router()

const postRouter = require('./posts.route');
const conversationRouter = require('./conversation.route')
const authRouter = require('./auth.route')

router.use('/posts', postRouter);
router.use('/conversations', conversationRouter)
router.use('/auth', authRouter)

module.exports = router;
