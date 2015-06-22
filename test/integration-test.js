/*var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var By = require('selenium-webdriver').By;
var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

before(function() {
    return driver.getWindowHandle();
});

after(function() {
    driver.close();
    return driver.quit();
});

describe('Webdriver tutorial', function() {
    
    beforeEach(function() {
        return driver.get('http://bites.goodeggs.com/posts/selenium-webdriver-nodejs-tutorial/');
    });
        
    it('has the title of the post in the window\s title', function() {
        return expect(driver.getTitle()).to.eventually.contain('Getting started with Selenium Webdriver for node.js');
    });

    it('has publication date', function() {
        var text = driver.findElement(By.css('.post .meta time')).getText();
        return expect(text).to.eventually.equal('December 30th, 2014');
    });

    it('links back to the homepage', function() {
        driver.findElement(By.linkText('Bites')).click();
        return expect(driver.getCurrentUrl()).to.eventually.equal('http://bites.goodeggs.com/123');
    });
    
});*/