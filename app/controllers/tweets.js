'use strict';
const Tweet = require('../models/tweet');
const User = require('../models/user');
const Follower = require('../models/follower');
const Handlebars = require('handlebars');
const moment = require('moment');
exports.home = {

  handler: (request, reply) => {
    const userEmail = request.auth.credentials.loggedInUser;
    let userId = null;
    User.findOne({ email: userEmail }).then(user => {
      userId = user._id;
      console.log('finding tweets');
      Tweet.find({sender: userId}).populate('sender').then(userTweets => {
        // Get all the users the current user is following
        Follower.find({follower: user}).populate('following').then(allFollowers => {
          // Create an array of the current user and who they follow
          const following = [user];
          allFollowers.forEach(function (index) {
            following.push(index.following.id);
          });

          Tweet.find({sender: {$in: following}}).nor({sender: userId}).populate('sender').sort({date: 'asc'}).then(followerTweets => {
            User.find().nor({_id: {$in: following}}).sort({email: 'asc'}).then(users => {
              console.log('Found ' + users.length + ' users');
              reply.view('home', {
                title: 'Homepage',
                tweets: followerTweets,
                userTweets: userTweets,
                users: users,
                logUser: true,
                notFollowing: true,
              });
            });
          }).catch(err => {
            reply.redirect('/');
          });
        });
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
      if (data.picture.length) {
        tweet.picture.data = data.picture;
        tweet.picture.contentType = 'jpg';
      }
      return tweet.save();
    }).then(userTweets => {
      reply.redirect('/home');
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

exports.getImage = {

  handler: function (request, reply) {
    let tweetId = request.params.tweetId;

    Tweet.findOne({ _id: tweetId }).exec((err, tweet) => {
      if (tweet.picture) {
        console.log(tweet.picture.data);
        reply(tweet.picture.data).type('image');
      }
    });
  },
};

//helper from handlebars that executes when 'exists' is used.
Handlebars.registerHelper('exists', function (variable, options) {
  if (typeof variable !== 'undefined') {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

exports.public = {

  handler: function (request, reply) {

    let userId = request.params.senderId;

    console.log('User Id ' + userId);

    User.findOne({ _id: userId }).then(user => {
      console.log('Found user ' + user.email);
      Tweet.find({ sender: userId }).populate('sender').then(userTweets => {
        reply.view('publicUser', {
          title: 'public Timeline',
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



Handlebars.registerHelper('dateFormat', function (timestamp) {
  // Formatting the date using momentjs
  return moment(timestamp).format('DD MMM YYYY HH:mm:SS');
});
