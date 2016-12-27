'use strict';

const Tweet = require('../models/tweet');
const Boom = require('boom');

exports.findAllTweets = {

  auth: 'jwt',

  handler: function (request, reply) {
    Tweet.find({}).populate('sender').then(tweets => {
      reply(tweets);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },
};

exports.findTweets = {

  auth: 'jwt',

  handler: function (request, reply) {
    Tweet.find({ _id: request.params.id }).then(tweets => {
      reply(tweets);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },

};

exports.makeTweet = {

    auth: false,

    handler: function (request, reply) {
        const tweet = new Tweet(request.payload);
        tweet.save().then(newTweet => {
            Tweet.findOne(newTweet).populate('sender').then(tweet => {
                reply(tweet).code(201);
            });
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

exports.deleteTweets = {

  auth: 'jwt',

  handler: function (request, reply) {
    Tweet.remove({ _id: request.params.id }).then(result => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing Tweets'));
    });
  },
};