'use strict';

const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

// const friendship = {
//   // define the name for your Users model.
//   personModelName:            'User',
//   // define the name for the Friendship model
//   friendshipModelName:        'Friendship',
//   // define the name of the Friendship collection.
//   friendshipCollectionName:   'Followers'
// };
//
// const FriendsOfFriends = require('friends-of-friends')(mongoose, friendship);
//
// userSchema.plugin(FriendsOfFriends.plugin, friendship);

//const User = mongoose.model(friendship.personModelName, userSchema);
const User = mongoose.model('User', userSchema);

module.exports = User;

