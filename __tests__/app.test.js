process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const connection = require("../db/data/connection");

describe("/api", () => {
  afterAll(() => connection.destroy());
  beforeEach(() => connection.seed.run())

  //<--------------->GET TOPICS<--------------->
  describe("/topics", () => {
    test("GET responds with 200 when topics is requested and format is correct", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          // console.log(res.body)
          expect(res.body.topics).toEqual(expect.any(Array));
          expect(Object.keys(res.body.topics[0])).toEqual(
            expect.arrayContaining(["description", "slug"])
          );
          expect(res.body.topics.length).toBe(3);
        });
    });

    //<--------------->ERROR HANDLING<--------------->
    test("status 404 not found", () => {
      return request(app)
        .get("/api/topic")
        .expect(404)
        .then(({ body }) => {
          //console.log('err ----->', body)
          expect(body.msg).toBe("Not found");
        });
    });
  });

  //<--------------->GET USER BY USERNAME<--------------->

  describe("/users", () => {
    describe("/users/:username", () => {
      test("GET responds with 200 when user is requested with username", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(({ body: { user } }) => {
            //console.log("test -->", body.user);
            expect(user).toEqual({
              username: "butter_bridge",
              avatar_url:
                "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
              name: "jonny",
            });
          });
      });
      //<--------------->ERROR HANDLING<--------------->
      test("STATUS 404 not found", () => {
        return request(app)
          .get("/users/barney_the_barney_bear")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Not found");
          });
      });
    });
  });

  //<--------------->DELETE ARTICLE BY ARTICLE ID<--------------->

  describe("/articles", () => {
    describe("/articles/:article_id", () => {
      test(" DELETE 204 when successful delete request is performed", () => {
        return request(app)
          .delete("/api/articles/1")
          .expect(204)
          .then(() => {
            return connection
              .select("*")
              .from("articles")
              .where("articles.article_id", "=", 1);
          })
          .then((articles) => {
            expect(articles).toEqual([]);
          });
      });

      //<--------------->ERROR HANDLING<--------------->
      test("STATUS 404 article_id doesnt exist", () => {
        return request(app)
          .delete("/api/articles/100000000")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("article_id does not exist to delete");
          });
      });
    });
  });

  //<--------------->PATCH ARTICLE BY ARTICLE ID<--------------->
  describe("/articles", () => {
    describe("/articles/article_id", () => {
      test("PATCH STATUS 200 when successful patch on votes is performed", () => {
        return request(app)
          .patch("/api/articles/2")
          .send({ votes: 10 })
          .expect(200)
          .then(({ body }) => {
            // console.log(body.article)
            expect(body.article.votes).toBe(10);
            expect(body.article.article_id).toBe(2);
          });
      });
      //<--------------->ERROR HANDLING<--------------->
      test("STATUS 400 for invalid update request", () => {
        return request(app)
          .patch("/api/articles/2")
          .send({ votes: "bananna" })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad Request");
          });
      });
      test("STATUS 400 for invalid endpoint", () => {
        return request(app)
          .patch("/api/articles/bananna")
          .send({ votes: 10 })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad Request");
          });
      });
      test("STATUS 404 for two rows", () => {
        return request(app)
          .patch("/api/treasures/articles")
          .send({ votes: 10, article_id: 2 })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Not found");
          });
      });
    });

    describe("/articles/:article_id", () => {
      test("GET responds with 200 when articles is requested by article ID and format is correct", () => {
        return request(app)
          .get("/api/articles/3")
          .expect(200)
          .then(() => {
            return connection
              .select("*")
              .from("articles")
              .where("articles.article_id", "=", 3);
          })
          .then(() => {
            return connection
              .select("*")
              .from("articles")
              .where("articles.article_id", "=", 3);
          })
          .then((articles) => {
            // console.log('test--->', articles)
            expect(articles).toEqual(expect.any(Array));
            expect(Object.keys(articles[0])).toEqual(
              expect.arrayContaining([
                "article_id",
                "title",
                "body",
                "votes",
                "topic",
                "author",
                "created_at",
              ])
            );
          });
      });
      //<--------------->ERROR HANDLING<--------------->

      test("STATUS: 400, Invalid endpoint", () => {
        return request(app)
          .get("/api/articles/sausage")
          .expect(400)
          .then(({ body }) => {
            //console.log('err ----->', body)
            expect(body.msg).toBe("Bad Request");
          });
      });
      test("STATUS: 404, Invalid endpoint", () => {
        return request(app)
          .get("/api/article/3")
          .expect(404)
          .then(({ body }) => {
            //console.log('err ----->', body)
            expect(body.msg).toBe("Not found");
          });
      });
      test("STATUS: 404, article Id does not exist in the database", () => {
        return request(app)
          .get("/api/articles/30000")
          .expect(404)
          .then(({ body }) => {
            // console.log('err ----->', body)
            expect(body.msg).toBe("Article not Found");
          });
      });
    });
  });
  //<--------------->POST ARTICLE BY ARTICLE ID<--------------->
  describe("/articles/:article_id/comments", () => {
    test("POST responds with Status 201 when comment is posted using articleId", () => {
      return request(app)
        .post("/api/articles/3/comments")
        .send({
          body: "my Posted comment",
          author: "butter_bridge",
        })
        .expect(201)
        .then(({ body }) => {
          //  console.log("testBody ---->", body);
          expect(body.newComment[0].body).toBe("my Posted comment");
          expect(body.newComment[0].author).toBe("butter_bridge");
        });
    });

    //<--------------->ERROR HANDLING<--------------->
    test("STATUS 400 when missing column, eg author", () => {
      return request(app)
        .post("/api/articles/3/comments")
        .send({
          body: "error Posted comment",
          //author: "butter_bridge",
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Row not Found");
        });
    });
    test("STATUS 404 when adding incorrect value to key", () => {
      return request(app)
        .post("/api/article/3/comments")
        .send({
          body: "error Posted comment",
          author: "butter_bridge",
        })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found");
        });
    });

    describe("Get /articles/:article_id/comments", () => {
      test("GET responsed with 200 when comments are requested with article_id", () => {
        return request(app)
          .get("/api/articles/5/comments")
          .expect(200)
          .then(({ body }) => {
            // console.log("test--->", body.comment);
            expect(body.comment.article_id).toBe(5);
            expect(Object.keys(body.comment)).toEqual(
              expect.arrayContaining([
                "comment_id",
                "author",
                "article_id",
                "votes",
                "created_at",
                "body",
              ])
            );
          });
      });

      //<--------------->ERROR HANDLING<--------------->
      test("", () => {});
      test("status 404 path not found", () => {
        return request(app)
          .get("/api/articles/5/comment")
          .expect(404)
          .then(({ body }) => {
            //console.log('err ----->', body)
            expect(body.msg).toBe("Not found");
          });
      });
      test("status 400 article_id does not exist", () => {
        return request(app)
          .get("/api/articles/1000000/comments")
          .expect(400)
          .then(({ body }) => {
            //console.log('err ----->', body)
            expect(body.msg).toBe("article_id does not exist");
          });
      });
    });
  });

  //<--------------->GET ARTICLES + QUERIES<--------------->

  describe("/api/articles", () => {
    test('"GET responds with 200 when articles is requested and format is correct"', () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((res) => {
          // console.log("test ---->", res.body);
          expect(res.body.articles).toEqual(expect.any(Array));
          expect(res.body.articles[0]).toHaveProperty("author");
          expect(res.body.articles[0]).toHaveProperty("title");
          expect(res.body.articles[0]).toHaveProperty("topic");
          expect(res.body.articles[0]).toHaveProperty("created_at");
          expect(res.body.articles[0]).toHaveProperty("votes");
          expect(res.body.articles[0]).toHaveProperty("comment_count");
          expect(res.body.articles[0]).toHaveProperty("article_id");
        });
    });
    test("that default sorting order is date", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((res) => {
          //console.log('----->', res.body.articles)
          expect(res.body.articles).toBeSortedBy("created_at", {
            coerce: true,
          });
        });
    });
    test("SORT_BY that default SORT_BY that treasures can be sorted by given column when column is passed as a query order is date", () => {
      return request(app)
        .get("/api/articles?sort_by=votes")
        .expect(200)
        .then((res) => {
          //console.log('----->', res.body.articles)
          expect(res.body.articles).toBeSortedBy("votes");
        });
    });
    test("DESC that articles can be ordered in descending order by given column when column is passed as a query", () => {
      return request(app)
        .get("/api/articles?order=desc")
        .expect(200)
        .then((res) => {
          //  console.log("--->", res.body.articles)
          expect(res.body.articles).toBeSortedBy("created_at", {
            descending: true,
            coerce: true,
          });
        });
    });
    test("when queried with a authors, returns the objects of author", () => {
      return request(app)
        .get("/api/articles?author=icellusedkars")
        .expect(200)
        .then((res) => {
          //console.log("author query --->", res.body);
           expect(res.body.articles[0].author).toBe("icellusedkars");
        });
    });
    test("when queried with a topics, returns the objects of topics", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then((res) => {
          //console.log("topic query --->", res.body);
          expect(res.body.articles[0].topic).toBe("mitch");
        });
    });

    //<------------------->ERROR HANDLING<------------------>
    test("responds 400 for invalid sortBy column", () => {
      return request(app)
        .get("/api/articles?sort_by=sausages")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
    test("status:405, INVALID METHODS", () => {
      const invalidMethods = ["patch", "put", "delete"];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/articles")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe("Method Not Allowed");
          });
      });
      return Promise.all(methodPromises);
    });
  });

  //<--------------->PATCH COMMENTS BY COMMENT ID <--------------->

  describe("PATCH /api/comments/:comment_id", () => {
    test("STATUS 200 when successful patch request is performed", () => {
      return request(app)
        .patch("/api/comments/5")
        .send({ votes: 30 })
        .expect(200)
        .then(({ body }) => {
          //console.log(body);
          expect(body.comment.votes).toBe(30);
          expect(body.comment.comment_id).toBe(5);
        });
    });

    //<------------------->ERROR HANDLING<------------------>

    test("STATUS 400 for invalid update request", () => {
      return request(app)
        .patch("/api/comments/5")
        .send({ votes: "bananna" })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
    test("STATUS 400 for invalid endpoint", () => {
      return request(app)
        .patch("/api/comments/bananna")
        .send({ votes: 10 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
  });

  //<--------------->DELETE COMMENTS BY COMMENT ID <--------------->

  describe("DELETE /api/comments/:comment_id", () => {
    test("DELETE 204 when successful delete request is performed", () => {
      return request(app)
        .delete("/api/comments/15")
        .expect(204)
        .then(() => {
          return connection
            .select("*")
            .from("comments")
            .where("comments.comment_id", "=", 15);
        })
        .then((comments) => {
          //  console.log('test--->', comments)
          expect(comments).toEqual([]);
        });
    });

    //<------------------->ERROR HANDLING<------------------>

    test("STATUS 404 article_id doesnt exist", () => {
      return request(app)
        .delete("/api/comments/100000000")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("comment_id does not exist to delete");
        });
    });
  });
});
