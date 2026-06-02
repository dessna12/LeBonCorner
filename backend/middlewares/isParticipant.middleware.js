const conversationRepository = require('../repositories/conversation.repository');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');

async function isParticipant(req, res, next) {
  try {
    const conversation = await conversationRepository.findById(req.params.id);

    if (!conversation) {
      return next(new NotFoundError('Conversation'));
    }

    if (!conversation.participants.includes(req.user.id)) {
      return next(new UnauthorizedError('Accès refusé à cette conversation'));
    }

    req.conversation = conversation;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = isParticipant;
