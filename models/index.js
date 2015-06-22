'use strict';

module.exports = function(sequelize) {
    
    return {
        Article: require('./article')(sequelize)
    };
    
};