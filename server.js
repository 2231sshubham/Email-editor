const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
const path = require("path")
var config = require('./config.json');
const Template = require("./models/templateModel");



const app = express();

name = config.name;
pass = config.pass;
var url = "mongodb+srv://"+name+":"+pass+"@email-editor.kre0j.mongodb.net/email-editor";
mongoose.connect(url)

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


// app.use("/",require("./routes/templateRoute"));

app.get("/Oauth",function(req,res){
  res.send("You've arrived at Oauth");
})

// 
// app.get("/",function(req,res){
//
// })


app.post("/api",( async (req,res) => {
  let counters = JSON.stringify(req.body.counters);
  let body = JSON.stringify(req.body.body);
  const newTemplate = new Template({
    counters : counters,
    body : body
  });
  newTemplate.save({isNew:false});
}));

app.get("/api",((req,res) => {
  Template.findOne()
    .then(data => {res.send(data)})
}));;


app.use(express.static(path.join(__dirname, 'frontend/build')));
// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// if (process.env.NODE_ENV === 'production') {
//   // Serve any static files
//
// }

app.listen(process.env.PORT || 3001,function(){
  console.log('Server started');
});
