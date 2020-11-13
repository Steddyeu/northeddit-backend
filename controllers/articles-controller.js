const {
  removeArticleByArticleId,
  updateVotesByArticleId,
  fetchArticleByArticleId,
  insertCommentByArticleId,
  fetchCommentsByArticleId,
  fetchArticles,
} = require("../models/articles-model");

exports.deleteArticleByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  //console.log('controller ===>', req);
  removeArticleByArticleId(article_id)
    .then((delCount) => {
      if (delCount === 0) {
        res.status(404).send({ msg: "article_id does not exist to delete" });
      } else {
        res.sendStatus(204);
      }
    })
    .catch(next);
};

exports.patchVotesByArticleid = (req, res, next) => {
  // console.log('controller--->', req.params.article_id)
  // console.log('contVotes --->', req.body)
  const artId = req.params.article_id;
  const newVotes = req.body.votes;
  updateVotesByArticleId(newVotes, artId)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticleByArticleId = (req, res, next) => {
  //console.log('controller --->', req.params.article_id)
  const artId = req.params.article_id;
  fetchArticleByArticleId(artId)
    .then((article) => {
      //console.log('contorller --->', article)
      if (article.length === 0) {
        res.status(404).send({ msg: "Article not Found" });
      } else {
        res.status(200).send({ article });
      }
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const newComment = req.body;
  const artId = req.params.article_id;
  insertCommentByArticleId(artId, newComment).then((newComment) => {
    //console.log('newcomm', newComment[0])
    if (newComment[0].author === null) {
      res.status(400).send({ msg: "Row not Found" });
    } else {
      res.status(201).send({ newComment });
    }
  });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const artId = req.params.article_id;
  fetchCommentsByArticleId(artId)
    .then((comment) => {
      // console.log(comment);
      if (comment === undefined) {
        res.status(400).send({ msg: "article_id does not exist" });
      } else {
        res.status(200).send({ comment });
      }
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  //console.log("controller --->", req.query);
  const sort_by = req.query
  fetchArticles(sort_by)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
