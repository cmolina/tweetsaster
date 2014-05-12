var Alarma = window.Alarma = Ember.Application.create({
	ready: function(){
		localStorage.clear();
	}
});

Alarma.FocusTextAreaComponent = Ember.TextArea.extend({
  becomeFocused: function() {
    this.$().focus();
  }.on('didInsertElement')
});

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');

