'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var expect = chai.expect;

// Blog Index Route Tests
describe('Route tests', function() {
    require('./blog_index_route')(sinon);
});
