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
    
    const updateCustomer = await User.findByIdAndUpdate(req.body.Customer,{$push:{ticket:createdTicket._id}})
    res.redirect("/")

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

router.post("/create", async(req,res)=>{

    req.body.Customer = req.session.user._id
    console.log(req.body)
    const createdTicket = await Ticket.create(req.body)
    res.redirect("/")
    const updateCustomer = await User.findByIdAndUpdate(req.body.Customer,{$push:{ticket:createdTicket._id}})
    

});









// Route to render the update form
router.get('/:ticketId/update', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const ticket=await Ticket.findById(req.params.ticketId)
   
    if (!ticket) {
      return res.redirect('/'); 
    }
    res.render('update.ejs', { ticket: ticket });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Route to handle updating the ticket
router.put('/:ticketId/update', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    console.log(req.body)
    const ticket = await Ticket.findByIdAndUpdate(req.params.ticketId,req.body);
    // if (!ticket) {
    //   return res.redirect('/'); 
    // }

 currentUser.set(req.body)

    // await ticket.save();

    res.redirect(`/ticket/${ticket._id}`);
  
});

module.exports = router;
//test