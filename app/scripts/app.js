localStorage.clear();

var Tweetsaster = window.Tweetsaster = Ember.Application.create({});

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
