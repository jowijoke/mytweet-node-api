'use strict';

const User = require('../models/user');
const Administrator = require('../models/administrator');
const Joi = require('joi');
const Follower = require('../models/follower');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

exports.main = {
  auth: false,
  handler: function (request, reply) {
    reply.view('main', { title: 'Welcome to MyTweet' });
  },

};

exports.signup = {
  auth: false,
  handler: function (request, reply) {
    reply.view('signup', { title: 'Sign up for MyTweet' });
  },

};

exports.register = {
  auth: false,

  validate: {

    payload: {
      firstName: Joi.string().regex(/^[A-Z][a-z]{2,}$/),
      lastName: Joi.string().regex(/^[A-Z]/).min(3),
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9@*#]{8,15}$/),
    },

    options: {
      abortEarly: false,
    },

    failAction: function (request, reply, source, error) {
      reply.view('signup', {
        title: 'Sign up error',
        errors: error.data.details,
      }).code(400);
    },

  },

  handler: function (request, reply) {
    const user = new User(request.payload);

    const plaintextPassword = user.password;

    bcrypt.hash(plaintextPassword, saltRounds, function(err, hash) {
      user.password = hash;
      return user.save().then(newUser => {
        reply.redirect('/login');
      }).catch(err => {
        reply.redirect('/');
      });
    })}

};

exports.login = {
  auth: false,
  handler: function (request, reply) {
    reply.view('login', { title: 'Login to MyTweet' });
  },

};

exports.authenticate = {

  auth: false,

  validate: {

    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },

    options: {
      abortEarly: false,
    },

    failAction: function (request, reply, source, error) {
      reply.view('login', {
        title: 'Sign in error',
        errors: error.data.details,
      }).code(400);
    },

  },

  handler: function (request, reply) {
    const user = request.payload;
    User.findOne({email: user.email}).then(foundUser => {
      bcrypt.compare(user.password, foundUser.password, function (err, isValid) {
        if (isValid) {
          request.cookieAuth.set(
              {
                loggedIn: true,
                loggedInUser: user.email,
              });
          reply.redirect('/home');
        }
        else
        {
          reply.redirect('/signup');
        }

      })
    }).
    catch(err => {
      reply.redirect('/signup');
    })
  }
};

exports.viewSettings = {

  handler: function (request, reply) {
    const userEmail = request.auth.credentials.loggedInUser;
    User.findOne({email: userEmail}).then(user => {
      Follower.find({follower: user}).populate('following').then(allFollowers => {
        // Create an array of the current user and who they follow
        const following = [user];
        allFollowers.forEach(function (index) {
          following.push(index.following.id);
        });
        User.find({_id: {$in: following}}).nor({_id: user}).sort({email: 'asc'}).then(users => {
          reply.view('settings', {title: 'Edit Account Settings', user: user, users: users,logUser: true,Following: true,});
        }).catch(err => {
          reply.redirect('/');
        });
      });
    });
  },
};

exports.updateSettings = {

  validate: {

    payload: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },

    options: {
      abortEarly: false,
    },

    failAction: function (request, reply, source, error) {
      reply.view('signup', {
        title: 'Sign up error',
        errors: error.data.details,
      }).code(400);
    },

  },

  handler: function (request, reply) {
    const editedUser = request.payload;
    const loggedInUserEmail = request.auth.credentials.loggedInUser;

    User.findOne({ email: loggedInUserEmail }).then(user => {
      user.firstName = editedUser.firstName;
      user.lastName = editedUser.lastName;
      user.email = editedUser.email;
      bcrypt.hash(editedUser.password, saltRounds, function(err, hash) {
        user.password = hash;
        return user.save();
      })
    }).then(user => {
      reply.view('settings', { title: 'Edit Account Settings', user: user });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.admin = {
  auth: false,
  handler: function (request, reply) {
    reply.view('adminLogin', { title: 'Administrator Login' });
  },

};

exports.adminLogin = {
  auth: false,

  validate: {

    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },

    options: {
      abortEarly: false,
    },

    failAction: function (request, reply, source, error) {
      reply.view('adminLogin', {
        title: 'Login error',
        errors: error.data.details,
      }).code(400);
    },

  },

  handler: function (request, reply) {
    const admin = request.payload;
    Administrator.findOne({ email: admin.email }).then(foundAdmin => {
      bcrypt.compare(admin.password, foundAdmin.password, function (err, isValid) {
        if (isValid) {
          request.cookieAuth.set(
              {
                loggedIn: true,
                loggedInUser: admin.email,
              });
          reply.redirect('/adminHome');
        }
        else
        {
          reply.redirect('/admin');
        }
      })
    }).catch(err => {
      console.log('Fail to login');
      reply.redirect('/admin');
    });
  },

};

exports.logout = {
  auth: false,
  handler: function (request, reply) {
    request.cookieAuth.clear();
    reply.redirect('/');
  },

};

