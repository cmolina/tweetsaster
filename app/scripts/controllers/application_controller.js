Tweetsaster.ApplicationController = Ember.Controller.extend({
  currentPathDidChange: function() {
    if (this.get('_goingBack')) {
      this.set('_previousPath', null);
      this.set('_goingBack', false);
    }
    else
      this.set('_previousPath', this.get('_currentPath'));
    this.set('_currentPath', this.get('currentPath'));
  }.observes('currentPath'),
  actions: {
    transitionToRoute: function(route, id) {
      this.transitionToRoute(route, id);
    }
  }
});