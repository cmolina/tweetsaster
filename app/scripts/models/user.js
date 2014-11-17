Tweetsaster.User = DS.Model.extend({
  name: DS.attr('string'),
  verified: DS.attr(),
  screenName: DS.attr('string'),
  profileImageUrl: DS.attr('string'),
  profileImageMiniUrl: function() {
    // returns an 24px x 24px variant of the profile image URL
    return this.get('profileImageUrl').replace('_normal.', '_mini.');
  }
});