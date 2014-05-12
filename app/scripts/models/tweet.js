Alarma.Tweet = DS.Model.extend({
  text: DS.attr('string'),
  created_at: DS.attr('string', {embedded: 'always'}),
  channel: DS.attr('string')
});