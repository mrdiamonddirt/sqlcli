const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

// sequalize auto to auto generate the table
const Movie = sequelize.define("Movie", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  actor: {
    type: DataTypes.STRING,
    defaultValue: "unknown",
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
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

// const Actor = sequelize.define("Actor", {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   age: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   MovieId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
// });

module.exports = Movie;
