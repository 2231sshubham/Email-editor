const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
const path = require("path")
const request  = require("request-promise")
var qs = require('querystringify');
var config = require('./config.json');
var nodemailer = require('nodemailer');
var verifyCall = require('./tools/verify');
const Template = require("./models/templateModel");
const axios = require('axios');
const createApp = require("@shopify/app-bridge")
const {Redirect} = '@shopify/app-bridge/actions';
const open = require("open")




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


var installUrl=""
app.get("/authenticate", async function(req,res){
  shop = req.query.shop;
  var appId = config.api_key;
  var appSecret = config.api_secret;
  var appScope = config.scopes;
  var appDomain = "immense-bastion-38233.herokuapp.com"

  installUrl = `https://${shop}/admin/oauth/authorize?client_id=${appId}&scope=${appScope}&redirect_uri=https://${appDomain}/auth`;

  // res.redirect(installUrl);

  const accessToken = await Template.find({shop:shop},{_id:0,accessToken:1});
  if (accessToken.length > 0) {
        res.redirect('/');
    } else {
        //go here if you don't have the token yet
        res.redirect(installUrl);
    }

})


// ACCESS-TOKEN

var accessToken = "";
app.get('/auth',async function (req, res, next) {
    let securityPass = false;
    let appId = config.api_key;
    let appSecret = config.api_secret;
    let code = req.query.code;


    const regex = /^[a-z\d_.-]+[.]myshopify[.]com$/;

    if (shop.match(regex)) {
        console.log('regex is ok');
        securityPass = true;
    } else {
        //exit
        securityPass = false;
    }
    let query = qs.stringify(req.query);
    if (verifyCall.verify(query)) {
        //get token
        securityPass = true;
    } else {
        //exit
        securityPass = false;
    }

    if (securityPass && regex) {

        //Exchange temporary code for a permanent access token
        let accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
        let accessTokenPayload = {
            client_id: appId,
            client_secret: appSecret,
            code,
        };

        request.post(accessTokenRequestUrl, { json: accessTokenPayload })
            .then(async (accessTokenResponse) => {
                accessToken = accessTokenResponse.access_token;
                console.log(accessToken);
                await Template.updateOne({shop:shop},{token:accessToken},{
                  upsert : true
                });

                res.redirect('https://immense-bastion-38233.herokuapp.com');
            })
            .catch((error) => {
                res.status(error.statusCode).send(error.error.error_description);
            });
    }
    else {
        console.log("accessToken error");
    }

});


// app.get('/', function (req, res, next) {
//   open( 'https://immense-bastion-38233.herokuapp.com', function (err) {
//     if ( err ) throw err;
//   });
// });
//


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
