const {
  removeArticleByArticleId,
  updateVotesByArticleId,
  fetchArticleByArticleId
} = require("../models/articles-model");

exports.deleteArticleByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  //console.log('controller ===>', req);
  removeArticleByArticleId(article_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};

exports.PatchVotesByArticleid = (req, res, next) => {
  // console.log('controller--->', req.params.article_id)
  // console.log('contVotes --->', req.body)
  const artId = req.params.article_id;
  const newVotes = req.body.votes;
  updateVotesByArticleId(newVotes, artId).then((article) => {
    res.status(200).send({ article });
  })
  .catch(next)
};


exports.GetArticleByArticleId = (req, res, next) =>{
  //console.log('controller --->', req.params.article_id)
  const artId = req.params.article_id
  fetchArticleByArticleId(artId).then((article) => {
    res.status(200).send({article})
  })
  .catch(next)
}