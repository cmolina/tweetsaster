Tweetsaster.ApplicationController = Ember.Controller.extend({
  currentPathDidChange: function() {
    this.set('_previousPath', this.get('_currentPath'));
    this.set('_currentPath', this.get('currentPath'));
  }.observes('currentPath'),
  actions: {
    transitionToRoute: function(route, id) {
      this.transitionToRoute(route, id);
    }
  }
});