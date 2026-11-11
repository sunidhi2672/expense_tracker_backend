const mongoose = require("mongoose");


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
