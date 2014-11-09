localStorage.clear();

var Tweetsaster = window.Tweetsaster = Ember.Application.create({LOG_TRANSITIONS_INTERNAL: true});

/* Order and include as you please. */
require('scripts/utilities/*');
require('scripts/mixins/*');
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/components/*');
require('scripts/router');
require('scripts/extras/*');
