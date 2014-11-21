var Tweetsaster = window.Tweetsaster = Ember.Application.create({LOG_TRANSITIONS_INTERNAL: true});

/* Order and include as you please. */
require('bower_components/ember-droplet/dist/ember-droplet');
require('scripts/utilities/*');
require('scripts/mixins/*');
require('scripts/controllers/*');
require('scripts/store');
// 'comment' and 'report' must be loaded after 'tweet' model
require('scripts/models/user');
require('scripts/models/tweet');
require('scripts/models/comment');
require('scripts/models/report');

require('scripts/routes/*');
require('scripts/views/*');
require('scripts/components/*');
require('scripts/router');
require('scripts/extras/*');
