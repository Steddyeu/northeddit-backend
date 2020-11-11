const usersRouter = require("express").Router();
const { getUsersUsername } = require("../controllers/users-controller");

usersRouter.route("/:username").get(getUsersUsername);

module.exports = usersRouter;
