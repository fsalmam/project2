const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket.js');
const User = require('../models/user.js');

router.get('/create', (req, res) => {
  res.render('create.ejs');
});

router.post("/create", async(req,res)=>{
    req.body.Customer = req.session.user._id
    console.log(req.body)
    const createdTicket = await Ticket.create(req.body)
    res.redirect("/")
    const updateCustomer = await User.findByIdAndUpdate(req.body.Customer,{$push:{ticket:createdTicket._id}})
    
});

//List the Tickets
router.get('/show/:userId', async(req, res) => {
  const foundUser = await User.findById(req.params.userId).populate("ticket")
  console.log(foundUser)

  //finduser by id then pass the tickets array to ejs
  res.render('show.ejs', {user:foundUser});
});

//Show the ticket details
router.get('/:ticketId', async(req, res) => {
  const foundTicket = await Ticket.findById(req.params.ticketId)
  console.log(foundTicket)
  res.render('ticketDtl.ejs', {ticket:foundTicket});
});

// Delete the Ticket





module.exports = router;
