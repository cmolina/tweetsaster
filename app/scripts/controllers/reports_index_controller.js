Tweetsaster.ReportsIndexController = Ember.ArrayController.extend(Ember.Evented, {
  sortProperties: ['id'],
  sortAscending: false,
  moreBottomReports: true,
  showingSpinner: function() {
    return this.get('arrangedContent.length') > 10 && this.get('moreBottomReports');
  }.property('length', 'moreBottomReports'),
  filteredContent: function() {
    return this.get('arrangedContent');
  }.property('arrangedContent')
});