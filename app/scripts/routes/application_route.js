Tweetsaster.ApplicationRoute = Ember.Route.extend({
  actions: {
    goBack: function() {
      var previousPath = this.controller.get('_previousPath');
      if (Ember.isBlank(previousPath))
        this.transitionTo.apply(this, arguments);
      else
        window.history.go(-1);
    }
  }
});