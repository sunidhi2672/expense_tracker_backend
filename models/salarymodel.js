const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/tracker");

const salarySchema = mongoose.Schema({
  
  salaryAmount: {
    type: Number,
  },
  date: {
    type: String,
  } 
});

module.exports = mongoose.model("salary", salarySchema);
