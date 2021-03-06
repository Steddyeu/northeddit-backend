//should be called create_comments_table


exports.up = function (knex) {
 // console.log("creating the comments table");
  return knex.schema.createTable("comments", (commentsTable) => {
    commentsTable.increments("comment_id").primary();
    commentsTable.text("author").references("users.username");
    commentsTable.integer("article_id").references("articles.article_id").onDelete('CASCADE');
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.timestamp("created_at").defaultTo(knex.fn.now());
    commentsTable.text("body");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
