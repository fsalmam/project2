const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket.js');


const User = require('../models/user.js');

router.get('/show/:ticketId', (req, res) => {
  res.render('show.ejs');
});

router.get('/create', (req, res) => {
  res.render('create.ejs');
});

router.post("/create", async(req,res)=>{
    req.body.Customer = req.session.user._id
    console.log(req.body)
    const createdTicket = await Ticket.create(req.body)
    res.redirect("/")
});




module.exports = router;
