const yargs = require('yargs');
import { Sequelize } = require('./db/connection');

async function app(yargsObject) {
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