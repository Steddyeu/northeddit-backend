# Northeddit API
The API for the backend of my reddit clone full stack project. This API uses psql to create a database that is seeded with knex. 
# Tech
* SQL Postgress (pg)
* Express
* Knex
* Nodemon

# API Endpoints

# GET /api/topics

  ``` {
              topics: [
                {
                  slug: String,
                  description: String,
                }
              ]
            }
```
# GET /api/articles
Accepted Queries:

sort_by (defaults to created_at)
order (defaults to desc)
author
topic
Example response:

            {
              articles: [
                {
                  article_id: Number,
                  title: String,
                  body: String,
                  topic: String,
                  author: String,
                  votes: Number,
                  created_at: String,
                  comment_count: String
                }
              ]
            }
# GET /api/articles/:article_id
Example response:

            {
              article: {
                article_id: Number,
                title: String,
                body: String,
                topic: String,
                author: String,
                votes: Number,
                created_at: String,
                comment_count: String
              }
            }
PATCH /api/articles/:article_id
Example request:

{ inc_votes: 1 }
Example response:

            {
              article: {
                article_id: Number,
                title: String,
                body: String,
                topic: String,
                author: String,
                votes: Number,
                created_at: String,
                comment_count: String
              }
            }
# GET /api/articles/:article_id/comments
Accepted queries

sort_by (defaults to created_at)
order (defaults to desc)
Example response:

            {
              comments: [
              {
                comment_id: Number,
                  body: String,
                  article_id: Number,
                  author: String,
                  votes: Number,
                  created_at: String
                }
              ]
            }
# POST /api/articles/:article_id/comments
Example request:

            {
              body: String,
              username: String
            }
Example response:

            {
              comment: {
                comment_id: Number,
                body: String,
                article_id: Number,
                author: String,
                votes: Number,
                created_at: String
              }
            }
# PATCH /api/comments/:comment_id

* Example request:

{ inc_votes: 1 }
Example response:

            {
              comment: {
                comment_id: Number,
                body: String,
                article_id: Number,
                author: String,
                votes: Number,
                created_at: String
              }
            }
# DELETE /api/comments/:comment_id
Example response:

{}
# GET /api/users
Example response:

           {
            users: [               
              {
                username: String,
                name: String,
                avatar_url: String
              }
            ]           
           }
# GET /api/users/:username
Example response:

            {
              user: {
                username: String,
                name: String,
                avatar_url: String
              }
            }
