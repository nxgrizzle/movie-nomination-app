module.exports = (app) => {
  const movies = require("../controllers/movie.controller");
  const router = require("express").Router();
  router.get("/", movies.getMovies);
  router.put("/", movies.nominateMovie);
  router.delete("/", movies.removeNomination);
  app.use("/api/movies", router);
};
