exports.handlePSQLErrors = (err, req, res, next) => {
 // console.log(err);
  const badReqCode = ["42703", "23502", "22P02"];
  if (badReqCode.includes(err.code)) {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
};

exports.handle404s = (req, res, next) => {
  //console.log('404 errrMsg --->', res);
  res.status(404).send({ msg: "Not found" });
};

exports.handleInternalErr = (err, req, res, next) => {
  // console.log(err)
  res.send(500).send({ msg: "Internal server error" });
};

exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

//if there are three param e.g. req, res, next. It is just a function than deals with errors.

//if there are 4 params err, req, res, next. That is error handling middleware.
