Tweetsaster.ReportIndexController = Ember.ObjectController.extend({
  needs: ['application'],
  lS: Ember.computed.alias('controllers.application.lS'),
  isFavourite: function(key, value) {
    if (arguments.length > 1) {
      this.set('controllers.application.lS.favourites_'+this.get('id'), value);
    }
    return this.get('controllers.application.lS.favourites_'+this.get('id'));
  }.property('id', 'controllers.application.lS'),
  actions: {
    toggleFavourite: function() {
      var isFavourite = this.get('isFavourite'),
          report = this.get('model');
      if (isFavourite)
        this.set('isFavourite', null);
      else
        this.set('isFavourite', report.toJSON({includeId: true}));
    }
  }
});