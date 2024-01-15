exports.getField = (field) => {
  let value;
  field.forEach((element) => {
    value = req.body[element];
  });
  return value;
};

// getField(field);

function parseField(field) {
  return field.split(/\[|]/).filter((s) => s);
}

exports.required = (field, len) => {
  field = parseField(field);
  return (req, res, next) => {
    if (getField(req, field)) {
      next();
    } else {
      res.error("Required"); //готовит сообщение пользователю
      res.redirect("back");
    }
  };
};

exports.lengthAbove = (field, len) => {
  field = parseField(field);
  return (req, res, next) => {
    if (getField(req, field).length > len) {
      next();
    } else {
      res.error("Required"); //готовит сообщение пользователю
      res.redirect("back");
    }
  };
};
