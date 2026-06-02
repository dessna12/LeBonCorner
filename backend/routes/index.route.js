const express = require('express');
const router = express.Router()

const postRouter = require('./posts.route');
const conversationRouter = require('./conversation.route')
const authRouter = require('./auth.route')
const categoryRouter= require('./category.route')
const profileRouter=require('./profile.route')

router.use('/posts', postRouter);
router.use('/profile', profileRouter)
router.use('/conversations', conversationRouter)
router.use('/auth', authRouter)
router.use('/categories', categoryRouter)

module.exports = router;
