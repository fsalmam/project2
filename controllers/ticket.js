const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/show/:ticketId', (req, res) => {
  res.render('show.ejs');
});

router.get('/', (req, res) => {
  res.render('create.ejs');
});

router.post("/",async(req,res)=>{
    const createdTicket = await Ticket.create(req.body)
 
})


module.exports = router;
