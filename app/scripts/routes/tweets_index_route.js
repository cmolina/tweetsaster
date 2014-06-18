Tweetsaster.TweetsIndexRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin,{
 	beforeModel: function(){
		var store = this.store;
		$.get('http://alarmer.herokuapp.com/tweets?quantity=20&position=top').then(function(res){
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

