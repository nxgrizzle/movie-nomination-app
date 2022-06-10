const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const publicPath = path.join(__dirname, "build");
require("dotenv").config({ path: "./.env" });
const port = process.env.PORT || 80;
app.use(express.static(publicPath));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
app.get("/view/:slug", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
app.use(cors());
const db = require("./models");

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

require("./routes/users.routes.js")(app);
require("./routes/movies.routes.js")(app);

app.get("/search", (req, res, next) => {
  const reqString = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${req.query.search}&type=movie`;
  axios
    .get(reqString)
    .then((response) => {
      if (response.data.Response === "False") {
        return response.data;
      }
      const searchedMovies = response.data.Search;
      if (!searchedMovies) return;
      const updatedMovies = Promise.all(
        searchedMovies.map((movie, i) => {
          let searchString = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${movie.imdbID}`;
          return axios.get(searchString).then((res) => {
            const updatedMovie = Object.assign(movie, res.data);
            return updatedMovie;
          });
        })
      );
      return updatedMovies;
    })
    .then((movieList) => {
      console.log(movieList);
      res.send(movieList);
    })
    .catch((err) => res.send(err));
});
app.listen(port, () => {
  console.log("Server is up!", port);
});
