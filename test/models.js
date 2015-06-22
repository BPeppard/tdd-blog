'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

var Sequelize = require('sequelize');
var sequelize;
var models;

// Cache the sequelize logging output until after all tests have run
var logOutput = '\n';
function log(msg) {
    logOutput += msg + '\n';
}

sequelize = new Sequelize('','','', {
    dialect: 'sqlite',
    logging: false
});

// Load model definitions
models = require('../models')(sequelize);



// Run model tests
describe('Model tests', function() {

    // Recreate the dtabase after each test to ensure isolation
    beforeEach(function() {
        return sequelize.sync({force: true});
    });

    // After all the tests have run, output all the sequelize logging
    after(function() {
        console.log(logOutput);
    });

    require('./article_model')(sequelize, models);

});
