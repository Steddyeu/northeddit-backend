const connection = require('../db/data/connection')

exports.fetchUserUsername = (username) =>{
  //console.log('model username --->', username)
  return connection
  .select('*')
  .from('users')
  .where({username})
  .then((res) => {
    //console.log(res)
    return res[0]; 
  })
};