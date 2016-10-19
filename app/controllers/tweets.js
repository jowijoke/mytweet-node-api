'use strict';
const Tweet = require('../models/tweet');
const User = require('../models/user');

exports.home = {

  handler: (request, reply) => {
    Candidate.find({}).then(candidates => {
      reply.view('home', {
        title: 'Make a Donation',
        candidates: candidates,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};
