Tweetsaster.ReportsNewView = Ember.View.extend({
  autofocusInput: function() {
    $('#new-report').focus();
  }.on('didInsertElement')
});