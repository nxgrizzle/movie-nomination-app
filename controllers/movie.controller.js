const db = require("../models");
const User = db.user;
const Movie = db.movie;

exports.getMovies = (req, res) => {
  Movie.findAll({
    include: [
      {
        all: true,
        nested: true,
      },
    ],
  })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.nominateMovie = (req, res) => {
  Movie.findOrCreate({
    where: {
      movie_title: req.body.movie_title,
      movie_year: req.body.movie_year,
      movie_poster: req.body.movie_poster,
      movie_imdbId: req.body.movie_imdbId,
      movie_rated: req.body.movie_rated,
      movie_runtime: req.body.movie_runtime,
      movie_genre: req.body.movie_genre,
      movie_plot: req.body.movie_plot,
      movie_rating: req.body.movie_rating,
    },
  })
    .then(([movie, created]) => {
      if (!movie) {
        console.log("creating movie failed");
        return;
      }
      User.findOne({ where: { access_token: req.body.access_token } })
        .then((user) => {
          console.log(user, movie);
          if (!user) {
            console.log("something failed at user");
            return;
          }
          movie.addUser(user);
          res.send({ message: "success" });
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
exports.removeNomination = (req, res) => {
  Movie.findOne({
    where: {
      movie_title: req.body.movie_title,
      movie_year: req.body.movie_year,
      movie_poster: req.body.movie_poster,
      movie_imdbId: req.body.movie_imdbId,
      movie_rated: req.body.movie_rated,
      movie_runtime: req.body.movie_runtime,
      movie_genre: req.body.movie_genre,
      movie_plot: req.body.movie_plot,
      movie_rating: req.body.movie_rating,
    },
  })
    .then((movie) => {
      if (!movie) {
        console.log("creating movie failed");
        return;
      }
      User.findOne({ where: { access_token: req.body.access_token } })
        .then((user) => {
          console.log(user, movie);
          if (!user) {
            console.log("something failed at user");
            return;
          }
          user.removeMovie(movie);
          console.log("entered");
          res.send({ message: "success" });
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
