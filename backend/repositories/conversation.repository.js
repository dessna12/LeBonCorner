const ConversationModel = require ('../models/conversation.model')


const conversationRepository = {
  findAll,
  findById,
  create,
  addMessage,
  addReaction
}

async function findAll(){
  const result = await ConversationModel.find()
  return result
}

async function findById(id){
  return await ConversationModel.findById(id)
}

async function create(data){
  const conversation = new ConversationModel(data)
  return conversation.save()
}

async function addMessage(conversationId, message){
  return await ConversationModel.findByIdAndUpdate(
    conversationId, 
    {$push : {messages : message }},
    { new : true }
  )
}

async function addReaction(conversationId, messageId, reaction){
  return await ConversationModel.findByIdAndUpdate(
    {_id: conversationId, 'messages_id': messageId },
    {$push :{ 'messages.$.reactions': reaction}},
    {new : true}
  )
}

module.exports = conversationRepository



