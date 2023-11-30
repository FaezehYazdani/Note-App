const mongoose = require('mongoose');  
  
  // to create a model
  // 1. create the schema
  // 2. craete the model using the schema

  const  noteSchema =  new mongoose.Schema({
    text: String,
    link: String
  });
  
module.exports = mongoose.model("Note", noteSchema);