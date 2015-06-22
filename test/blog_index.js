'use strict';

// Set node env to test
process.env.NODE_ENV = 'test';

var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var By = require('selenium-webdriver').By;
var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

var Q = require('q');
var sequelize = require('../database').sequelize;
var models = require('../models')(sequelize);
sequelize.sync({force: true});

require('../app');

var articleFixtureDocs = [
    {
        title: 'I am the title of an article',
        summary: 'I am the summary of an article',
        body: 'I am the body of an article'
    },
    {
        title: 'I am the title of an article',
        summary: 'I am the summary of an article',
        body: 'I am the body of an article'
    }
];

function createArticleFixtures() {
    return Q.all(articleFixtureDocs.map(function(doc) {
        return models.Article.create(doc);
    }));
}




var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

before(function() {
    this.timeout(20000);
    return driver.getWindowHandle();
});

after(function() {
    driver.close();
    return driver.quit();
});

describe('Blog Index', function() {
    
    beforeEach(function() {
        return createArticleFixtures()
            .then(function() {
                driver.get('http://localhost:3000/blog/')
        });
    });
    
    /**
    * As a Visitor,
    * I would like to see summaries of the last few blog posts on the blog index,
    * so that I can see which scintillating nuggets Andy has gifted to the World.
    */
    it('should display a number of article summaries on the blog index', function() {
        return expect(driver.findElement(By.css('.article-summary')))
            .to.eventually.have.length.above(0);
    });
    
});