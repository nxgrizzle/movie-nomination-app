module.exports = (app) => {
  const users = require("../controllers/user.controller");
  const router = require("express").Router();
  router.post("/", users.createUser);
  router.get("/:id", users.getUser);
  app.use("/api/users", router);
};
