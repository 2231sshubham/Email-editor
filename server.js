const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
const path = require("path")
var config = require('./config.json');
var verifyCall = require('./tools/verify');
const Template = require("./models/templateModel");



const app = express();
var shop = "";

name = config.name;
pass = config.pass;
var url = "mongodb+srv://"+name+":"+pass+"@email-editor.kre0j.mongodb.net/email-editor";
mongoose.connect(url)

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


// app.use("/",require("./routes/templateRoute"));

app.get("/Oauth",function(req,res){
  shop = req.query.shop;
  var appId = config.api_key;
  var appSecret = config.api_secret;
  var appScope = config.scopes;
  var appDomain = "https://immense-bastion-38233.herokuapp.com/"

  var installUrl = `https://${shop}/admin/oauth/authorize?client_id=${appId}&scope=${appScope}&redirect_uri=https://${appDomain}/auth`;

  const query  = Template.where({ shop : shop });
  query.findOne(function (err, template) {
    if (err) return handleError(err);
    if (!template) {
      res.redirect('/');
    }
    else{
      res.redirect(installUrl);
    }
  });
})

//
router.get('/auth', function (req, res, next) {
    let securityPass = false;
    let code = req.query.code;


    const regex = /^[a-z\d_.-]+[.]myshopify[.]com$/;

    if (shop.match(regex)) {
        console.log('regex is ok');
        securityPass = true;
    } else {
        //exit
        securityPass = false;
    }

    // 1. Parse the string URL to object
    let urlObj = url.parse(req.url);
    // 2. Get the 'query string' portion
    let query = urlObj.search.slice(1);
    if (verifyCall.verify(query)) {
        //get token
        console.log('get token');
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
            .then((accessTokenResponse) => {
                let accessToken = accessTokenResponse.access_token;
                console.log('shop token ' + accessToken);

                res.redirect('/');
            })
            .catch((error) => {
                res.status(error.statusCode).send(error.error.error_description);
            });
    }
    else {
        console.log("Error occured");
    }

});



app.post("/api",( async (req,res) => {
  let counters = JSON.stringify(req.body.counters);
  let body = JSON.stringify(req.body.body);
  const newTemplate = new Template({
    shop : shop,
    counters : counters,
    body : body
  });
  newTemplate.save({isNew:false});
}));

app.get("/api",((req,res) => {
  Template.findOne({shop : shop})
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
