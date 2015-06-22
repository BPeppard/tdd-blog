'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should();

var Sequelize = require('sequelize');

var Q = require('q');

module.exports = function(sequelize, models) {
    
    var Article;
    describe('Article Model', function() {
        
        describe('Validation', function() {
            
            it('should create a model with valid properties', function() {
                return models.Article.create({title: 'thing', summary: 'thing', body: 'thing'})
                    .should.not.be.rejected;
            });

            it('should not be valid without a title', function() {
                return models.Article.create({summary: 'thing', body: 'thing'})
                    .should.be.rejected;
            });

            it('should not be valid without a summary', function() {
                return models.Article.create({title: 'thing', body: 'thing'})
                    .should.be.rejected;
            });

            it('should not be valid without a body', function() {
                return models.Article.create({title: 'thing',  summary: 'thing'})
                    .should.be.rejected;
            });
            
        });
        
        describe('articlesForIndex', function() {
            
            function addArticleFixture(offsetSeconds) {
                return models.Article.create({
                    title: 'Fixture Article',
                    summary: 'This is the summary of an article from a fixture',
                    body: 'This is the body of an article from a fixture',
                    createdAt: new Date(new Date().getTime() - (offsetSeconds * 1000))
                });
            }
            
            beforeEach(function() {
                // Add some articles to the database
                return Q.all([
                    addArticleFixture(40),
                    addArticleFixture(30),
                    addArticleFixture(20),
                    addArticleFixture(10)
                ]);
            });
            
            it('should define a function "articlesForIndex"', function() {
                should.exist(models.Article.articlesForIndex);
            });
            
            it('should return all the articles from the database', function() {
                return models.Article.articlesForIndex()
                    .should.eventually.have.length(4);
            });
            
            it('should return all the article models in created order', function () {  
                return models.Article.articlesForIndex()
                    .then(function (articles) {
                        var t = new Date().getTime();
                        return Q(articles.every(function (a) {
                            if(t >= a.createdAt.getTime()) {
                                t = a.createdAt.getTime();
                                return true;
                            }
                        return false;
                        }));
                    }).should.eventually.be.true;
            });
            
        });
        
        
        
    });
    
};