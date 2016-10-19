const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: String,
});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;

