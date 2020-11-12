const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const {
  handle404s,
  handleInternalErr,
  handlePSQLErrors,
} = require("./controllers/errorhandling");

app.use(express.json());

app.use("/api", apiRouter);

app.use(handlePSQLErrors);
app.use(handle404s);
app.use(handleInternalErr);

module.exports = app;
