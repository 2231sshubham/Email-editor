// const express = require("express");
// const router = express.Router();
// const Template = require("../models/templateModel");
//
// router.route("/").post( async (req,res) => {
//   let counters = JSON.stringify(req.body.counters);
//   let body = JSON.stringify(req.body.body);
//   const newTemplate = new Template({
//     counters : counters,
//     body : body
//   });
//   newTemplate.save({isNew:false});
// })
//
// router.route("/").get((req,res) => {
//   Template.findOne()
//     .then(data => {res.send(data)})
// });
//
// module.exports = router;
