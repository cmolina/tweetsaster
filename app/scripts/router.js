Tweetsaster.Router.map(function () {
  this.resource('tweets', {path: '/'}, function() {
    this.route('earthquakes');
    this.route('fires');
    this.route('floods');
    this.route('search');
    this.route('tweetout');
  });
  this.resource('tweet', {path: '/noticia/:tweet_id'}, function() {
    this.route('index');
    this.route('map');
    this.route('pictures');
    this.route('comment');
    this.route('share');
    this.route('upload');
  });
});