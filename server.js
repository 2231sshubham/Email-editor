const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
const path = require("path")
var config = require('./config.json');
const Template = require("./models/templateModel");
var shopifyAPI = require('shopify-node-api');



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

  var nonce = RandomSource.getRandomValues()
  var Shopify = new shopifyAPI({
    shop: req.body.shop,
    shopify_api_key: config.api_key,
    shopify_shared_secret: config.api_secret,
    shopify_scope: config.scopes,
    redirect_uri: config.redirect_url,
    nonce: nonce
  });
  let auth_url = Shopify.buildAuthURL();
  res.redirect(auth_url)
})


app.get("/",function(req,res){
  var Shopify = new shopifyAPI({
  shop: req.body.shop,
  shopify_api_key: config.api_key,
  shopify_shared_secret: config.api_secret,
  shopify_scope: config.scopes,
  redirect_uri: config.redirect_url,
  nonce: nonce
  }),
  query_params = req.query;

  Shopify.exchange_temporary_token(query_params, function(err, data){
      if(!err){
        console.log("success");
      }
      else throw err;
  });
})


app.post("/api",( async (req,res) => {
  let counters = JSON.stringify(req.body.counters);
  let body = JSON.stringify(req.body.body);
  Template.where({ _id: id }).setOptions({upsert:true}).update({
     counters : counters,
     body : body
   })
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
