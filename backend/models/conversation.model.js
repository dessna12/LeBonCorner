const mongoose = require('mongoose')


const ReactionSchema = new mongoose.Schema({
  user_id: {type:Number, required:true}, 
  emoji: { type: String, required: true},
}, { _id:false })


const MessageSchema = new mongoose.Schema({
    sender_id : {type: Number, required: true}, 
    content: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    reactions : {type : [ReactionSchema], default:[]},
})


const ConversationSchema = new mongoose.Schema({
  post_id : {type:Number, required:true},
  participants: {type: [Number], required: true},
  messages : { type: [MessageSchema], default: []},
})


// Note : le nom du modèle doit être singulier majuscule cela converti automatiquement en singulier pluriel sur mongoDB
// Sinon vous pouvez précisez le nom de la collection en troisème paramètre dans des  '' ,
module.exports = mongoose.model('Conversation', ConversationSchema)

