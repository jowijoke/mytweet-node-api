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
        reply.view('home', {
          title: 'Tweets to Date',
          tweets: userTweets,
        });
      }).catch(err => {
        reply.redirect('/');
      });
    });
  },
};

/*exports.sendTweet = {

  handler: function (request, reply) {
    Tweet.find({}).populate('sender').then(userTweets => {
      reply.view('home', {
        title: 'Tweets to Date',
        tweets: userTweets,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};*/

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
    let userId = null;
    let tweet = null;
    User.findOne({ email: userEmail }).then(user => {
      let data = request.payload;
      userId = user._id;
      tweet = new Tweet(data);
      tweet.sender = userId;
      return tweet.save();
    }).then(userTweets => {
      Tweet.find({ userId }).populate('sender');
      reply.view('home', {
        title: 'Tweets to Date',
        tweets: userTweets,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};
