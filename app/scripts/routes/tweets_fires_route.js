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