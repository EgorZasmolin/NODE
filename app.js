const express = require("express");
const favicon = require("express-favicon");
const fs = require("fs");

const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "test.db",
  define: {
    timestamps: false,
  },
});
const sqlite = require("sqlite3");

const ejs = require("ejs");

const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const { addListener } = require("process");

const port = "3000";

const routeTest = "/test";
const routeSlash = "/";

app.use(
  "/css/bootstrap.css",
  express.static(
    path.join(__dirname, "public/css/bootstrap-5.3.2/dist/css/bootstrap.css")
  )
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "views")));
app.use(favicon(__dirname + "/public/favicon.ico"));
const filePath = path.join(__dirname, "tmp", "logger.txt");
fs.writeFile(filePath, "", (err) => {
  if (err) console.error(err);
  console.log("файл создан");
});

app.get("/test", (req, res) => {});

app.post("/test", (req, res) => {
  addLine("Пинганули /test");
  console.log("прошли по пути test");
  res.end("прошли post test");
});

function addLine(line) {
  line = line + " timestamp: " + new Date().toLocaleString();
  fs.appendFile(
    path.join(__dirname + "/tmp/logger.txt"),
    line + "\n",
    (err) => {
      if (err) console.log(err);
    }
  );
}

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
sequelize
  .sync()
  .then((result) => {
    // console.log(result);
  })
  .catch((err) => console.log(err));

// User.create({
//   name: "Tom",
//   age: 35,
// })
//   .then((res) => {
//     const user = { id: res.id, name: res.name, age: res.age };
//   })
//   .catch((err) => console.log(err));

// User.create({
//   name: "Bob",
//   age: 31,
// })
//   .then((res) => {
//     const user = { id: res.id, name: res.name, age: res.age };
//     console.log(user);
//   })
//   .catch((err) => console.log(err));

User.findAll({ raw: true })
  .then((users) => {
    console.log(users);
  })
  .catch((err) => console.log(err));

//error handler
app.use(function (req, res, next) {
  const err = new Error("NO FOUND ERROR");
  err.code = 404;
  next(err);
});

//production error handler
// console.log(app.get("env"));
if (app.get("env") != "development") {
  app.use(function (err, req, res, next) {
    res.status = 404;
    let photo =
      "https://www.elegantthemes.com/blog/wp-content/uploads/2020/08/000-http-error-codes.png";
    res.render("error", { err, photo });
  });
} else {
  app.use(function (err, req, res, next) {
    console.log(app.get("env"), err.code, err.message);
  });
}

app.listen(port, function () {
  console.log("Сервер запущен порт " + port);
  addLine("Server started");
});
