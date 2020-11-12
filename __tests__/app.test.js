process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const connection = require("../db/data/connection");

describe("/api", () => {
  afterAll(() => connection.destroy());
  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  //<--------------->GET TOPICS<--------------->
  describe("/topics", () => {
    test("GET responds with 200 when topics is requested and format is correct", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          //  console.log(res.body)
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
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

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
          .delete("/users/api/100000000")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Not found");
          });
      });
    });
  });

  //<--------------->PATCH ARTICLE BY ARTICLE ID<--------------->
  describe("/articles", () => {
    describe("/articles/article_id", () => {
      test("STATUS 200 when successful patch on votes is performed", () => {
        return request(app)
          .patch("/api/articles/2")
          .send({ votes: 10 })
          .expect(200)
          .then(({ body }) => {
            //console.log(body.article.votes)
            expect(body.article.votes).toBe(10);
            expect(body.article.article_id).toBe(2);
          });
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
      })
    test("STATUS: 404, Invalid endpoint", () => {
      return request(app)
        .get("/api/article/3")
        .expect(404)
        .then(({ body }) => {
          //console.log('err ----->', body)
          expect(body.msg).toBe("Not found");
        });
    })
    test("STATUS: 400, Invalid endpoint", () => {
      return request(app)
        .get("/api/articles/30000")
        .expect(404)
        .then(({ body }) => {
          //console.log('err ----->', body)
          expect(body.msg).toBe("Not found");
        });
    })
  });
});
