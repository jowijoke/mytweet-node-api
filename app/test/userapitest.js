/**
 * Created by john on 27/12/2016.
 */

'use strict';

const assert = require('chai').assert;
const TweetService = require('./tweet-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('User API tests', function () {

  let users = fixtures.users;
  let newUser = fixtures.newUser;

  // let url = fixtures.url;
  let url = fixtures.tweetService;

  // const tweetService = new TweetService('http://localhost:4000');
  const tweetService = new TweetService(url);

  beforeEach(function () {
    //tweetService.deleteAllUsers();
    tweetService.login(users[0]);
  });

  afterEach(function () {
    //tweetService.deleteAllUsers();
    tweetService.logout();
  });

  test('create a user', function () {
    const returnedUser = tweetService.createUser(newUser);
    assert(_.some([returnedUser], newUser), 'returnedUser must be a superset of newUser');
    assert.isDefined(returnedUser._id);
  });


  test('get user', function () {
    const u1 = tweetService.createUser(newUser);
    const u2 = tweetService.getUser(u1._id);
    assert.deepEqual(u1, u2);
    console.log(u2);
  });

  test('get invalid user', function () {
    const u1 = tweetService.getUser('1234');
    assert.isNull(u1);
    const u2 = tweetService.getUser('012345678901234567890123');
    assert.isNull(u2);
  });

  test('delete a user', function () {
    const u = tweetService.createUser(newUser);
    assert(tweetService.getUser(u._id) != null);
    tweetService.deleteOneUser(u._id);
    assert(tweetService.getUser(u._id) == null);
  });

  test('get users detail', function () {
    for (let u of users) {
      tweetService.createUser(u);
    }

    const allUsers = tweetService.getUsers();
    for (var i = 0; i < users.length; i++) {
      assert(_.some([allUsers[i]], users[i]), 'newUser details');
      console.log(allUsers);
    }
  });

});
