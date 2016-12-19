'use strict';

const mongoose = require('mongoose');
const FriendsOfFriends = require('friends-of-friends')(mongoose, options);

const options = {
  // define the name for your Users model.
  personModelName:            'User',
  // define the name for the Friendship model
  friendshipModelName:        'Friendship',
  // define the name of the Friendship collection.
  friendshipCollectionName:   'Friendships'
};


