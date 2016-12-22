'use strict';

const User = require('../models/user');
const Follower = require('../models/follower');
const Tweet = require('../models/tweet');


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
      console.log('Removing ' + followId);
      Follower.find({following: followId}).remove('follower').then(allFollowers => {
        if (err) return 'err';
        console.log(err);
      });

      reply.redirect('/settings');
    },
  };

exports.followerProfile = {

  handler: function (request, reply) {

    let followerId = request.params.followerId;

    console.log('FollowerId ' + followerId);

    User.findOne({ _id: followerId }).then(chosenFollower => {
      Tweet.find({sender: followerId}).populate('sender').then(userTweets => {
      Follower.find({follower: followerId}).populate('following').then(allFollowers => {
        // Create an array of the current user and who they follow
        const following = [followerId];
        allFollowers.forEach(function (index) {
          following.push(index.following.id);
        });

        User.find({_id: {$in: following}}).nor({_id: followerId}).then(users => {

            reply.view('followerProfile', {
              title: 'follower Timeline',
              follower: chosenFollower,
              users: users,
              followerTweets: userTweets,
            });
          }).catch(err => {
            reply.redirect('/');
          });
        });
      });
    });
  },
};

