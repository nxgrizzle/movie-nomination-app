"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movies.belongsToMany(models.Users, {
        through: "nominations",
        foreignKey: "movie_id",
      });
    }
  }
  Movies.init(
    {
      movie_title: DataTypes.STRING,
      movie_year: DataTypes.STRING,
      movie_poster: DataTypes.STRING,
      movie_imdbId: DataTypes.STRING,
      movie_rated: DataTypes.STRING,
      movie_runtime: DataTypes.STRING,
      movie_genre: DataTypes.STRING,
      movie_plot: DataTypes.STRING,
      movie_rating: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movies",
    }
  );
  return Movies;
};
