Tweetsaster.ApplicationController = Ember.Controller.extend({
  lS: function() {
    var lS = this.get('localStorage');
    if (!lS) {
      lS = Tweetsaster.LocalStorage.create();
      this.set('localStorage', lS);
    }
    return lS;
  }.property(),
  actions: {
    transitionToRoute: function(route, id) {
      this.transitionToRoute(route, id);
    }
  }
});