// const express = require("express");
// const favicon = require("express-favicon");
// const fs = require("fs");
// const path = require("path");

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const port = "3000";

// app.use(express.static(path.join(__dirname, "public")));

// app.use(favicon(__dirname + "/public/favicon.ico"));
// app.get("/test", (req, res) => {
//   console.log("Прошли по пути test");
//   console.log(req.body);
//   res.end("/test");
// });
// console.log(__dirname + "/public/favicon.ico");
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/public/index.html");
// });

// app.post("/test", (req, res) => {
//   console.log("рошли по пути post test");
//   console.log(req.body);

//   res.end("прошли post rest");
// });

// app.listen(port, () => {
//   console.log(`listen on port ${port}`);
// });

const express = require("express");
const favicon = require("express-favicon");
const fs = require("fs");

const ejs = require("ejs");

const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const { addListener } = require("process");

const port = "3000";

const routeTest = "/test";
const routeSlash = "/";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// app.use(
//   "css/bootstrap.css",
//   express.static(
//     path.join(
//       __dirname,
//       "public/css/bootstrap-5.3.2/dist/css/bootstrap.min.css"
//     )
//   )
// );
app.use(express.static(path.join(__dirname, "views")));
app.use(favicon(__dirname + "/public/favicon.ico"));
const filePath = path.join(__dirname, "tmp", "logger.txt");
fs.writeFile(filePath, "", (err) => {
  if (err) console.error(err);
  console.log("файл создан");
});
// app.get(routeTest, (req, res) => {
//   fs.appendFile(
//     filePath,
//     `\nЛогируем ping по адресу localhost:${port}${routeTest}. Время: ${new Date()}`,
//     (err) => {
//       if (err) console.error(err);
//       console.log("файл переписан");
//     }
//   );
//   res.end("/test");
// });
// app.post(routeTest, (req, res) => {
//   console.log("Прошли по пути post/test");
//   fs.appendFile(
//     filePath,
//     `\nЛогируем ping по адресу localhost:${port}${routeTest}. Время: ${new Date()}`,
//     (err) => {
//       if (err) console.error(err);
//       console.log("файл переписан");
//     }
//   );
//   res.end("post/test");
// });
// console.log(__dirname + "/public/favicon.ico");
// app.get(routeSlash, function (req, res) {
//   res.end(
//     fs.appendFile(
//       filePath,
//       `\nЛогируем ping по адресу localhost:${port}${routeSlash}. Время: ${new Date()}`,
//       (err) => {
//         if (err) console.error(err);
//         console.log("файл переписан");
//       }
//     )
//   );
// });
// app.post(routeSlash, function (req, res) {
//   fs.appendFile(
//     filePath,
//     `\nЛогируем ping по адресу localhost:${port}${routeSlash}. Время: ${new Date()}`,
//     (err) => {
//       if (err) console.error(err);
//       console.log("файл переписан");
//     }
//   );
// });

// app.listen(port, () => {
//   console.log(`listen on port ${port}`);
// });

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
