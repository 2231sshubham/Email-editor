const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
const path = require("path")
var url = require("url")
var config = require('./config.json');
var nodemailer = require('nodemailer');
var verifyCall = require('./tools/verify');
const Template = require("./models/templateModel");



const app = express();
var shop = "";
var from = "test.purpose.editor@gmail.com";
const transporter = nodemailer.createTransport({
port: 465,
host: "smtp.gmail.com",
   auth: {
        user: from,
        pass: 'thwk342?3',
     },
secure: true,
});


name = config.name;
pass = config.pass;
var url = "mongodb+srv://"+name+":"+pass+"@email-editor.kre0j.mongodb.net/email-editor";
mongoose.connect(url)

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.get("/authenticate",function(req,res){
  shop = req.query.shop;
  var appId = config.api_key;
  var appSecret = config.api_secret;
  var appScope = config.scopes;
  var appDomain = "immense-bastion-38233.herokuapp.com"

  var installUrl = `https://${shop}/admin/oauth/authorize?client_id=${appId}&scope=${appScope}&redirect_uri=https://${appDomain}`;

  res.redirect(installUrl);

})

var html

app.post("/api",( async (req,res) => {
  let counters = JSON.stringify(req.body.counters);
  let body = JSON.stringify(req.body.body);
  html = req.body.html;
  const ans = await Template.updateOne(
     {shop : shop },
     {
       counters : counters,
       body : body,
       html : html
     },
     {
       upsert : true
     }
   )
   res.send("Succesfully saved: " + shop);

  }));




app.get("/api",((req,res) => {

  const query  = Template.where({ shop: shop });

  query.findOne(function (err, template) {
    if (err) return handleError(err);
    if (template){
      res.send(template)
      }

    });
}));


app.post("/form",async function(req,res){
  const {to,subject,body} = req.body
  const html  = await Template.find({shop:shop},{html:1,_id:0});
  const mailData = {
    from: from,
    to: to,
    subject: subject,
    text: body,
    html : "<p>You've Succesfully sent an email</p>"
  };
    transporter.sendMail(mailData, function (err, info) {
      if(err)
      console.log(err)
    else
      console.log(info);
  });
})





app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});


app.listen(process.env.PORT || 3001,function(){
  console.log('Server started');
});
