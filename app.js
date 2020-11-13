const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const {
  handle404s,
  handleInternalErr,
  handlePSQLErrors,
  handle405s,
} = require("./controllers/errorhandling");

app.use(express.json());

app.use("/api", apiRouter);

app.use(handlePSQLErrors);
app.use(handle404s);
app.use(handleInternalErr);
app.use(handle405s);
module.exports = app;
