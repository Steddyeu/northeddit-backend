const connection = require("../db/data/connection");

exports.fetchApi = () => {
  return connection
    .select("*")
    .from("api")
    .then((apiRes) => {
     //  console.log(apiRes);
      return apiRes;
    });
}