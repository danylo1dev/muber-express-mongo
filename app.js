const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL);

const app = express();
app.use(bodyParser.json());
routes(app);
app.use((err, req, res, next) => {
  res.send({ error: err.message });
});
module.exports = app;
