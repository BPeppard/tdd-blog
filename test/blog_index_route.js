'use strict';

module.exports = function(sinon) {

    var chai = require('chai');
    var sinon = require('sinon');
    var sinonChai = require('sinon-chai');

    chai.use(sinonChai);
    var expect = chai.expect;



    describe('Blog Index route', function() {

        // Object to mock the articles model
        var articlesMock;

        // Mock for the promise returned by articles for index
        var promiseMock;

        // Object to mock the response
        var response;

        // Blog route
        var blog;

        function requireBlog(models) {
            return require('../routes/blog')(models);
        }

        function callBlogIndexRoute() {
            blog.index({}, response);
        }

        beforeEach(function() {
            response = {};
            promiseMock = {};
            articlesMock = {};

            articlesMock.articlesForIndex = sinon.stub()
                .returns(promiseMock);

            promiseMock.then = sinon.spy();

            response.render = sinon.spy();
            response.send = sinon.spy();

            blog = requireBlog({Article: articlesMock});
        });

        it('should call Article.articlesForIndex', function() {
            callBlogIndexRoute();

            expect(articlesMock.articlesForIndex).to.have.been.calledOnce;
        });

        it('should pass resolve and reject functions to articlesForIndex', function() {
            callBlogIndexRoute();

            var args = promiseMock.then.getCall(0).args;

            // Should be called with two arguments
            expect(args.length).to.equal(2);

            // Both arguments should be functions
            expect(args[0]).to.be.a.function;
            expect(args[1]).to.be.a.function;
        });

        it('should call the render function', function() {
            callBlogIndexRoute();

            // Call the promise resolve function
            promiseMock.then.getCall(0).args[0]({});

            expect(response.render).to.have.been.calledOnce;
        });

        it('should call the render function with the correct template name', function() {
            callBlogIndexRoute();

            // Call the promise resolve function
            promiseMock.then.getCall(0).args[0]({});

            expect(response.render.getCall(0).args.length).to.be.above(0);
            expect(response.render.getCall(0).args[0]).to.equal('blog_index');
        });

        it('should pass the articles to the render function', function() {
            var articles = {};

            callBlogIndexRoute();

            // Call the promise resolve function
            promiseMock.then.getCall(0).args[0](articles);

            var args = response.render.getCall(0).args;
            expect(args.length).to.be.above(1);
            expect(args[1]).to.be.an.object;
            expect(args[1]).to.have.property('articles');
            expect(args[1].articles).to.equal(articles);
        });

        it('should send a 500 status on error', function() {
            callBlogIndexRoute();

            // Call the promise reject function
            promiseMock.then.getCall(0).args[1]({message: 'There was an error"'});

            expect(response.send).to.have.been.calledOnce;
            expect(response.send).to.have.been.calledWith(500);
        });

    });
}












































