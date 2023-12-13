const User = require("../models/user");

exports.form = (req, res) => {
  res.render("registerForm", { title: "Register" });
};

exports.submit = (req, res, next) => {
  User.findByEmail(req.body.dataForm.email, (err, user) => {
    if (err) return next(err);
    if (user) {
      console.log("Такой пользователь есть уже в базе");
    } else {
      User.create(req.body.dataForm, (err) => {
        if (err) return next(err);
        req.session.userEmail = req.body.dataForm.email;
        req.session.userName = req.body.dataForm.name;
        res.redirect("/");
      });
    }
  });
};
