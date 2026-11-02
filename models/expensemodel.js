const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/tracker");

const expenseSchema = mongoose.Schema({
  expenseName: {
    type: String,
  },
  amount: {
    type: Number,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model("expense", expenseSchema);
