const express = require("express");
const cors = require("cors");
const body = require("body-parser");

const app = express();
let i = 0;
let j = 0;
let s = 0;
const users = [
  {
    email: "dev@gmail.com",
    password: "dev1234",
    firstName: "dev",
    lastName: "rozental",
  },
];
let data = [
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
  setTimeout(() => {
    res.json(data);
  }, 1500);
  //   i++;
  //   if (i % 4 === 0) {
  //     setTimeout(() => {
  //       return res.status(409).send("error");
  //     }, 1500);
  //   } else {
  //     setTimeout(() => {
  //       res.json(data);
  //     }, 1500);
  //   }
});

app.get("/years", (req, res) => {
  setTimeout(() => {
    res.json([2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]);
  }, 6000);
  //   j++;
  //   if (j % 3 === 0) {
  //     setTimeout(() => {
  //       return res.status(409).send("error");
  //     }, 500);
  //   } else {
  //     setTimeout(() => {
  //       res.json([2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]);
  //     }, 6000);
  //   }
});

app.get("/categories", (req, res) => {
  //   s++;
  setTimeout(() => {
    res.json(["Other", "Drinks", "Bills", "Finance"]);
  }, 1500);
  //   if (s % 3 === 0) {
  //     setTimeout(() => {
  //       return res.status(409).send("error");
  //     }, 1500);
  //   } else {
  //     setTimeout(() => {
  //       res.json(["Other", "Drinks", "Bills", "Finance"]);
  //     }, 1500);
  //   }
});

app.post("/expense", (req, res) => {
  if (!req.body.name) {
    return res.status(400).send();
  }
  data.push(req.body);

  res.json({ message: "success" });
});

app.post("/delete-expense", (req, res) => {
  if (!req.body.name) {
    return res.status(400).send();
  }
  data = data.filter(
    (item) => item.name.toLowerCase() !== req.body.name.toLowerCase()
  );
  res.json({ message: "deleted successfully" });
});

app.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("missing email or password");
  }
  const currentUser = users.find(
    (user) =>
      user.email.toLowerCase() === req?.body?.email?.toLowerCase() &&
      user.password.toLowerCase() === req?.body?.password?.toLowerCase()
  );
  if (currentUser) {
    return res.json({ message: "login successfully" });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.post("/register", (req, res) => {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.firstName ||
    !req.body.lastName
  ) {
    return res
      .status(400)
      .send("missing email or password or firstName or lastName");
  }
  const currentUser = users.find(
    (user) => user.email.toLowerCase() === req?.body?.email?.toLowerCase()
  );

  if (currentUser) {
    return res.status(409).json({ message: "user already exist" });
  } else {
    users.push(req.body);
    return res.json({ message: "register successfully" });
  }
});

app.get("/expenses/stats", (req, res) => {
  const chartYearsResult = data.reduce((chartDataObj, currentExpense) => {
    const { date, amount } = currentExpense;
    const year = new Date(date).getFullYear();
    if (!chartDataObj[year]) {
      chartDataObj[year] = Number(amount);
    } else {
      chartDataObj[year] = chartDataObj[year] + Number(amount);
    }
    return chartDataObj;
  }, {});

  const labels = Object.keys(chartYearsResult);
  const d = Object.values(chartYearsResult);

  res.json({ labels, data: d });
});

app.listen(3600, () => {
  console.log("Api is running");
});
