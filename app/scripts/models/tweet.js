Tweetsaster.Tweet = DS.Model.extend({
  text: DS.attr('string'),
  created_at: DS.attr('string'),
  channel: DS.attr('string'),
  formattedText: function() {
    var text = this.get('text');
    return text.charAt(0).toUpperCase() + text.slice(1);
  }.property('text')
});