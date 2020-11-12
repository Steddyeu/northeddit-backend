const connection = require("../db/data/connection");

exports.removeArticleByArticleId = (article_id) => {
  //console.log('model_id', article_id)
  return connection
    .delete()
    .from("articles")
    .where("articles.article_id", "=", article_id)
    .then((delCount) => {
      //console.log('models --->', delCount)
      // if(delCount === 0) {
      //   return Promise.reject({status:404, msg: 'Article not Found'})
      // }
    });
};

exports.updateVotesByArticleId = (newVotes, artId) => {
  return connection
    .from("articles")
    .where("article_id", "=", artId)
    .update({ votes: newVotes })
    .returning("*")
    .then((updatedArticleVotes) => {
      //console.log('model --->', updatedArticleVotes)
      return updatedArticleVotes[0];
    });
};


exports.fetchArticleByArticleId = (artId) => {
return connection 
.from('articles')
.where('article_id', '=', artId)
.returning('*')
.then((article) => {
 // console.log('model--->', article[0])
  return article
})
}
