Tweetsaster.Router.map(function () {
  this.resource('tweets', {path: '/noticias/'}, function() {
    this.route('index', {path: '/canal/:channel'});
    this.route('geolocated', {path: '/geo/:lat/:lng/:within'});
  });
  this.route('search');
  this.route('tweetout');
  this.resource('tweet', {path: '/noticia/:tweet_id'}, function() {
    this.route('index');
    this.route('map');
    this.route('pictures');
    this.route('comment');
    this.route('share');
    this.route('upload');
  });
});