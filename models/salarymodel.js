const mongoose = require("mongoose");


const salarySchema = mongoose.Schema({
  
  salaryAmount: {
    type: Number,
  },
  date: {
    type: String,
  } 
});

module.exports = mongoose.model("salary", salarySchema);
