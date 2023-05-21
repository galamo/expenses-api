const express = require("express");
const cors = require("cors");
const app = express();
let i = 0;
const data = [
  { date: new Date(), amount: 250, name: "Buy Books", category: "Other" },
  {
    date: new Date(new Date().setFullYear(2022)),
    amount: 1000,
    name: "Orange Juice",
    category: "Extraordinary",
  },
  {
    date: new Date(new Date().setFullYear(2022)),
    amount: 120,
    name: "Bread",
    category: "Food",
  },
  {
    date: new Date(new Date().setFullYear(2021)),
    amount: 400,
    name: "Pizza",
    category: "Financial",
  },
  {
    date: new Date(new Date().setFullYear(2022)),
    amount: 3000,
    name: "Pay bills",
    category: "Other",
  },
];
app.use(cors());
app.get("/expenses", (req, res) => {
  i++;
  if (i % 4 === 0) {
    setTimeout(() => {
      return res.status(409).send("error");
    }, 1500);
  } else {
    setTimeout(() => {
      res.json(data);
    }, 1500);
  }
});

app.listen(3500, () => {
  console.log("Api is running");
});
