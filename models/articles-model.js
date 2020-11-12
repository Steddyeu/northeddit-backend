const connection = require("../db/data/connection");

exports.removeArticleByArticleId = (article_id) => {
  //console.log('model_id', article_id)
  return connection
    .delete()
    .from("articles")
    .where("articles.article_id", "=", article_id)
    .then((delCount) => {
      // console.log('models --->', delCount)
      return delCount;
    });
};

exports.updateVotesByArticleId = (newVotes, artId) => {
  return connection
    .from("articles")
    .where("article_id", "=", artId)
    .update({ votes: newVotes })
    .returning("*")
    .then((updatedArticleVotes) => {
      // console.log('model --->', updatedArticleVotes)
      return updatedArticleVotes[0];
    });
};

exports.fetchArticleByArticleId = (artId) => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", "=", artId)
    .then((article) => {
      // console.log('model--->', article[0])
      return article;
    });
};

exports.insertCommentByArticleId = (artId, newComment) => {
  //console.log('model comment', newComment)
  //console.log('model', artId)
  return connection
    .insert(newComment)
    .into("comments")
    .returning('*')
    .then((insertedComment) => {
    //  console.log("insertedComment ---> ", insertedComment);
      return insertedComment;
    });
};
