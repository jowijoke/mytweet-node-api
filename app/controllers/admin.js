/**
 * Created by User on 04/11/2016.
 */

'use strict';

const User = require('../models/user');
const Administrator = require('../models/administrator');
const Tweet = require('../models/tweet');

exports.home = {

  handler: function (request, reply) {

    User.find({ }).sort({ email: 'asc' }).then(users => {
      console.log('Found ' + users.length + ' users');
      reply.view('adminHome', {
        title: 'myTweet Users',
        users: users,
        adminUser: true,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.editUser = {

  handler: function (request, reply) {

    let userId = request.params.userId;

    console.log('User Id ' + userId);

    User.findOne({ _id: userId }).then(user => {
      console.log('Found user ' + user.email);
      Tweet.find({ sender: userId }).populate('sender').then(userTweets => {
        reply.view('editUser', {
          title: 'Edit User',
          user: user,
          tweets: userTweets,
          adminUser: true,
        });
      }).catch(err => {
        reply.redirect('/');
      });
    });
  },
};

exports.removeUser = {

  handler: function (request, reply) {
      let userId = request.params.userId;

      console.log('Removing user: ' + userId);
      User.remove({ _id: userId }, function (err) {
        if (err) return 'err';
        console.log(err);
      });

      reply.redirect('/adminHome');
    },
};

exports.saveUser = {

  handler: function (request, reply) {

    let userId = request.params.userId;

    console.log('Saving user: ' + userId);

    User.findOne({ _id: userId }, function (err, user) {
      if (!err) {
        if (!user) {
          user = new User();
        } else {
          console.log('users found: ' + user.email);
        }

        user.firstName = request.payload.firstName;
        user.lastName = request.payload.lastName;
        user.email = request.payload.email;
        user.save();

        reply.redirect('/adminHome');
      }
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

exports.deleteAdminTweet = {

  handler: function (request, reply) {
    let tweetId = request.params.tweetId;

    // Remove one tweet
    Tweet.remove({ _id: tweetId }, function (err) {
      if (err) return 'err';
      console.log(err);
    });

    reply.redirect('/adminHome');
  },
};

exports.deleteAllUserTweets = {
  handler: function (request, reply) {
    var userId = request.params.userId;
    User.findOne({ _id: userId }).then(user => {
      Tweet.find({ sender: user }).remove('tweet').then(tweet => {
        reply.redirect('/adminHome', {
          title: 'Tweets to Date',
        });
      });
    });
  },
};
