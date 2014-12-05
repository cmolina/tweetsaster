Tweetsaster.ApplicationController = Ember.Controller.extend({
  lS: function() {
    var lS = this.get('localStorage');
    if (!lS) {
      lS = Tweetsaster.LocalStorage.create();
      this.set('localStorage', lS);
    }
    return lS;
  }.property(),
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