'use strict';

const User = require('../models/user');
const Follower = require('../models/follower'); // import the Model



exports.follow = {

  handler: function (request, reply) {

    //Identify logged-in user:
    var userEmail = request.auth.credentials.loggedInUser;

    // Find the user from their email
    User.findOne({ email: userEmail }).then(userFollower => {
      let targetId = request.params.targetId;
      User.findOne({ _id: targetId }).then(userFollowing => {
        console.log('Following ' + targetId);
        console.log('Found user ' + userFollowing.email);
        //Create new follower object
        const follower = new Follower();
        follower.follower = userFollower;
        follower.following = userFollowing;
        return follower.save();

      });

    });

    reply.redirect('/home');
  },
};

exports.unfollow = {

  handler: function (request, reply) {

    //Identify logged-in user:
    var userEmail = request.auth.credentials.loggedInUser;

    // Find the user from their email
    User.findOne({ email: userEmail }).then(userFollower => {

      User.findOne({ _id: request.params.targetId }).then(userFollowing => {

        // Delete the follower record
        Follower.remove({ follower: userFollower, following: userFollowing }, function (err) {
          if (err) return 'err';
          console.log(err);
        });

      });

    });

    reply.redirect('/home');
  },
};