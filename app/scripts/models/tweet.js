Tweetsaster.GoogleApiKey = 'AIzaSyDiuj2l9-S2bE7K6i6Cxcgv6ZCDXaUiwYc';

Tweetsaster.Tweet = DS.Model.extend({
  text: DS.attr('string', {defaultValue: ''}),
  createdAt: DS.attr('string'),
  channel: DS.attr('string'),
  user: DS.belongsTo('user'),
  // GeoJSON Point
  coordinates: DS.attr(),
  // extendedEntities.media[{type: 'photo', mediaUrl: 'http://...png'}]
  extendedEntities: DS.attr(),
  denounce: DS.attr(),
  // temporaly save the media_ids
  mediaIds: DS.attr(),
  timePassed: function() {
    return Tweetsaster.timePassedFrom(this.get('createdAt'));
  }.property('createdAt'),

  pictures: function() {
    var mediaList = this.get('extendedEntities.media'),
        picturesURL = [];
    if (!mediaList)
      return picturesURL;
    
    mediaList.forEach(function(media) {
      if (media.type === 'photo')
        picturesURL.push(media.media_url);
    });
    return picturesURL;
  }.property('extendedEntities.media'),

  formattedText: function() {
    var text = this.get('text');
    if (text)
      return text.charAt(0).toUpperCase() + text.slice(1);
  }.property('text'),
  
  mapURL: function() {
    var coords = this.get('coordinates').coordinates;
    return 'https://www.google.com/maps/embed/v1/search?key=' + 
      Tweetsaster.GoogleApiKey + '&q=' + coords[1] + ',' + coords[0];
  }.property('coordinates'),
});