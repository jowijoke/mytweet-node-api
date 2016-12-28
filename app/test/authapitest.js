/**
 * Created by john on 27/12/2016.
 */

'use strict';

const assert = require('chai').assert;
const TweetService = require('./tweet-service.js');
const fixtures = require('./fixtures.json');
const utils = require('../api/utils.js');

suite('Auth API tests', function () {

  let users = fixtures.users;

  //const tweetService = new TweetService('http://localhost:4000');
  const tweetService = new TweetService(fixtures.tweetService);

  test('login-logout', function () {
    var returnedUsers = tweetService.getUsers();
    assert.isNull(returnedUsers);

    const response = tweetService.login(users[0]);
    returnedUsers = tweetService.getUsers();
    assert.isNotNull(returnedUsers);

    tweetService.logout();
    returnedUsers = tweetService.getUsers();
    assert.isNull(returnedUsers);
  });
});
