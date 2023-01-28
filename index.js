//imports
const express = require("express");
const userRouter = require("./Routes/user.route.js");
const quesRouter = require("./Routes/question.route.js");
const {connection} = require("./config.js/db");
require('dotenv').config();
const cors = require("cors");
const isAuthenticated = require("./middlewares/autenticate.middleware.js");
const { QuoteRouter } = require("./Routes/Quote.route.js");


//const variables
const app = express();
const port  = process.env.PORT || 8080;

//frontend coneection
app.use(express.json());
app.use(cors());

//home page
app.get("/",(req,res)=>{
  res.send("Welcome to QUiz app")
})

app.use("/user",QuoteRouter)
//all the routes 
app.use("/user",userRouter);
// app.use(isAuthenticated);
app.use("/ques",quesRouter);



//server
app.listen(port, async ()=>{
  try {
   let data = await connection;
   if(!data) console.log("error")
    console.log(`Server is running on port ${port}`)
  } catch (err) {
    console.log(err)
  }
})

