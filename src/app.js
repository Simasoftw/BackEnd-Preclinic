const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes")();
const app = express();
const cors = require("cors");


app.use(cors());
app.use(bodyParser({ limit: "600mb" }));
app.use(bodyParser.json());

// Load api routes
app.use("/", routes);

//Handling errors
app.use(async (error, req, res, next) => {
  console.error(`${req.method} ${req.url} ${error.message} ${error.stack}`);

  try {
    await console.error(
      `Error:\n*${req.method} ${req.url} \n*Stack Traze: * ${error.message} ${error.stack}`
    );
  } catch (error) {
    console.error(error);
  }
  try {
    return res.status(500).send({ errors: [{ message: error.message }] });
  } catch (error) {
    return next(error);
  }
});

module.exports = app;
