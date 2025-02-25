
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // confirmPassword: {
  //   type: String,
  //   required: true,
  // },
  // email: {
   
  //       type: String,
  //       required: true,
  // },
  isAdmin: {
    type: Boolean
},
ticket: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
  },
],


});

const User = mongoose.model('User', userSchema);

module.exports = User;
