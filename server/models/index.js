const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://OmarFouad:Darkness123@merntesting-kvib9.mongodb.net/messenger?retryWrites=true&w=majority');

module.exports.User = require('./user');