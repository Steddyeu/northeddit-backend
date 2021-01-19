const {fetchApi} = require('../models/api-model')

exports.getApi = (req, res, next) => {
  fetchApi()
    .then((topics) => {
      res.status(200).send({ api });
    })
    .catch(next);
};