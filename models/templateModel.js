const mongoose = require("mongoose");
const { Schema } = mongoose;


const tempSchema = new Schema({
  shop : String,
  counters : String,
  body : String
})
const Template = mongoose.model('Template', tempSchema);

module.exports = Template;
