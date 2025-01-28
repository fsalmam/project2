// =======================
// 1. IMPORTS
// =======================
const express = require('express');
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");
require('dotenv').config()
const mongoose = require("mongoose")

const User = require('./models/user.js');
const Tickets = require('./models/ticket.js');
const Message = require('./models/message.js');
const authController = require('./controllers/auth.js');

const session = require('express-session');
const ticketController = require('./controllers/ticket.js');



const passUserToView = require('./middleware/pass-to-user.js');
const isSignedIn = require("./middleware/is-signed-in.js")






// =======================
// 2. MIDDLEWARE
// =======================
app.use(express.urlencoded({ extended: false })); // parses the request body. Needed for the req.body
app.use(methodOverride("_method")); // Will change the methods for
app.use(morgan("dev")); // Logs the requests in the terminal

app.use('/images', express.static('./images'))


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView)






// =======================
// 3. CONNECTION TO DATABASE
// =======================
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{console.log("Connected to DATABSE")})
.catch(()=>{console.log("ERROR CONNECTING TO DB")})




// =======================
// 4. ROUTES
// =======================

app.get('/', (req, res) => {
  res.render('index.ejs');
});




app.use('/auth', authController);

app.use(isSignedIn)
app.use("/ticket",ticketController)







// =======================
// 5. LISTENING ON PORT 3000
// =======================
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
