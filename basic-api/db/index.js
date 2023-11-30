const mongoose = require('mongoose');
const {DATABASE_URL, DATABASE_NAME} = process.env;
mongoose.connect(`mongodb://${DATABASE_URL}/${DATABASE_NAME}`)
  .then(() => console.log('db Connected!'));





  
  