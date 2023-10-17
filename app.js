import express from "express";
const app = express();
const port = "3000";

app.get("/as", function (req, res) {
  res.send("Hello Students!!");
});
app.post("/as", function (req, res) {
  console.log(req.body);
});

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
