const NotFoundError = require('../errors/NotFoundError');
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
    res.status(200).json(conversations);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res) {
  try {
    const conversation = await conversationRepository.findById(req.params.id);
    if (!conversation) throw NotFoundError('Conversation')
    res.json(conversation);
  }catch (err){
    next(err)
  }
}

async function create(req, res) {
  const conversation = await conversationRepository.create(req.body);
  res.status(201).json(conversation);
}

async function addMessage(req, res) {
  try {
    const updated = await conversationRepository.addMessage(req.params.id, req.body);
    if (!updated) throw NotFoundError('Conversation')
    res.status(201).json(updated);
  }catch(err) {
    next(err)
  }
}

async function addReaction(req, res) {
  try {
    const updated = await conversationRepository.addReaction(
        req.params.id,
        req.params.messageId,
        req.body
      );
      if (!updated) throw NotFoundError('Message')
      res.status(201).json(updated);
  } catch(err){
    next(err)
  }
}

module.exports = conversationController;
