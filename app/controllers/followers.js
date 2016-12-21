'use strict';

const User = require('../models/user');
const Follower = require('../models/follower');
const Handlebars = require('handlebars');



exports.follow = {

  handler: function (request, reply) {

    //Identify logged-in user:
    const userEmail = request.auth.credentials.loggedInUser;

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

      let followId = request.params.followId;

      // Remove one tweet
      Follower.remove({ _id: followId }, function (err) {
        if (err) return 'err';
        console.log(err);
      });

      reply.redirect('/home');
    },
  };

Handlebars.registerHelper('following', function (userId, followers, options) { //callback
  console.log(userId);

  var result = false;

  followers.filter(function (item) {

    // To compare two ArrayBuffers, need to compare each element
    if (userId.id.every(function (u, i) {
          return u === item.following.id[i];
        })
    )
    {
      result = true;
    }

  });

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
