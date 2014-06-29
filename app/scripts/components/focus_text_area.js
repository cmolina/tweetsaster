Tweetsaster.FocusTextAreaComponent = Ember.TextArea.extend({
  becomeFocused: function() {
    this.$().focus();
  }.on('didInsertElement')
});