const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: String,
  date: Date,
});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;

