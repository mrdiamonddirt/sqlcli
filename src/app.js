const yargs = require('yargs');
const { sequelize } = require('./db/connection');
const { createMovie, readMovie, listMovies, updateMovie, deleteMovie } = require('./movie/function');

async function app(yargsObject) {
    await sequelize.sync();
    if (yargsObject.create){
        // create a new object
        const movieObject = {
            title: yargsObject.title,
            actor: yargsObject.actor,
            year: yargsObject.year,
            // genre: yargsObject.genre,
            // director: yargsObject.director,
            // rating: yargsObject.rating,
            // rottenTomatoes: yargsObject.rottenTomatoes
        };
        await createMovie(movieObject);
    } else if (yargsObject.createactor) {
        const actorObject = {
            name: yargsObject.name,
            age: yargsObject.age,
            MovieId: yargsObject.MovieId
        };
        const movieObject = {
            title: yargsObject.title,
            actor: yargsObject.actor,
            year: yargsObject.year,
        }
        await createActor(actorObject, movieObject);

    } else if (yargsObject.read) {
        // read an object by title
        const movieTitle = {
            title: yargsObject.title};
        await readMovie(movieTitle);
    } else if (yargsObject.readall) {
        // read all objects
        await listMovies();
    } else if (yargsObject.update) {
        // update an object
        const movieObject = {
            title: yargsObject.title,
            actor: yargsObject.actor,
            year: yargsObject.year,
        }
        await updateMovie(yargsObject.title, movieObject);
    } else if (yargsObject.delete) {
        // delete an object
        await deleteMovie(yargsObject.title);
    } else {
        // print help
    }
}

app(yargs.argv);