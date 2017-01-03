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

    auth: {
      strategy: 'jwt',
    },

    handler: function (request, reply) {
        const tweet = new Tweet(request.payload);
        tweet.sender = utils.getUserIdFromRequest(request);
        tweet.date = new Date();
        tweet.save().then(newTweet => {
          return Tweet.findOne(newTweet).populate('sender');
        }).then(tweet => {
                reply(tweet).code(201);
            }).catch(err => {
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
    let tweetId = request.params.tweetId;
    Tweet.remove({ _id: tweetId }).then(result => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing Tweets'));
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
