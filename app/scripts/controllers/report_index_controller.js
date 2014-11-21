Tweetsaster.ReportIndexController = Ember.ObjectController.extend({
  isFavourite: false,
  actions: {
    toggleFavourite: function() {
      var report = this.get('model'),
          key = 'favourites.'+report.id,
          isFavourite = !!localStorage.getItem(key);
      if (isFavourite)
        localStorage.removeItem(key);
      else
        localStorage.setItem(key, 
                             JSON.stringify(report.toJSON({includeId: true})));
      this.toggleProperty('isFavourite');
    }
  }
});