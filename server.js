const express = require("express");
const path = require("path");
const dbms = require("./dbms");

const app = express();

let logger = (req, res, next) => {
  let current_datetime = new Date();
  let formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();
  let method = req.method;
  let url = req.url;
  let status = res.statusCode;
  let log = `[${formatted_date}] ${method}:${url} ${status}`;
  console.log(log);
  next();
};

app.use(logger);
app.use(express.json());
app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "index.html"));
// });

app.get("/getCards.json", (req, res) => {
  const number = req.body.number;
  const url = "https://placeimg.com/600/300/animals";
  const data = dbms.getCardsForUser("Zara", number || 5);
  console.log(data);
  res.send(JSON.stringify(data));
});

app.post("/login", (req, res) => {
  console.log(req.query, req.body);
  const { username } = req.body;
  const user = dbms.getUser(username);
  if (user != null) {
    res.redirect("/app.html");
  } else {
    // TODO make an error, or just create a account lmao
    dbms.newUser(user, "1234567890");
    res.redirect("/app.html");
    // res.redirect("/login.html");
  }
});

app.post("/signup", (req, res) => {
  console.log(req.query, req.body);
  const { username, phoneNumber } = req.body;
  const validData = true;
  if (validData) {
    res.redirect("/app.html");
  } else {
    // TODO make an error, or just create a account lmao
    dbms.newUser(user, phoneNumber);
    res.redirect("/app.html");
    // res.redirect("/signup.html");
  }
});

app.get("*", (req, res) => {
  res.redirect("/404.html");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
