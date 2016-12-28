'use strict';

const SyncHttpService = require('./sync-http-service');
const baseUrl = 'http://localhost:4000';


class TweetService {

  constructor(baseUrl) {
    this.httpService = new SyncHttpService(baseUrl);
  }

  login(user) {
    return this.httpService.setAuth('/api/users/authenticate', user);
  }

  logout() {
    this.httpService.clearAuth();
  }

  getUsers() {
    return this.httpService.get('/api/users');
  }

  getUser(id) {
    return this.httpService.get('/api/users/' + id);
  }


  createUser(newUser) {
    return this.httpService.post('/api/users', newUser);
  }


  deleteOneUser(id) {
    return this.httpService.delete('/api/users/' + id);
  }

  deleteAllUsers() {
    return this.httpService.delete('/api/users');
  }

  makeTweet(id, tweet) {
    return this.httpService.post('/api/senders' + id + '/tweets', tweet );
  }


  getTweets(id) {
    return this.httpService.get('/api/senders/' + id + '/tweets');
  }


  getAllTweets() {
    return this.httpService.get('/api/tweets' );
  }


  deleteTweet(id) {
    return this.httpService.delete('/api/tweets/' + id );
  }


  deleteAllTweets() {
    return this.httpService.delete('/api/tweets');
  }

}

module.exports = TweetService;
