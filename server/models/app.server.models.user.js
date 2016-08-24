var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// define the schema for user model
var userSchema   = new Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('Users', userSchema);