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
          //console.log(body)
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
          .then(({ body }) => {
            //console.log("test -->", body.user);
            expect(body.user).toEqual({
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
.get('/users/barney_the_barney_bear')
.expect(404)
.then(({body}) => {
  expect(body.msg).toBe("Not found")
})
      });
    });
  });
});
