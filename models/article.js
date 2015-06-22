'use strict';

var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    
    var Article = sequelize.define('Article', {
        title: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        summary: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }, 
        body: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        classMethods: {
            articlesForIndex: function() {
                return this.findAll({order: 'createdAt DESC'});
            }
        }
    });
    return Article;
    
};