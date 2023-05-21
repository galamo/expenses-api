const express = require("express");
const cors = require("cors");
const body = require("body-parser");

const app = express();
let i = 0;
let j = 0;
let s = 0;
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
app.use(body.json());

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

app.get("/years", (req, res) => {
  j++;
  if (j % 3 === 0) {
    setTimeout(() => {
      return res.status(409).send("error");
    }, 1500);
  } else {
    setTimeout(() => {
      res.json([2019, 2020, 2021, 2022, 2023, 2024, 2025]);
    }, 1500);
  }
});

app.get("/categories", (req, res) => {
  s++;
  if (s % 3 === 0) {
    setTimeout(() => {
      return res.status(409).send("error");
    }, 1500);
  } else {
    setTimeout(() => {
      res.json(["Other", "Drinks", "Bills", "Finance"]);
    }, 1500);
  }
});

app.post("/expense", (req, res) => {
  data.push(req.body);
  res.send("Success");
});

app.listen(3500, () => {
  console.log("Api is running");
});
