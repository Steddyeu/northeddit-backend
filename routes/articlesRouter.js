const articlesRouter = require("express").Router();
const {
  deleteArticleByArticleId,
  patchVotesByArticleid,
  getArticleByArticleId,
  postCommentByArticleId,
  getCommentsByArticleId,
  getArticles,
} = require("../controllers/articles-controller");
const {handle405s} = require('../controllers/errorhandling')
articlesRouter.route("/").get(getArticles).all(handle405s);

articlesRouter
  .route("/:article_id")
  .delete(deleteArticleByArticleId)
  .patch(patchVotesByArticleid)
  .get(getArticleByArticleId);

articlesRouter
  .route("/:article_id/comments")
  .post(postCommentByArticleId)
  .get(getCommentsByArticleId);

module.exports = articlesRouter;
