const {
  updateVoteByCommentId,
  removeCommentByCommentId,
} = require("../models/comments-model");

exports.PatchvoteByCommentId = (req, res, next) => {
  //console.log("controller --->", req.params);
  //console.log("controlerVotes", req.body.votes);
  const commId = req.params.commentid;
  const newVotes = req.body.votes;
  updateVoteByCommentId(newVotes, commId)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentByCommentId = (req, res, next) => {
  //console.log("controller-->", req.params.commentid);
  const commId = req.params.commentid;
  removeCommentByCommentId(commId)
    .then((delCount) => {
      if (delCount === 0) {
        res.status(404).send({ msg: "comment_id does not exist to delete" });
      } else {
        res.sendStatus(204);
      }
    })
    .catch(next);
};
