const articlesRouter = require("express").Router();
const {
  deleteArticleByArticleId,
  PatchVotesByArticleid,
  GetArticleByArticleId,
} = require("../controllers/articles-controller");

articlesRouter
  .route("/:article_id")
  .delete(deleteArticleByArticleId)
  .patch(PatchVotesByArticleid)
  .get(GetArticleByArticleId);

module.exports = articlesRouter;
