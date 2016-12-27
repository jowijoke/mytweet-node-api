const UsersApi = require('./app/api/usersapi');
const TweetsApi = require('./app/api/tweetsapi');

module.exports = [

  { method: 'GET', path: '/api/users', config: UsersApi.find },
  { method: 'GET', path: '/api/users/{id}', config: UsersApi.findOne },
  { method: 'POST', path: '/api/users', config: UsersApi.create },
  { method: 'DELETE', path: '/api/users/{id}', config: UsersApi.deleteOne },
  { method: 'DELETE', path: '/api/users', config: UsersApi.deleteAll },

  { method: 'GET', path: '/api/tweets', config: TweetsApi.findAllTweets },
  { method: 'GET', path: '/api/tweets/{id}', config: TweetsApi.findTweets },
  { method: 'POST', path: '/api/tweets/{id}', config: TweetsApi.makeTweet },
  { method: 'DELETE', path: '/api/tweets/{senderId}', config: TweetsApi.deleteTweets },
  { method: 'DELETE', path: '/api/tweets', config: TweetsApi.deleteAllTweets },

  { method: 'POST', path: '/api/users/authenticate', config: UsersApi.authenticate },
];