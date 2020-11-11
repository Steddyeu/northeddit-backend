const { fetchUserUsername } = require("../models/users-model");

exports.getUsersUsername = (req, res, next) => {
  //console.log('controller --->', req.params);
  const { username } = req.params;
  fetchUserUsername(username).then((user) => {
    res.status(200).send({ user });
  })
  .catch((err) => {
   next(err)
  })
};
