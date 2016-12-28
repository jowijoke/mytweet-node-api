/**
 * Created by john on 27/12/2016.
 */
'use strict';

const assert = require('chai').assert;
const TweetService = require('./tweet-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Tweet API tests', function () {

  let users = fixtures.users;
  let tweets = fixtures.tweets;

  let newUser = fixtures.newUser;

  // const tweetService = new TweetService('http://localhost:4000');
  const tweetService = new TweetService(fixtures.tweetService);


  beforeEach(function () {
    tweetService.login(users[0]);
    tweetService.deleteAllTweets();
  });

  afterEach(function () {
    tweetService.deleteAllTweets();
    tweetService.logout();
  });


  test('create a tweet', function () {
    const returnedUser = tweetService.createUser(newUser);
     tweetService.makeTweet(returnedUser._id, tweets[0]);
    const returnedTweet = tweetService.getTweets(returnedUser._id);
    assert.equal(returnedTweet.length, 1);
    assert(_.some([returnedTweet[0]], tweets[0]), 'returned tweet must be a superset of tweet');
  });

  test('create multiple tweets', function () {
    const returnedUser = tweetService.createUser(newUser);
    for (var i = 0; i < tweets.length; i++) {
      tweets[i].sender = returnedUser._id;
      tweetService.makeTweet(tweets[i]);
    }

    const returnedTweets = tweetService.getTweets(returnedUser._id);
    assert.equal(returnedTweets.length, tweets.length);
    for (var i = 0; i < tweets.length; i++) {
      assert(_.some([returnedTweets[i]], tweets[i]), 'returned tweet must be a superset of tweet');
    }
  });

  test('delete a tweet for a particular user', function () {

    const returnedUser = tweetService.createUser(newUser);
    newTweet.user = returnedUser._id;
    const returnedTweet = tweetService.makeTweet(newTweet);

    const d1 = tweetService.getTweets(returnedUser._id);
    assert.equal(d1.length, 1);
    tweetService.deleteTweet(returnedTweet._id);
    const d2 = tweetService.getTweets(returnedUser._id);
    assert.equal(d2.length, 0);

  });

  test('delete all tweets for a selected user', function () {
    console.log('deleting all tweets for the selected user');
    const returnedUser = tweetService.createUser(newUser);
    for (var i = 0; i < tweets.length; i++) {
      tweets[i].user = returnedUser._id;
      tweetService.makeTweet(tweets[i]);
    }

    const d1 = tweetService.getTweets(returnedUser._id);
    assert.equal(d1.length, tweets.length);
    tweetService.deleteTweet(returnedUser._id);
    const d2 = tweetService.getTweets(returnedUser._id);
    assert.equal(d2.length, 0);
  });

  test('delete all tweets', function () {
    console.log('deleting all tweets in the database');
    const returnedUser = tweetService.createUser(newUser);
    for (var i = 0; i < tweets.length; i++) {
      tweets[i].user = returnedUser._id;
      tweetService.makeTweet(tweets[i]);
    }
    const d1 = tweetService.getTweets(returnedUser._id);
    console.log(d1)
    tweetService.deleteAllTweets();
    const d = tweetService.getAllTweets();
    assert.equal(d.length, 0);
  });


});