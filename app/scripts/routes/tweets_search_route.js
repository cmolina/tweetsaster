Tweetsaster.TweetsSearchRoute = Ember.Route.extend({
  observesParameters: ['query'],
  model: function() {
    var params = this.get('queryParameters');
    return $.get('http://alarmer.herokuapp.com/tweets?quantity=20&position=search&query=' + params.query);
  },
  renderTemplate: function() {
    this.render('tweets.index', {controller: 'tweets.search'});
  },
  setupController: function(controller, model) {
    this.controllerFor('tweets').set('title', 'Buscar');
    this._super(controller, model);
  }
});

