'use strict';

const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const options = {
  // define the name for your Users model.
  personModelName:            'User',
  // define the name for the Friendship model
  friendshipModelName:        'Friendship',
  // define the name of the Friendship collection.
  friendshipCollectionName:   'Friendships'
};

const FriendsOfFriends = require('friends-of-friends')(mongoose, options);

userSchema.plugin(FriendsOfFriends.plugin, options);

const User = mongoose.model(options.personModelName, userSchema);

module.exports = User;

