(function() {

localStorage.clear();
var Tweetsaster = window.Tweetsaster = Ember.Application.create({
	initialize: function(){
		
	}
});

//complete dataset


//truncate words longer than len with <br>
Tweetsaster.truncStrRec = function(str, index, len){
  var wordsArray = str.split("<br>");
  if(index > wordsArray.length-1 || wordsArray[index].length < len){
	  return str;
  }
  var word = wordsArray[index];
  var word1 = word.substring(0, len);
  var word2 = word.substring(len, word.length);
  var newStr = word1+ "<br>" + word2;
  wordsArray[index] = newStr;
  return Tweetsaster.truncStrRec(wordsArray.join("<br>"), index+1, len);
}

//prepare dataset to be pushed into localStorage
Tweetsaster.truncStr = function(text){
  var parsedText = new Array();
  var maxLen = 27;
  text.split(" ").forEach(function(word){
	  if(word.length > maxLen){
		  newStr = Tweetsaster.truncStrRec(word, 0, maxLen);
		  parsedText.push(newStr);
	  } else {
		  parsedText.push(word);
	  }
  });
  text = parsedText.join(" ");
	return text;
};

//TODO is it smart to load everything in store?
// Tweetsaster.tweets = tweets;
// if (!('alarma' in localStorage)){
// 	Tweetsaster.ApplicationRoute = Ember.Route.extend({
// 		model: function(){
// 			//thisModel = this;
// 			Tweetsaster.tweets.forEach(function(tweet){
// 				date = new Date(tweet.created_at);
// 				var tweet = this.store.createRecord('tweet', 
// 					{text: tweet.text, created_at: date.toISOString(), channel: tweet.channel}
// 				);
// 				tweet.save();
// 			}, this);
// 		}
// 	})
// }

Tweetsaster.FocusTextAreaComponent = Ember.TextArea.extend({
  becomeFocused: function() {
    this.$().focus();
  }.on('didInsertElement')
});

Tweetsaster.ScrollTopMixin = Ember.Mixin.create({
	actions: 
	{
		willTransition: function(transition){
			//on channel change get back to top
			window.scrollTo(0,0);
		}
	}
});



/* Order and include as you please. */


})();

(function() {

Tweetsaster.TweetController = Ember.ObjectController.extend({
	// isValidImageUrl: function(imageUrl, controller) {
// 	    $("<img>", {
// 	        src: imageUrl,
// 	        error: function() { console.log(imageUrl);},
// 	        load: function() {controller.set('image', imageUrl);  }
// 	    });
// 	},
	timePassed: function(){
		var creationDatetime = new Date(this.get("model.created_at"));
		var nowDatetime = new Date();
		var dayMs = 24*60*60*1000; //day in ms
		var dayDiff = (nowDatetime - creationDatetime) / dayMs;
		var timePassed;
		switch(true){
			case parseInt(dayDiff*24*60*60) == 0:
				timePassed = 'ahora';
				break;
			case dayDiff*24*60*60 < 61:
				timePassed = parseInt(dayDiff*24*60*60) + 's';
				break;
			case dayDiff*24*60 < 60:
				timePassed = parseInt(dayDiff*24*60) + 'm';
				break;
			case dayDiff*24 < 24:
				timePassed = parseInt(dayDiff*24) + 'h';
				break;
			default:
				timePassed = parseInt(dayDiff) + 'd';
				break;
		}
		return timePassed;
	}.property('created_at')
});

})();

(function() {

Tweetsaster.TweetsController = Ember.ObjectController.extend({
	title: '',
	searchBarVisible: false,
	actions:{
		toggleSearchBar: function(){
			this.toggleProperty('searchBarVisible');
		}
	}
});

})();

(function() {

Tweetsaster.TweetsIndexController = Ember.ArrayController.extend({
	sortProperties: ['id'],
	sortAscending: false,
	gettingMore: false,
	page: 1,
	tweetsPerPage: 20, 
	lastID: false,
	firstID: false,
	actions: {
		getMoreBottom: function(){
			if(this.get('gettingMore')){
				return;
			}
			console.log("getting more bottom");
			this.set('gettingMore', true);
			var controller = this;
			var model = this.get('model');
			var store = this.store;
			var lastID = this.get('arrangedContent').get('lastObject').get('id');
			$.get('http://alarmer.herokuapp.com/tweets?quantity=' + controller.get('tweetsPerPage')+'&position=bottom&id='+lastID).then(function(tweets){
				tweets.forEach(function(tweet){
					mongoID = tweet.id;
					if(mongoID < lastID){
						controller.set('lastID', mongoID);
					}
					store.push('tweet',{id: tweet.id, text: Tweetsaster.truncStr(tweet.text), created_at: tweet.created_at, channel: tweet.channel});
				});
				page = controller.get('page');
				controller.set('page', page+1);
				console.log("page " + controller.page);
				controller.set('gettingMore', false);
			});
		},
		getMoreTop: function(){
			if(this.get('gettingMore')){
				return;
			}
			console.log("getting more top");
			this.set('gettingMore', true);
			var controller = this;
			var model = this.get('model');
			var store = this.store;
			var firstID = this.get('arrangedContent').get('firstObject').get('id');
			$.get('http://alarmer.herokuapp.com/tweets?quantity=' + controller.get('tweetsPerPage')+'&position=top&id='+firstID).then(function(tweets){
				tweets.forEach(function(tweet){
					mongoID = tweet.id;
					if(mongoID > firstID){
						controller.set('firstID', mongoID);
					}
					store.push('tweet',{id: tweet.id, text: Tweetsaster.truncStr(tweet.text), created_at: tweet.created_at, channel: tweet.channel});
				});
				controller.set('gettingMore', false);
			});
		}
	}
});

})();

(function() {

Tweetsaster.TweetsTweetoutController = Ember.ArrayController.extend({
	text: null,
	selectedChannel: '',
	needs: ['tweetsIndex'],
	channels: [
		{value: '', label: '#generico'}, 
		{value: 'earthquakes', label: '#terremotos'}, 
		{value: 'fires', label: '#incendios'}
		],
	actions: {
		tweet: function(){
			var nowDatetime = new Date();
			var nowIsoDatetime = nowDatetime.toISOString();
			var created_at_str = nowIsoDatetime;
			var text = this.get('text');
			var channel = this.get('selectedChannel');
			var tweetChannel = '';
			if (channel !== ''){
				tweetChannel = ' #' + channel;
			}
			var tweetText = text + tweetChannel + ' #tweetsaster';
			$.post('http://alarmer.herokuapp.com/tweets', {text: tweetText});
			this.set('text', '');
			this.set('selectedChannel', '');
			if (channel === ''){
				this.transitionToRoute('tweets');
			} else {
			this.transitionToRoute('tweets.'+channel);
			}
		}
	}
});

})();

(function() {

Tweetsaster.ApplicationSerializer = DS.LSSerializer.extend();
Tweetsaster.ApplicationAdapter = DS.RESTAdapter.extend({});
DS.RESTAdapter.reopen({
  host: 'https://alarmer.herokuapp.com'
});

})();

(function() {

Tweetsaster.Tweet = DS.Model.extend({
  text: DS.attr('string'),
  created_at: DS.attr('string'),
  channel: DS.attr('string'),
});

})();

(function() {

Tweetsaster.TweetsEarthquakesRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin,{
 	beforeModel: function(){
		var store = this.store;
		$.get('http://alarmer.herokuapp.com/tweets?quantity=20&position=top&channel=earthquakes').then(function(res){
			store.pushMany('tweet',res);
		});
 	},
  model: function() {
		return this.store.filter('tweet', function(tweet){
			return tweet.get('channel') === 'earthquakes';
		})
	},
  renderTemplate: function(controller){
	  this.render('tweets/index', {controller: controller});
  },
  controllerName: 'tweetsIndex',
  setupController: function(controller, model) {
	  this.controllerFor('tweets').set('title', 'Canal: Terremotos');
	  controller.set('model', model);
	  controller.set('page', 1);
  },
  
});

})();

(function() {

Tweetsaster.TweetsFiresRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin,{
 	beforeModel: function(){
		var store = this.store;
		$.get('http://alarmer.herokuapp.com/tweets?quantity=20&position=top&channel=fires').then(function(res){
			store.pushMany('tweet',res);
		});
 	},
	model: function() {
		return this.store.filter('tweet', function(tweet){
			return tweet.channel === 'fires';
		})
	},
	renderTemplate: function(controller){
	  this.render('tweets/index', {controller: controller});
	},
	setupController: function(controller, model) {
	  this.controllerFor('tweets').set('title', 'Canal: Incendios');
	  controller.set('model', model);
	  controller.set('page', 1);
	},
	controllerName: 'tweetsIndex'
});

})();

(function() {

Tweetsaster.TweetsIndexRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin,{
 	beforeModel: function(){
		var store = this.store;
		//$.get('http://alarmer.herokuapp.com/tweets?quantity=20&position=top').then(function(res){
		$.get('http://alarmer.herokuapp.com/tweets?quantity=20&position=bottom&id=538f7d9a9da29ffccb3c13db').then(function(res){
			store.pushMany('tweet',res);
		});
 	},
	model: function(){
		return this.store.filter('tweet');
	},
	setupController: function(controller, model){
		this.controllerFor('tweets').set('title', 'Canal: Todas');
		controller.set('model', model);
		controller.set('page', 1);
	}
	
});



})();

(function() {

Tweetsaster.TweetsRoute = Ember.Route.extend({
  setupController: function(controller, model) {
	  this.controllerFor('tweets').set('title', 'Terremotos');
  }
});

})();

(function() {

Tweetsaster.TweetsTweetoutRoute = Ember.Route.extend({
	setupController: function(controller, model){
		this.controllerFor('tweets').set('title', 'Componer Mensaje')
	}
});

})();

(function() {

Tweetsaster.TweetsIndexView = Ember.View.extend({
	didScroll: function(){
		if(this.isScrolledToBottom()){
			this.get('controller').send('getMoreBottom');
		}
	},
	isScrolledToBottom: function(){
		var topViewportPosition = window.pageYOffset;
		var viewportMaxGap = ($(document).height() - $(window).height());
		console.log(topViewportPosition);
		console.log(viewportMaxGap);
		if (topViewportPosition === 0){
			return false;
		}
		return topViewportPosition > (viewportMaxGap-100);
	},
	
	didInsertElement: function(){
		console.log('insert');
		$(window).on('scroll', $.proxy(this.didScroll, this));
		view = this;
		$('#hook').hook({
  		reloadPage: false,
  		reloadEl: function(){
				view.get('controller').send('getMoreTop');
  		},
			swipeDistance: 250
		});
	},
	
	willDestroyElement: function(){
		console.log('destroy');
		$(window).off('scroll', $.proxy(this.didScroll, this));
	}
});

})();

(function() {

Tweetsaster.TweetsView = Ember.View.extend({	
	fastClick: function(){
		console.log('fast');
		FastClick.attach(document.body);
	},
	
	enableActivePseudoStyles: function(){
		document.addEventListener("touchstart", function() {},false);
	},
	
	didInsertElement: function(){
		this.fastClick();
		this.enableActivePseudoStyles();
	}
	
})

})();

(function() {

Tweetsaster.Router.map(function () {
	this.resource('tweets', {path: '/'}, function(){
		this.route('earthquakes');
		this.route('fires');
		this.route('tweetout');
	});
});

// Tweetsaster.ApplicationRoute = Ember.Route.extend({});
// Tweetsaster.TweetsController = Ember.ArrayController.extend({}); 
// Tweetsaster.TweetsFiresController = Ember.ArrayController.extend({});
// Tweetsaster.TweetsEarthquakesController = Ember.ArrayController.extend({});






})();