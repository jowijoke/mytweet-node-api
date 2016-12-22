const Accounts = require('./app/controllers/accounts');
const Tweets = require('./app/controllers/tweets');
const Admin = require('./app/controllers/admin');
const Assets = require('./app/controllers/assets');
const Followers = require('./app/controllers/followers')

module.exports = [

  { method: 'GET', path: '/', config: Accounts.main },
  { method: 'GET', path: '/signup', config: Accounts.signup },
  { method: 'POST', path: '/register', config: Accounts.register },
  { method: 'GET', path: '/login', config: Accounts.login },
  { method: 'POST', path: '/login', config: Accounts.authenticate },
  { method: 'GET', path: '/logout', config: Accounts.logout },
  { method: 'GET',    path: '/admin', config: Accounts.admin },
  { method: 'POST', path: '/adminLogin', config: Accounts.adminLogin },

  { method: 'GET', path: '/follow/{targetId}', config: Followers.follow },
  { method: 'GET', path: '/unfollow/{followId}', config: Followers.unfollow },
  { method: 'GET', path: '/followerProfile/{followerId}', config: Followers.followerProfile},


  { method: 'GET', path: '/adminHome', config: Admin.home },
  { method: 'GET', path: '/deleteAdminTweet/{tweetId}', config: Admin.deleteAdminTweet },
  { method: 'GET', path: '/editUser/{userId}', config: Admin.editUser },
  { method: 'POST', path: '/saveUser/{userId}', config: Admin.saveUser },
  { method: 'GET', path: '/removeUser/{userId}', config: Admin.removeUser },
  { method: 'POST', path: '/deleteAllUserTweets/{userId}', config: Admin.deleteAllUserTweets },
  { method: 'POST', path: '/removeAllUsers', config: Admin.removeAllUsers },

  { method: 'GET', path: '/settings', config: Accounts.viewSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },

  { method: 'GET', path: '/home', config: Tweets.home },
  { method: 'GET', path: '/publicUser/{senderId}', config: Tweets.public },
  { method: 'GET', path: '/leaderboard', config: Tweets.leaderBoard },
  { method: 'GET', path: '/deleteTweet/{tweetId}', config: Tweets.deleteTweet },
  { method: 'POST', path: '/deleteAll', config: Tweets.deleteAll },
  { method: 'POST', path: '/tweet', config: Tweets.tweet },

  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory,
  },

];
