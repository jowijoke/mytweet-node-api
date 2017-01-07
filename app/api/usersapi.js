'use strict';

const User = require('../models/user');
const Boom = require('boom');
const utils = require('./utils.js');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

exports.find = {

  auth: false,

  handler: function (request, reply) {
    User.find({}).exec().then(users => {
      reply(users);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },

};

exports.authenticate = {
    auth: false,
    handler: function (request, reply) {
        const user = request.payload;
        console.log("authuser:" + user);
        User.findOne({ email: user.email }).then(foundUser => {
          console.log("foundUser " + foundUser);
            if (foundUser && foundUser.password === user.password) {
              console.log("user success");
                const token = utils.createToken(foundUser);
                reply({ success: true, token: token, user:foundUser }).code(201);
                console.log("token " + token);
            } else {
              console.log("user failed");
                reply({ success: false, message: 'Authentication failed. User not found.' }).code(500);
            }
        }).catch(err => {
            reply(Boom.notFound('internal db failure'));
        });
    },

};

exports.findOne = {

  auth: false,

  handler: function (request, reply) {
    User.findOne({ _id: request.params.id }).then(user => {
      if (user != null) {
        reply(user);
      }

      reply(Boom.notFound('id not found'));
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};

exports.create = {

  auth: false,

  handler: function (request, reply) {
    const user = new User(request.payload);
    console.log("create user: " + user);
    user.save().then(newUser => {
      reply(newUser).code(201);
    }).catch(err => {
      reply(Boom.badImplementation('error creating User'));
    });
  },

};

exports.deleteAll = {

  auth: false,

  handler: function (request, reply) {
    User.remove({}).then(err => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing Users'));
    });
  },

};

exports.deleteOne = {

  auth: false,

  handler: function (request, reply) {
    User.remove({ _id: request.params.id }).then(user => {
      reply(User).code(204);
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};
