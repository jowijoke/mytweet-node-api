/**
 * Created by john on 20/12/2016.
 */

const mongoose = require('mongoose');

const followerSchema = mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Follower = mongoose.model('Follower', followerSchema);
module.exports = Follower;
