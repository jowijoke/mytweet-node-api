'use strict';
const Tweet = require('../models/tweet');
const User = require('../models/user');

exports.home = {

  handler: (request, reply) => {
    reply.view('home', {
      title: 'Make a Tweet',
    });
  },
};

exports.report = {

  handler: function (request, reply) {
    Tweet.find({}).populate('sender').then(allTweets => {
      reply.view('report', {
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
      tweet.candidate = candidate._id;
      return tweet.save();
    }).then(newTweet => {
      reply.redirect('/report');
    }).catch(err => {
      reply.redirect('/');
    });
  },

};
