'use strict';

const Tweet = require('../models/tweet');
const Boom = require('boom');
const utils = require('./utils.js');

exports.findAllTweets = {

  auth: false,

  handler: function (request, reply) {
    Tweet.find({}).populate('sender').then(tweets => {
      console.log("sending back tweets");
      reply(tweets).code(201);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },
};

exports.findTweets = {

  auth: 'jwt',

  handler: function (request, reply) {
    Tweet.find({ sender: request.params.id }).populate('sender').then(tweets => {
      reply(tweets);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },

};

exports.makeTweet = {

    auth: 'jwt',

    handler: function (request, reply) {
        const tweet = new Tweet(request.payload);
        console.log("tweet is " + tweet);
        tweet.sender = utils.getUserIdFromRequest(request);
        tweet.date = new Number(new Date());
        tweet.save().then(newTweet => {
          return Tweet.findOne(newTweet).populate('sender');
        }).then(tweet => {
          console.log("sending back newTweet" + tweet);
                reply(tweet).code(201);
            }).catch(err => {
          console.log("sending back newTweet failed" + err);
            reply(Boom.badImplementation('error making tweet'));
        });
    },

};

exports.deleteAllTweets = {

  auth: 'jwt',

  handler: function (request, reply) {
    Tweet.remove({}).then(err => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing Tweets'));
    });
  },

};

exports.deleteTweet = {

  auth: 'jwt',

  handler: function (request, reply) {
    let tweetId = request.payload;
    console.log("tweet Id is " + tweetId);
    Tweet.findOne({ _id: tweetId }).then(foundTweet => {
      return foundTweet.remove();
    }).then(result => {
      reply(result).code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing Tweets'));
    });
  },
};

exports.changeTweet = {

  auth: 'jwt',

  handler: function (request, reply) {
    const tweetId = request.payload;
    Tweet.findOne({ _id: tweetId }).then(foundTweet => {
      foundTweet.message = tweetId.message;
      return foundTweet.save();
    }).then(result => {
        reply(result).code(204);
      }).catch(err => {
        reply(Boom.badImplementation('error saving Tweets'));
      });
  },
};

exports.deleteTweets = {

  auth: 'jwt',

  handler: function (request, reply) {
    const user = request.params.id;
      Tweet.find({sender: user}).remove('tweet').then(err => {
        reply().code(204);
      }).catch(err => {
        reply(Boom.badImplementation('error removing all User Tweets'));
      });
  },
};
