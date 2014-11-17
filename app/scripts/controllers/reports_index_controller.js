Tweetsaster.ReportsIndexController = Ember.ArrayController.extend({
  sortProperties: ['id'],
  sortAscending: false,
  moreBottomReports: true,
  showingSpinner: function() {
    return this.get('arrangedContent.length') > 10 && this.get('moreBottomReports');
  }.property('length', 'moreBottomReports')
});