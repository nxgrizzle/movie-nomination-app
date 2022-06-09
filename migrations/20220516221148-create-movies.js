"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Movies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      movie_title: {
        type: Sequelize.STRING,
      },
      movie_year: {
        type: Sequelize.STRING,
      },
      movie_poster: {
        type: Sequelize.STRING,
      },
      movies_imdbId: {
        type: Sequelize.STRING,
      },
      movie_rated: {
        type: Sequelize.STRING,
      },
      movie_runtime: {
        type: Sequelize.STRING,
      },
      movie_genre: {
        type: Sequelize.STRING,
      },
      movie_plot: {
        type: Sequelize.STRING,
      },
      movie_rating: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Movies");
  },
};
