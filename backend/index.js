import fs from "node:fs/promises";
import express from "express";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const fileContent = await fs.readFile("./data/users.json", "utf8");
  const users = JSON.parse(fileContent);

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  res.status(200).json({
    message: "Login successful",
    user: { id: user.id, username: user.username },
  });
});

app.get("/expenses", async (req, res) => {
  const fileContent = await fs.readFile("./data/expenses.json");
  const expensesData = JSON.parse(fileContent);
  res.status(200).json({ expenses: expensesData });
});

app.post("/add-expense", async (req, res) => {
  const expenseData = req.body;
  const newExpense = {
    ...expenseData,
    id: (Math.random() * 1000).toString(),
  };
  const fileContent = await fs.readFile("./data/expenses.json", "utf8");
  const expensesData = JSON.parse(fileContent);
  expensesData.push(newExpense);
  await fs.writeFile("./data/expenses.json", JSON.stringify(expensesData));
  res.status(201).json({ message: "Expense is added" });
});

app.listen(3005, () => {
  console.log("backend server connected");
});
