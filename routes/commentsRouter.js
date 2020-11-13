const commentsRouter = require("express").Router();
const {
  PatchvoteByCommentId,
  deleteCommentByCommentId,
} = require("../controllers/comments-controller");

commentsRouter
  .route("/:commentid")
  .patch(PatchvoteByCommentId)
  .delete(deleteCommentByCommentId);

module.exports = commentsRouter;
