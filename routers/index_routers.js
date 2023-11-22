const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
router.post("/", function (req, res) {});

router.get("/register", function (req, res) {});
router.post("/register", function (req, res) {});

module.exports = router;

//production error handler
// console.log(app.get("env"));
// if (app.get("env") != "development") {
//     app.use(function (err, req, res, next) {
//       res.status = 404;
//       let photo =
//         "https://www.elegantthemes.com/blog/wp-content/uploads/2020/08/000-http-error-codes.png";
//       res.render("error", { err, photo });
//     });
//   } else {
//     app.use(function (err, req, res, next) {
//       console.log(app.get("env"), err.code, err.message);
//     });
//   }
