'use strict';
const Tweet = require('../models/tweet');
const User = require('../models/user');

exports.home = {

  handler: (request, reply) => {
    var userEmail = request.auth.credentials.loggedInUser;
    let userId = null;
    User.findOne({ email: userEmail }).then(user => {
      userId = user._id;
      console.log('finding tweets');
      Tweet.find({ sender: userId }).populate('sender').then(userTweets => {
        User.find({ }).sort({ email: 'asc' }).then(users => {
          console.log('Found ' + users.length + ' users');
          /*  users.forEach(function (value, i) {
              if (value._id = userId) {
                users.splice(i, 1);
              }
            });*/
          reply.view('home', {
            title: 'Tweets to Date',
            tweets: userTweets,
            users: users,
            logUser: true,
          });
        });
      }).catch(err => {
        reply.redirect('/');
      });
    });
  },
};

exports.leaderBoard = {

  handler: function (request, reply) {
    Tweet.find({}).populate('sender').then(allTweets => {
      reply.view('leaderboard', {
        title: 'Tweets to Date',
        tweets: allTweets,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.tweet = {

  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: userEmail }).then(user => {
      let data = request.payload;
      const tweet = new Tweet(data);
      tweet.sender = user._id;
      tweet.date = new Date();
      return tweet.save();
    }).then(userTweets => {
      reply.redirect('/home');
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

exports.public = {
  handler: (request, reply) => {
    User.find({ publicUser: userId }).populate('sender').then(userTweets => {
      reply.view('publicUser', {
        title: 'Tweets to Date',
        tweets: usreTweets,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.deleteTweet = {

  handler: function (request, reply) {
    let tweetId = request.params.tweetId;

    // Remove one tweet
    Tweet.remove({ _id: tweetId }, function (err) {
      if (err) return 'err';
      console.log(err);
    });

    reply.redirect('/home');
  },
};

exports.deleteAll = {
  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: userEmail }).then(user => {
      Tweet.find({ sender: user }).remove('tweet').then(tweet => {
        reply.view('home', {
          title: 'Tweets to Date',
        });
      });
    });
  },
};

var Handlebars = require('handlebars');
const moment = require('moment');

Handlebars.registerHelper('dateFormat', function (timestamp) {
  // Formatting the date using momentjs
  return moment(timestamp).format('DD MMM YYYY HH:mm:SS');
});
