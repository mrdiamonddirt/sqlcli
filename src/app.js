const yargs = require('yargs');
const { sequelize } = require('./db/connection');
const { createMovie, readMovie, updateMovie, deleteMovie } = require('./movie/function');

async function app(yargsObject) {
    await sequelize.sync({ force: true });
    if (yargsObject.create){
        // create a new object
    } else if (yargsObject.read) {
        // read an object
    } else if (yargsObject.update) {
        // update an object
    } else if (yargsObject.delete) {
        // delete an object
    } else {
        // print help
    }
}

app(yargs.argv);