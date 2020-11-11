
//exports.handlePSQLErrors = (err, req, res, next) => {};

exports.handle404s = (req, res, next) => {
  //console.log(error);
  res.status(404).send({ msg: "Not found" });
};

exports.handleInternalErr = (err, req, res, next) => {
     //console.log(err)
    res.send(500).send({ msg: 'Internal server error' })
}




//if there are three param e.g. req, res, next. It is just a function than deals with errors.

//if there are 4 params err, req, res, next. That is error handling middleware. 



