const {Movie, Actor, Director} = require('./table');



async function createMovie(title, actor, director) {
    try {
        if(await Actor.findOne({where: {name: actor}}) === null) {
            await Actor.create({name: actor, age: 0});
            const tmpActor = await Actor.findOne({where: {name: actor}});
            actor_id = tmpActor.dataValues.actor_id;
        const newMovie = await Movie.create(movieObject);
        console.log(newMovie.toJSON());
        } else {
            const tmpActor = await Actor.findOne({where: {name: actor}});
            actor_id = tmpActor.dataValues.actor_id;
        }
        if(await Director.findOne({where: {name: director}}) === null) {
            await Director.create({name: director, age: 0});
            const tmpDirector = await Director.findOne({where: {name: director}});
            director_id = tmpDirector.dataValues.director_id;
        } else {
            const tmpDirector = await Director.findOne({where: {name: director}});
            director_id = tmpDirector.dataValues.director_id;
        }
        const newMovie = await Movie.create({title: title, actor_id: actor_id, director_id: director_id});
        console.log(newMovie.toJSON());
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('The movie title already exists');
        } else {
            console.error(error);
        }
    }
};

async function createActor(movieObject, actorObject) {
    try {
        await Movie.sync();
        await Actor.sync();
        await Director.sync();
        let t = await sequelize.transaction();
        let newMovie = await Movie.create(movieObject, { transaction: t });
        let newActor = await Actor.create(actorObject, { transaction: t });
        let newDirector = await Director.create(actorObject, { transaction: t });
        await t.commit();
        console.log(newActor.toJSON());
        console.log(newMovie.toJSON());
        console.log(newDirector.toJSON());
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            console.error('The actor name already exists');
        } else {
            console.error(error);
        }
    }
}

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
        for (let index = 0; index < movies.length; index++) {
            const movie = movieList[index];
            const director = await Director.findOne({where: {director_id: movie.director_id}});
            const actor = await Actor.findOne({where: {actor_id: movie.actor_id}});
            console.log(movie.toJSON());
            console.log(director.toJSON());
            console.log(actor.toJSON());
        }
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