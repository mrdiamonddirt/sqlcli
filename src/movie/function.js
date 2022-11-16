const Movie = require('./table');

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

async function readMovie(movieTitle) {
    try {
        const movie = await Movie.findOne({
            where: {
                title: movieTitle
            }
        });
        if (movie) {
            console.log(movie.toJSON());
        } else {
            console.log('The movie was not found');
        }
    } catch (error) {
        console.error(error);
    }
};

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

module.exports = createMovie;