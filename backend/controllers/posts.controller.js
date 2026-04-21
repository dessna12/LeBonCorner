const postRepository = require("../repositories/posts.repository");

const postController = {
  getAll,
  getById,
  getByCategory,
  getByUser,
  create,
  update,
  remove,
};

async function getAll(req, res) {
  const posts = await postRepository.findAll();
  if (posts) {
    res.json(posts);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
}

async function getById(req, res) {
  const post = await postRepository.findById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
}


async function getByUser(req, res) {
  const posts = await postRepository.findByUser(req.params.userId);
  if (posts) {
    res.json(posts);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
}

async function getByCategory(req, res) {
  const posts = await postRepository.findByCategory(req.params.categoryId);
  if (posts) {
    res.json(posts);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
}

async function create(req, res) {
  const newPost = await postRepository.create(req.body);
  res.status(201).json(newPost);
}

async function update(req, res) {
    const updated = await postRepository.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Post non trouvé" });
    res.json(updated);
}

async function remove(req, res) {
    const deleted = await postRepository.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Post non trouvé" });
    res.status(204).send();
}

module.exports = postController;
