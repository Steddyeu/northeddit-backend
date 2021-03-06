const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js");

const {
  formatDates,
  formatAuthor,
  formatComments,
  createTitleRef,
} = require("../utils/data-manipulation");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return Promise.all([
        knex("users").insert(userData).returning("*"),
        knex("topics").insert(topicData).returning("*"),
      ]);
    })
    // .then(() => {
    //   // console.log(topicData)
    //   return knex("topics").insert(topicData).returning("*");
    // })
    .then(() => {
      const formattedDateArticleData = formatDates(articleData);
      return knex("articles").insert(formattedDateArticleData).returning("*");
    })
    .then((response) => {
      const step1 = formatAuthor(commentData);
      const commentRef = createTitleRef(response);
      let formattedCommentData = formatComments(step1, commentRef);
      formattedCommentData = formatDates(formattedCommentData)
      return knex("comments").insert(formattedCommentData).returning("*");
    })
    // .then((res) => {
    //   console.log(res);
    // });
};
