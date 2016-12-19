'use strict';

const User = require('../models/user');
const friendship = require('../models/friendship');


exports.befriend = {

  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;
    let userId = null;
    User.findOne({ email: userEmail }).then(user => {
      userId = user._id;
      let targetId = request.params.targetId;
      console.log('Following ' + targetId);
      User.findOne({ _id: targetId }).then(targetUser => {
      console.log('Found user ' + targetUser.email);
      user.friendRequest(targetUser._id, function (err, request) {
        if (err) throw err;
      }).then(userTweets => {
        reply.redirect('/home');
      }).catch(err => {
        reply.redirect('/');
      });
      });
    });
  },
};