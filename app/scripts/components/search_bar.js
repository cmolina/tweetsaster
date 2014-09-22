Tweetsaster.SearchBarComponent = Ember.Component.extend({
  searchLabel: 'busca!',
  scrollToTop: function() {
    var that = this;
    window.scrollTo(0,0);
    $(window).on('touchmove', function() {
      var $field = $('#search-field');
      $field.blur();
    });
    $('#search-field').on('focus', function(evt) {
      if (window.pageYOffset !== 0) {
        var $field = $('#search-field');
        $field.blur();
        window.scrollTo(0,0);
      }
    });
  }.on('didInsertElement'),
  actions: {
    search: function() {
      this.sendAction('search', this.get('query'));
    }
  }
});