const express = require("express");
const path = require("path");

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

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "index.html"));
// });

app.get("/getCards.json", (req, res) => {
    const number = req.body.number;
    const url = "https://placeimg.com/600/300/animals";
    const data = [
        {
            name: "Bob",
            description: "He's a hot dog",
            img: url,
        },
        {
            name: "Ligma",
            description: "Ballz",
            img: url,
        },
    ];
  res.send(JSON.stringify(data));
});

app.post("/login", (req, res) => {
  console.log(req.query, req.body);
  const { username } = req.body;
  const nameInDB = true;
  if (nameInDB) {
    res.redirect("/app.html");
  } else {
    // TODO make an error, or just create a account lmao
    res.redirect("/login.html");
  }
});

app.post("/signup", (req, res) => {
  console.log(req.query, req.body);
  const { username, phoneNumer } = req.body;
  const validData = true;
  if (validData) {
    res.redirect("/app.html");
  } else {
    // TODO make an error, or just create a account lmao
    res.redirect("/signup.html");
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
