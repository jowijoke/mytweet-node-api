const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: String,
  picture: { data: Buffer, contentType: String },
  date:  {type: Number, default: (new Date()).getTime(),}
});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;

