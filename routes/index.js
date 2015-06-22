/*var express = require('express');
var router = express.Router();

 GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;*/

'use strict';

module.exports = function(models) {
    
    return {
        /**
         * Home Page Route
         * @param req
         * @param res
         */
        index: function(req, res) {
            res.render('index', {title: 'Express'});
        },
        
        /**
         * include routes for blog
         */
        blog: require('./blog')(models)
    }
    
}