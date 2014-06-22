Tweetsaster.TweetsIndexRoute = Ember.Route.extend(Tweetsaster.ScrollTopMixin,{
 	beforeModel: function(){
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
		controller.set('model', model);
		controller.set('page', 1);
	}
	
});

