const articlesRouter = require("express").Router();
const {
  deleteArticleByArticleId,
  PatchVotesByArticleid,
  getArticleByArticleId,
  postCommentByArticleId,
} = require("../controllers/articles-controller");

articlesRouter
  .route("/:article_id")
  .delete(deleteArticleByArticleId)
  .patch(PatchVotesByArticleid)
  .get(getArticleByArticleId);

articlesRouter.route("/:article_id/comments").post(postCommentByArticleId);

module.exports = articlesRouter;
