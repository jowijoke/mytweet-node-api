const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: String,
  date: Date,
});

const Tweet = mongoose.model('Follower', tweetSchema);
module.exports = Tweet;

