Tweetsaster.Tweet = DS.Model.extend({
  text: DS.attr('string'),
  created_at: DS.attr('string'),
  channel: DS.attr('string'),
});