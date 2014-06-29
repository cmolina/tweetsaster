Tweetsaster.Router.map(function () {
	this.resource('tweets', {path: '/'}, function(){
		this.route('earthquakes');
		this.route('fires');
		this.route('search');
		this.route('tweetout');
	});
});