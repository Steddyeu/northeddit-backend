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
    .returning("*")
    .then((insertedComment) => {
      //  console.log("insertedComment ---> ", insertedComment);
      return insertedComment;
    });
};

exports.fetchCommentsByArticleId = (artId) => {
  // console.log('artId ---->', artId)
  return connection
    .select("*")
    .from("comments")
    .where("article_id", "=", artId)
    .then((comments) => {
      // console.log("models --->", comments);
      return comments[0];
    });
};

exports.fetchArticles = ({ sort_by, order, query }) => {
  //console.log('model--->', artId)
  return connection
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.topic",
      "articles.created_at",
      "articles.votes"
    )
    .from("articles")
    .count("comment_id AS comment_count")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order || "asc")
    .then((articles) => {
      if (query)
        // console.log("model ---->", articles);
        return articles;
    });
};
