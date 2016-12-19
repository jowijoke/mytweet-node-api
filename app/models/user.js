'use strict';

const mongoose = require('mongoose');
const FriendsOfFriends = require('friends-of-friends');

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

userSchema.plugin(FriendsOfFriends.plugin, options);

const User = mongoose.model(options.personModelName, userSchema);
module.exports = User;

