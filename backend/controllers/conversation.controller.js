const conversationRepository = require('../repositories/conversation.repository');

const conversationController = {
  getAll,
  getById,
  create,
  addMessage,
  addReaction,
};


async function getAll(req, res, next) {
  try {
    const conversations = await conversationRepository.findAll();
    res.json(conversations);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res) {
  const conversation = await conversationRepository.findById(req.params.id);
  if (!conversation) return res.status(404).json({ error: 'Conversation non trouvée' });
  res.json(conversation);
}

async function create(req, res) {
  const conversation = await conversationRepository.create(req.body);
  res.status(201).json(conversation);
}

async function addMessage(req, res) {
  const updated = await conversationRepository.addMessage(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Conversation non trouvée' });
  res.status(201).json(updated);
}

async function addReaction(req, res) {
    const updated = await conversationRepository.addReaction(
      req.params.id,
      req.params.messageId,
      req.body
    );
    if (!updated) return res.status(404).json({ error: 'Message non trouvé' });
    res.status(201).json(updated);
}

module.exports = conversationController;
