const connection = require("../db/data/connection");

exports.updateVoteByCommentId = (newVotes, commId) => {
  return connection
    .from("comments")
    .where("comments.comment_id", "=", commId)
    .update({ votes: newVotes })
    .returning("*")
    .then((updatedCommentVotes) => {
      // console.log("model ---->", updatedCommentVotes);
      return updatedCommentVotes[0];
    });
};

exports.removeCommentByCommentId = (commId) => {
  //console.log(commId)
  return connection
    .delete()
    .from("comments")
    .where("comments.comment_id", "=", commId)
    .then((delCount) => {
     // console.log("models --->", delCount);
      return delCount;
    });
};
