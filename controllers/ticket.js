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
router.delete("/:ticketId", async(req,res)=>{
  try{
    await Ticket.findByIdAndDelete(req.params.ticketId)
    res.redirect("/")
  }
  catch(err){
    console.log(err)
  }
})



// //fatema 
// router.get('/:ticketId/update', async (req, res) => {
//   try {
//   const currentUser = await User.findById(req.session.user._id);
//   const ticket = currentUser.tickets.id(req.params.ticketId);
//   res.render('tickets/update.ejs', { ticket: ticket });
//   } catch (error) {
//   console.log(error);
//   res.redirect('/');
//   }
//   });


//   router.put('/:ticketId/update', async (req, res) => {
//   try {
//   const currentUser = await User.findById(req.session.user._id);
//   const ticket = currentUser.tickets.id(req.params.ticketId);
//   ticket.subject = req.body.subject;
//   ticket.type = req.body.type;
//   await currentUser.save();
//   res.redirect(`/users/${currentUser._id}/tickets/${ticket._id}`);
//   } catch (error) {
//   console.log(error);
//   res.redirect('/'); 
//   }
//   });

module.exports = router;
