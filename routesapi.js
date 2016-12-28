const UsersApi = require('./app/api/usersapi');
const TweetsApi = require('./app/api/tweetsapi');

module.exports = [

  { method: 'GET', path: '/api/users', config: UsersApi.find },
  { method: 'GET', path: '/api/users/{id}', config: UsersApi.findOne },
  { method: 'POST', path: '/api/users', config: UsersApi.create },
  { method: 'DELETE', path: '/api/users/{id}', config: UsersApi.deleteOne },
  { method: 'DELETE', path: '/api/users', config: UsersApi.deleteAll },
  { method: 'POST', path: '/api/users/authenticate', config: UsersApi.authenticate },

  { method: 'GET', path: '/api/tweets', config: TweetsApi.findAllTweets },
  { method: 'GET', path: '/api/users/{id}/tweets', config: TweetsApi.findTweets },
  { method: 'POST', path: '/api/users/{id}/tweets', config: TweetsApi.makeTweet },
  { method: 'DELETE', path: '/api/users/{id}/tweets', config: TweetsApi.deleteTweets },
  { method: 'DELETE', path: '/api/tweets/{tweetId}', config: TweetsApi.deleteTweet },
  { method: 'DELETE', path: '/api/tweets', config: TweetsApi.deleteAllTweets },


];