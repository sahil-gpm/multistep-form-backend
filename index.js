const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv')
const connectToMongo = require('./db/mongo')

dotenv.config();

const app = express();

// adding middlewares
app.use(
  cors({
    origin:process.env.FRONTEND,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use(express.json());

//initiating connectio to mongo 
connectToMongo()

// for testing connection 
app.get("/",(req,res)=>{
    res.json({msg:"hello"});
})

//adding the routes for user creation and fetching user data
app.use("/api/",require('./routes/user_create_del'))

//app listen
app.listen(3001, () => {
  console.log("Listening on port 3001");
});
