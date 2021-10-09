const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = express.Router();
const path = require("path")
var config = require('./config.json');
const Template = require("./models/templateModel");

const app = express();

name = config.name;
pass = config.pass;
var url = "mongodb+srv://"+name+":"+pass+"@email-editor.kre0j.mongodb.net/email-editor";
mongoose.connect(url)


const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'https://fierce-ocean-21330.herokuapp.com/']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))
app.use(express.json());


// app.use("/",require("./routes/templateRoute"));


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
  console.log(`Server started on port ${port}`);
});
