const Movie = require('./table');
const Actor = require('./table');


async function createMovie(movieObject) {
    try {
        const newMovie = await Movie.create(movieObject);
        console.log(newMovie.toJSON());
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('The movie title already exists');
        } else {
            console.error(error);
        }
    }
};

// async function createActor(movieObject, actorObject) {
//     try {
//         await Movie.sync();
//         await Actor.sync();
//         let t = await sequelize.transaction();
//         let newMovie = await Movie.create(movieObject, { transaction: t });
//         let newActor = await Actor.create(actorObject, { transaction: t });
//         await t.commit();
//         console.log(newActor.toJSON());
//         console.log(newMovie.toJSON());
//     } catch (error) {
//         if (error.name === 'SequelizeUniqueConstraintError') {
//             console.error('The actor name already exists');
//         } else {
//             console.error(error);
//         }
//     }
// }

async function readMovie(movieObject) {
//   find one movie by title
    try {
        const movie = await Movie.findOne({
            where: movieObject
        });
        if (movie === null) {
            console.log('The movie does not exist');
        }
        console.log(movie.toJSON());
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('The movie title already exists');
        } else {
            console.error(error);
        }
    }
    
};

async function listMovies() {
    try {
        const movies = await Movie.findAll();
        console.log(movies.map(movie => movie.toJSON()));
        console.log(movies)
    } catch (error) {
        console.error(error);
    }
}

async function updateMovie(movieTitle, movieObject) {
    try {
        const [numberOfAffectedRows, affectedRows] = await Movie.update(movieObject, {
            where: {
                title: movieTitle
            },
            returning: true,
            plain: true
        });
        console.log(`${numberOfAffectedRows} row(s) were affected`);
        console.log(affectedRows.toJSON());
        if (numberOfAffectedRows === 0) {
            console.log('The movie does not exist');
        } else if (numberOfAffectedRows === 1) {
            console.log('The movie was updated');
            console.log(affectedRows.toJSON());
            
        }
    } catch (error) {
        console.error(error);
    }
};

async function deleteMovie(movieTitle) {
    try {
        const numberOfDeletedRows = await Movie.destroy({
            where: {
                title: movieTitle
            }
        });
        console.log(`${numberOfDeletedRows} row(s) were deleted`);
    } catch (error) {
        console.error(error);
    }
};

exports.createMovie = createMovie;
// exports.createActor = createActor;
exports.readMovie = readMovie;
exports.listMovies = listMovies;
exports.updateMovie = updateMovie;
exports.deleteMovie = deleteMovie;