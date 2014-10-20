Tweetsaster.GoogleApiKey = 'AIzaSyDiuj2l9-S2bE7K6i6Cxcgv6ZCDXaUiwYc';

Tweetsaster.Tweet = DS.Model.extend({
  text: DS.attr('string'),
  created_at: DS.attr('string'),
  channel: DS.attr('string'),
  user: DS.attr(),
  // geo.coordinates[latitude, longitude]
  geo: DS.attr(),
  // entities.media[{type: 'photo', media_url: 'http://...png'}]
  entities: DS.attr(),
  pictures: function() {
    var mediaList = this.get('entities').media,
        picturesURL = [];
    mediaList.forEach(function(media) {
      if (media.type === 'photo')
        picturesURL.push(media.media_url);
    });
    return picturesURL;
  }.property('entities'),

  formattedText: function() {
    var text = this.get('text');
    return text.charAt(0).toUpperCase() + text.slice(1);
  }.property('text'),
  mapURL: function() {
    var coords = this.get('geo').coordinates;
    return 'https://www.google.com/maps/embed/v1/search?key=' + 
      Tweetsaster.GoogleApiKey + '&q=' + coords[0] + ',' + coords[1];
  }.property('geo'),
});