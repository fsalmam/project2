const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['Account Access Help', 'Card Services', 'Other'],
    required: true,
  },
  Subject: {
    type: String,
    enum: ['Forgot Password', 'Unlock My Account', 'Authentication Issues', 'Report Lost or Stolen Card',
        'Card Activation/Deactivation','Disputed or Fraudulent Transactions','Other'],

    required: true,
  },

  Customer: {
    type: mongoose.Schema.Types.ObjectId,
     ref:"User",
     required: true
},

Admin: [{
    type: mongoose.Schema.Types.ObjectId,
     ref:"User"
}],

message: {
  type: String
},



});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
