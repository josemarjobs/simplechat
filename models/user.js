// Generated by CoffeeScript 1.6.3
var Schema, mongoose, userSchema;

mongoose = require('mongoose');

Schema = mongoose.Schema;

userSchema = new Schema({
  username: String,
  email: String
});

module.exports = mongoose.model('User', userSchema);