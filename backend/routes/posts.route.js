const express = require('express');
const router = express.Router();
const postRepository = require('../repositories/post.repository');

// 1. GET / : liste complète
router.get('/posts', async (req, res) => {
  const posts = await postRepository.findAll();
  res.json(posts);
});

// 2. GET /:id : un post par son id
router.get('/posts/:id', async (req, res) => {
  const post = await postRepository.findById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// 3. POST / : créer un post
router.post('/posts', async (req, res) => {
  const newPost = await postRepository.create(req.body);
  res.status(201).json(newPost);
});

// 4. PUT /:id : modifier un post
router.put('/posts/:id', async (req, res) => {
  const updatedPost = await postRepository.update(req.params.id, req.body);
  if (updatedPost) {
    res.json(updatedPost);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// 5. DELETE /:id : supprimer un post
router.delete('/posts/:id', async (req, res) => {
  const deleted = await postRepository.delete(req.params.id);
  if (deleted) {
    res.json({ message: 'Post deleted' });
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

module.exports = router;