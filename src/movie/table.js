const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

// sequalize auto to auto generate the table
const Movie = sequelize.define("Movie", {
  movie_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  actor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  director_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
//   genre: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     defaultValue: "unknown",
//   },
//   director: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   rating: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   rottenTomatoes: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
});

const Actor = sequelize.define("Actor", {
  actor_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  MovieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const Director = sequelize.define("Director", {
  director_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

Actor.belongsTo(Movie , {foreignKey: 'actor_id'});
Director.belongsTo(Movie , {foreignKey: 'director_id'});

module.exports = { Movie, Actor, Director };
