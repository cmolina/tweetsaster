(function() {

localStorage.clear();

var Tweetsaster = window.Tweetsaster = Ember.Application.create({});

/* Order and include as you please. */


})();

(function() {

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

})();

(function() {

Tweetsaster.ScrollTopMixin = Ember.Mixin.create({
	actions: 
	{
		willTransition: function(transition){
			//on channel change get back to top
			window.scrollTo(0,0);
		}
	}
});

})();

(function() {

Tweetsaster.timePassedFrom = function(date){
	var creationDatetime = new Date(date);
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
}

Tweetsaster.TweetController = Ember.ObjectController.extend({
	timePassed: function(){
		return Tweetsaster.timePassedFrom(this.get("created_at"));
	}.property('created_at')
});

})();

(function() {

Tweetsaster.TweetsController = Ember.ObjectController.extend({
	title: '',
	searchString: '',
	searchBarVisible: false,
	actions:{
		toggleSearchBar: function(){
			this.toggleProperty('searchBarVisible');
			this.set('searchString', '');
		},
		hideSearchBar: function(){
			this.set('searchBarVisible', false);
			this.set('searchString', '');
		},
		getMoreSearch: function(query){
			var params = Ember.Router.QueryParameters.create({ query: query });
			this.transitionToRoute('tweets.search', params);
		}
	}
});

})();

(function() {

Tweetsaster.getLastIdFrom = function(arrangedContent, position){
	if(position === 'bottom'){
			return arrangedContent.get('lastObject').get('id');
		} else { //top
			return arrangedContent.get('firstObject').get('id');
		}
}

Tweetsaster.ghashtags= function(arrangedContent, position){
	if(position === 'bottom'){
			return arrangedContent.get('lastObject').get('id');
		} else { //top
			return arrangedContent.get('firstObject').get('id');
		}
}

Tweetsaster.updateControllerIDs = function(id, position, controller){
	if(position === 'bottom'){
		if(id < controller.get('lastID')){
			controller.set('lastID', id);
			}
		} else { //top
			if(id > controller.get('lastID')){
				controller.set('firstID', id);
			}
		}
}

Tweetsaster.moreBottomTweets = function(tweets, controller){
	var moreTweets = true;
	if(tweets.length != 20){
		moreTweets = false;
	}
	controller.set('moreBottomTweets', moreTweets);
}

Tweetsaster.getMoreTweets = function(position, controller){
	if(controller.get('gettingMore')){
		return;
	}
	controller.set('gettingMore', true);
	var id = Tweetsaster.getLastIdFrom(controller.get('arrangedContent'), position);
	var store = controller.store;
	$.get('http://alarmer.herokuapp.com/tweets?quantity=' + controller.get('tweetsPerRequest')+'&position='+position+'&id='+id).always(function(){
		controller.set('gettingMore', false);
	}).then(function(tweets){
		tweets.forEach(function(tweet){
			Tweetsaster.updateControllerIDs(tweet.id, position, controller);
			store.push('tweet', {id: tweet.id, text: Tweetsaster.truncStr(tweet.text), created_at: tweet.created_at, channel: tweet.channel});
		});
		if(position === 'bottom'){
			Tweetsaster.moreBottomTweets(tweets, controller);
		}
	});
}

Tweetsaster.TweetsIndexController = Ember.ArrayController.extend({
	needs: 'tweets',
	sortProperties: ['id'],
	sortAscending: false,
	gettingMore: false,
	tweetsPerRequest: 20, 
	lastID: false,
	firstID: false,
	moreBottomTweets: true,
	tweetsCount: function(){
		return this.get('arrangedContent.length');
	}.property('length'),
	hasTweets: function(){
		return this.get('tweetsCount') > 0;
	}.property('tweetsCount'),
	showingSpinner: function(){
		return this.get('tweetsCount') > 10 && this.get('moreBottomTweets');
	}.property('length', 'moreBottomTweets'),
	actions: {
		getMoreBottom: function(){
			Tweetsaster.getMoreTweets('bottom', this);
		},
		getMoreTop: function(){
			Tweetsaster.getMoreTweets('top', this);
		}
	}
});

})();

(function() {

Tweetsaster.TweetsSearchController = Ember.ArrayController.extend({
	hasTweets: function(){
		return this.get('length');
	}.property('length'),
	showSpinner: false
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
			var hashtags = '';
			if (channel !== ''){
				hashtags += ' #' + channel;
			}
			hashtags += ' #tweetsaster';
			var tweetText = text + hashtags;
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

Tweetsaster.ApplicationAdapter = DS.RESTAdapter.extend({});

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
		this.controllerFor('tweets').send('hideSearchBar');
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
	  this._super(controller, model);
  },
  
});

})();

(function() {

Tweetsaster.TweetsFiresRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin,{
 	beforeModel: function(){
		this.controllerFor('tweets').send('hideSearchBar');
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
		this._super(controller, model);
	},
	controllerName: 'tweetsIndex'
});

})();

(function() {

Tweetsaster.TweetsIndexRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin,{
 	beforeModel: function(){
		this.controllerFor('tweets').send('hideSearchBar');
		var store = this.store;
		//the get should be the one commented out but for demo purposes (pullToRefresh) it loads older tweets than the ones
		//available
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
		this._super(controller, model);
	}
	
});



})();

(function() {

Tweetsaster.TweetsRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin,{
  setupController: function(controller, model) {
	  this.controllerFor('tweets').set('title', 'Terremotos');
		this._super(controller, model);
  }
});

})();

(function() {

Tweetsaster.TweetsSearchRoute = Ember.Route.extend({
	observesParameters: ['query'],
	model: function(){
		var params = this.get('queryParameters');
		return $.get('http://alarmer.herokuapp.com/tweets?quantity=20&position=search&query=' + params.query);
	},
	renderTemplate: function() {
	    this.render('tweets.index', {controller: 'tweets.search'});
  },
	setupController: function(controller, model){
		this.controllerFor('tweets').set('title', 'Buscar');
		this._super(controller, model);
	}

});



})();

(function() {

Tweetsaster.TweetsTweetoutRoute = Ember.Route.extend({
	setupController: function(controller, model){
		this.controllerFor('tweets').send('hideSearchBar');
		this.controllerFor('tweets').set('title', 'Componer Mensaje');
		this._super(controller, model);
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
		if (topViewportPosition === 0){
			return false;
		}
		return topViewportPosition > (viewportMaxGap-100);
	},

	didInsertElement: function(){
		$(window).on('scroll', $.proxy(this.didScroll, this));
		view = this;
		$('#hook').hook({
  		reloadPage: false,
  		reloadEl: function(){
				view.get('controller').send('getMoreTop');
  		},
			swipeDistance: 100
		});
	},
	
	willDestroyElement: function(){
		$(window).off('scroll', $.proxy(this.didScroll, this));
	}
});

})();

(function() {

Tweetsaster.TweetsView = Ember.View.extend({	
	fastClick: function(){
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

Tweetsaster.FocusTextAreaComponent = Ember.TextArea.extend({
  becomeFocused: function() {
    this.$().focus();
  }.on('didInsertElement')
});

})();

(function() {

Tweetsaster.SearchBarComponent = Ember.Component.extend({
	scrollToTop: function(){
		var that = this;
		window.scrollTo(0,0);
		$(window).on('touchmove', function(){
			var $field = $('#search-field');
			$field.blur();
		});
		$('#search-field').on('focus', function(evt){
			if(window.pageYOffset != 0){
				var $field = $('#search-field');
				$field.blur();
				window.scrollTo(0,0);
			}
		});
	}.on('didInsertElement'),
	actions:{
		search: function(){
			this.sendAction('search', this.get('query'));
		}
	}
});

})();

(function() {

Tweetsaster.Router.map(function () {
	this.resource('tweets', {path: '/'}, function(){
		this.route('earthquakes');
		this.route('fires');
		this.route('search');
		this.route('tweetout');
	});
});

})();

(function() {

/**
 * Router additions to work with query parameters in
 * Ember.js.
 *
 * https://github.com/ElteHupkes/ember-query-params
 *
 * @author Elte Hupkes
 */
(function() {
	var merge = Ember.merge, keys = Ember.keys,
		slice = Array.prototype.slice;

	Ember.Router.reopen({
		/**
		 * The current query string.
		 */
		queryString: '',

		/**
		 * Calculates query parameters from the query string.
		 */
		queryParameters: function(k, params) {
			if (arguments.length === 2) {
				// Setter, serialize and set query string
				this.set('queryString', serialize(params));
				return params;
			}

			// Getter
			return deserialize(this.get('queryString'));
		}.property('queryString'),

		/**
		 * Overrides handleURL to process the query string in a
		 * URL.
		 */
		handleURL: function(url) {
			var parts = url.split('?', 2),
				oldInfos = generateOldInfos(this.router),
				that = this;

			// Update the query string and query parameters
			this.set('queryString', parts.length < 2 ? '' : parts[1]);
			return this._super(parts[0]).then(function() {
				// When the transition has completed, we're going to check which routes
				// are left with "dirty" contents due to changed query parameters. We're
				// then going to update these route's contexts.
				that.updateParameterContexts(oldInfos);
			});
		},

		/**
		 * Checks whether the query parameters in the URL
		 * still match the active query parameter object,
		 * and updates the URL if they don't. This is can
		 * be used to update the URL without transitioning
		 * if query parameters are changed internally. It
		 * is also used after a transition to bypass Ember
		 * not updating the URL when transitioning to the
		 * same route.
		 */
		synchronizeURL: function() {
			var currentURL = this.location.getURL(),
				newURL = currentURL.split('?', 1)[0],
				qs = this.get('queryString');

			if (qs) {
				newURL += '?'+qs;
			}

			if (newURL !== currentURL) {
				this.location.setURL(newURL);
			}
		},

		/**
		 * In this hook the router's updateURL method is
		 * created - this method is used to set the new URL
		 * after a transition. The new URL that will be set
		 * is generated by the RouteRecognizer and will not
		 * include any query parameters. Overriding the method
		 * here allows us to append the query parameters before
		 * the path is set.
		 */
		startRouting: function() {
			this._super();

			var router = this.router,
				oldUpdate = router.updateURL,
				that = this;

			router.updateURL = function(path) {
				var qs = that.get('queryString');
				if (qs) {
					path += '?'+qs;
				}

				oldUpdate.call(router, path);
			};
		},

		/**
		 * Wrapper over transitionTo that updates parameter contexts.
		 * You can supply an Ember.Router.QueryParameters object as
		 * the second argument (so the first context) to have it
		 * processed.
		 */
		transitionTo: function(handlerName) {
			var parts = queryPartition(this.router, handlerName, slice.call(arguments, 1)),
				oldInfos = generateOldInfos(this.router);

			this.set('queryParameters', parts.queryParams);

			var transition = this._super.apply(this, parts.args),
				that = this;

			transition.promise.then(function() {
				// Update routes that weren't refreshed with their
				// new query parameters
				if (that.updateParameterContexts(oldInfos)) {
					// If one of the query-contexts has changed but the active
					// URL hasn't, this means that we're a "victim" of the new
					// check in Ember RC7 that doesn't finalize the transition
					// if routes + contexts stay the same. In that case we have
					// to update the URL manually.
					// There is a cleaner way of doing this by detecting the change
					// within `updateParameterContexts`, but that would result in
					// the URL to be changed twice in RC6.
					that.synchronizeURL();
				}
			});

			return transition;
		},

		generate: function(handlerName) {
			var parts = queryPartition(this.router, handlerName, slice.call(arguments, 1)),
				url = this._super.apply(this, parts.args),
				queryString = serialize(parts.queryParams);

			if (queryString) {
				url += '?'+queryString;
			}

			return url;
		},

		/**
		 * In order to force the transition's match point, we're going
		 * to jump to the parent of the highest-level dirty route.
		 *
		 * @param oldInfos {Array}
		 * @return {Boolean} Whether any existing route's query contexts
		 * 					 have changed.
		 */
		updateParameterContexts: function(oldInfos) {
			var currentInfos = this.router.currentHandlerInfos,
				queryContextHasChanged = false;

			for (var i = 0, l = currentInfos.length; i < l; i++) {
				var handlerObj = currentInfos[i],
					handler = handlerObj.handler,
					oldObj = oldInfos[i],
					observes = handler.observesParameters,
					hasParameters = observes && (observes === true || Ember.isArray(observes));

				if (!hasParameters || !handler.modelWithQuery) {
					// Don't care about handlers without parameters
					// or handlers we cannot update anyway.
					continue;
				}

				// Create parameter set for this handler
				var handlerParams = handler.get('queryParameters');

				// Check if we were previously in this state - if not
				// we can assume model() was called and the query params
				// are assumed up to date.
				if ((!oldObj || oldObj.name !== handlerObj.name
					|| oldObj.context !== handler.context)) {
					handler.currentQueryParams = handlerParams;
					continue;
				}

				if (parametersDiffer(handler.currentQueryParams, handlerParams)) {
					queryContextHasChanged = true;

					// Update query parameters by calling modelWithQuery
					// In line with the new router changes I'll allow this
					// to return a promise, which is why we need these obnoxious
					// inner closures ;).
					var resolveFunc = (function() {
							var han = handler;

							return function() {
								return han.modelWithQuery();
							};
						})(),
						updateFunc = (function() {
							var controller = handler.controllerFor(handler.controllerName || handler.routeName),
								han = handler;

							return function(context) {
								// This mimics the internal setContext() method.
								han.context = context;
								if (han.contextDidChange) { han.contextDidChange(); }

								// Call setupController
								han.setupController(controller, context);
							};
						})();

					handler.currentQueryParams = handlerParams;
					Ember.RSVP.resolve()
						.then(resolveFunc)
						.then(updateFunc);
				}
			}

			return queryContextHasChanged;
		}
	});

	// Marker object for query parameters in transition.
	Ember.Router.QueryParameters = Ember.Object.extend();

	/**
	 * Reopen Route to gain up to date
	 * route-specific query params.
	 */
	Ember.Route.reopen({
		/**
		 * Computed property that extracts this route's
		 * relevant parameters.
		 */
		queryParameters: function() {
			return extract(this.get('router.queryParameters'),
				this.get('observesParameters'));
		}.property('router.queryParameters'),

		/**
		 * The modelWithQuery method is called when the query
		 * parameters for this route have changed and should
		 * return the model updated with the latest params.
		 */
		modelWithQuery: function() {
			return this.model.apply(this, arguments);
		}
	});

	/**
	 * Simple one-dimensional object comparison for
	 * parameter objects.
	 * @param a
	 * @param b
	 * @returns {boolean}
	 */
	var parametersDiffer = function(a, b) {
		var k = keys(a);

		if (k.length != keys(b).length) {
			return true;
		}

		for (var i = 0, l = k.length; i < l; i++) {
			if (a[k[i]] !== b[k[i]]) {
				return true;
			}
		}

		return false;
	};

	/**
	 * One-level object copy, extracting only the
	 * relevant parameters.
	 * @param obj
	 * @param params {Boolean|Array} A route's "observesParameters" setting.
	 * @returns {{}}
	 */
	var extract = function(obj, params) {
		var r = {};
		params = params || [];

		if (typeof params === "boolean") {
			return params ? r : merge(r, obj);
		}

		params.forEach(function(param) {
			if (param in obj) {
				r[param] = obj[param];
			}
		});
		return r;
	};

	/**
	 * Serializes the parameter object.
	 * @param params {}
	 * @returns {String}
	 */
	var serialize = function(params) {
		var arr = [];
		for (var k in params) {
			if (!params.hasOwnProperty(k) || !params[k]) {
				// Ignore falsy values
				continue;
			}

			// Need to encode the keys and values
			// just in case they contain "=", "&" or "?".
			// If they're added to something like HashLocation
			// they'll probably be encoded again by the browser,
			// which will make them look mildly hideous, but
			// so be it..
			var key = encodeURIComponent(k);
			if (params[k] === true) {
				// Flag value
				arr.push(key);
			} else {
				// Simple key/value pair
				arr.push(key+'='+encodeURIComponent(params[k]));
			}
			arr.push();
		}
		return arr.join('&');
	};

	/**
	 * Deserializes a query string into
	 * a key => value object.
	 * @param queryString
	 * @returns {{}}
	 */
	var deserialize = function(queryString) {
		// Getter, unserialize query string
		var pairs = queryString.split('&'),
			params = {};

		pairs.forEach(function(pair) {
			if (!pair) { return; }
			var kv = pair.split('=', 2), key, value;
			if (kv.length < 2) {
				// Key without value is considered flag
				value = true;
			} else {
				value = decodeURIComponent(kv[1]);
			}

			key = decodeURIComponent(kv[0]);
			params[key] = value;
		});

		return params;
	};


	/**
	 * Returns the query parameters and actual contexts given
	 * a handler name and list of contexts (the arguments to
	 * transitionTo and generate). Returns an object with two
	 * properties:
	 * - queryParams: The query params object for the given arguments
	 * - contexts: The contexts argument minus an eventual QueryParameters object.
	 * - args: The full argument array for generate / transitionTo
	 * 			(handler name and contexts without query params).
	 */
	var queryPartition = function(router, handlerName, contexts) {
		var queryParams = {},
			currentHandlerInfos = router.currentHandlerInfos || [],
			overrideParams, handlers,
			matchPoint;

		// Detect a QueryParameters object and shift it off the parameters array
		if (contexts[0] && contexts[0] instanceof Ember.Router.QueryParameters) {
			var paramsObject = contexts.shift();
			overrideParams = paramsObject.getProperties(keys(paramsObject));
		}

		// Get the query parameters that should be maintained
		if (!router.hasRoute(handlerName)) {
			handlerName += '.index';
		}

		handlers = router.recognizer.handlersFor(handlerName);
		matchPoint = getMatchPoint(router, handlers, contexts);

		var l = currentHandlerInfos.length;
		for (var i = 0; i < l, i < matchPoint; i++) {
			var handlerObj = currentHandlerInfos[i],
				handler = handlerObj.handler;

			// Merge with existing query params
			if (handler.currentQueryParams) {
				merge(queryParams, handler.currentQueryParams);
			}
		}

		if (overrideParams) {
			// Merge the query object parameters into
			// the params.
			merge(queryParams, overrideParams);
		}

		// Clean out any value that is falsy
		keys(queryParams).forEach(function(key) {
			if (!queryParams[key]) {
				delete queryParams[key];
			}
		});

		return {
			contexts: contexts,
			queryParams: queryParams,
			args: [handlerName].concat(contexts)
		};
	};

	// Generates the list of info objects that is used to check
	// changes over transitions
	var generateOldInfos = function(router) {
		var infos = [],
			currentInfos = router.currentHandlerInfos || [];

		for (var i = 0, l = currentInfos.length; i < l; i++) {
			var infoObj = currentInfos[i];
			infos.push({
				name: infoObj.name,
				context: infoObj.handler.context
			});
		}

		return infos;
	};

	// In order to determine the parameters to maintain in
	// queryPartition, we really need to know the match
	// point. Therefore I define a simplified getMatchPoint
	// below that calculates it.
	// TODO use active transition information
	var getMatchPoint = function (router, handlers, objects) {
		// If no match point is found, the last route is always matched
		// to any potential query parameters object; so return length - 1
		// by default.
		var matchPoint = handlers.length - 1, i,
			currentHandlerInfos = router.currentHandlerInfos || [],
			nrObjects = objects.length;

		for (i = handlers.length - 1; i >= 0; i--) {
			var handlerObj = handlers[i],
				handlerName = handlerObj.handler,
				oldHandlerInfo = currentHandlerInfos[i],
				hasChanged = false;

			if (!oldHandlerInfo || oldHandlerInfo.name !== handlerName) {
				hasChanged = true;
			}

			if ((handlerObj.isDynamic || (handlerObj.names && handlerObj.names.length)) && nrObjects) {
				nrObjects--;
				hasChanged = true;
			}

			if (hasChanged) {
				matchPoint = i;
			}
		}

		return matchPoint;
	};


})();


})();