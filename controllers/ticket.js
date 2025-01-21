const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/show/:ticketId', (req, res) => {
  res.render('show.ejs');
});

router.get('/', (req, res) => {
  res.render('create.ejs');
});

module.exports = router;
