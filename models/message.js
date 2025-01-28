const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  messages: {
    type: String,
    required: true,

  },

  user: {
    type: String,
    required: true,
  }



});

 const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
