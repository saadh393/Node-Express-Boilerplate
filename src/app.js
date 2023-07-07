const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// set security HTTP headers
app.use(helmet());

// Parse Json
app.use(express.json());

// Parse urlencoded bodies
app.use(express.urlencoded({ extended: true }));

// Enable Cors
app.use(cors());

// Routes
app.use("/v1", require("./routes"));

// Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "Not Found",
  });
});

process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

// Error Middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err instanceof Array ? err[0].message : err + "",
  });
  // next(err)
});

module.exports = app;
