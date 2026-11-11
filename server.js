// const cors = require("cors");
// const dotenv = require("dotenv");
// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();

// app.use(cors());
// app.use(express.json());

// const expensemodel = require("./models/expensemodel");

// const salarymodel = require("./models/salarymodel");

// app.get("/expense/get", async (req, res) => {
//   try {
//     const expenses = await expensemodel.find();
//     res.json(expenses);
//   } catch (error) {
//     res.status(500).json({
//       message: "Expense get nahi hua",
//       error: error.message,
//     });
//   }
// });
// const PORT = 4000;

// app.listen(PORT, () => {
//   console.log("server connected to port " + PORT);
// });

// mongoose
//   .connect("mongodb://localhost:27017/tracker")
//   .then(() => {
//     console.log("DB connected");
//   })
//   .catch((e) => {
//     console.log("mongoose error", e);
//   });

const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://expense-tracker-frontend-self-nine.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const expensemodel = require("./models/expensemodel");
const salarymodel = require("./models/salarymodel");

app.post("/tracker/create", async (req, res) => {
  console.log(req.body);
  try {
    const expenseData = req.body;

    const expense = await expensemodel.create({
      expenseName: expenseData.expenseName,
      amount: expenseData.amount,
      date: expenseData.date,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Expense create nahi hua",
      error: error.message,
    });
  }
});

app.get("/expense/get", async (req, res) => {
  try {
    const expenses = await expensemodel.find().sort({_id: -1});

    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Expense get nahi hua",
      error: error.message,
    });
  }
});

app.post("/salary/create", async (req, res) => {
  console.log(req.body);
  try {
    const salaryData = req.body;

    const salary = await salarymodel.create({
      salaryAmount: salaryData.salaryAmount,
      date: salaryData.date,
    });

    res.status(201).json(salary);
  } catch (error) {
    res.status(500).json({
      message: "salary create nahi hue",
      error: error.message,
    });
  }
});

app.get("/salary/get", async (req, res) => {
  try {
    const salary = await salarymodel.find();

    res.json(salary);
  } catch (error) {
    res.status(500).json({
      message: "salary get nahi hue",
      error: error.message,
    });
  }
});

app.delete("/expense/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteExpense = await expensemodel.findByIdAndDelete(id);

    if (!deleteExpense) {
      return res.status(404).json({
        message: "Expense nhi nila" ,
      });
    }
    res.json({
      message: "Expense deleted successfully",
      data : deleteExpense,
    });
  }catch (error) {
    res.status(500).json({
      message: "Expense delete nhi hua",
      error : error.message,
    });
  }
});
console.log(`${process.env.MONGODB_URI}`)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log("mongoose error", error);
  });

const PORT = 4000;

app.get("/tracker/total", async (req, res) => {
  try {
    const expenses = await expensemodel.find();
    const salary = await salarymodel.find();

    const totalExpense = expenses.reduce(
      (total, item) => total + Number(item.amount),
      0,
    );

    const totalSalary = salary.reduce(
      (total, item) => total + Number(item.salaryAmount),
      0,
    );

    const remainingBalance = totalSalary - totalExpense;

    res.json({
      totalSalary: totalSalary,
      totalExpense: totalExpense,
      remainingBalance: remainingBalance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Total calculate nahi hua",
      error: error.message,
    });
  }
});
app.listen(PORT, () => {
  console.log("server connected to port " + PORT);
});
