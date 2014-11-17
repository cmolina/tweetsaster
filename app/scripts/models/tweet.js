Tweetsaster.GoogleApiKey = 'AIzaSyDiuj2l9-S2bE7K6i6Cxcgv6ZCDXaUiwYc';

Tweetsaster.Tweet = DS.Model.extend({
  text: DS.attr('string', {defaultValue: ''}),
  createdAt: DS.attr('string'),
  channel: DS.attr('string'),
  user: DS.belongsTo('user'),
  // GeoJSON Point
  coordinates: DS.attr(),
  // entities.media[{type: 'photo', mediaUrl: 'http://...png'}]
  entities: DS.attr(),

  pictures: function() {
    var mediaList = this.get('entities').media,
        picturesURL = [];
    if (!mediaList)
      return picturesURL;
    
    mediaList.forEach(function(media) {
      if (media.type === 'photo')
        picturesURL.push(media.mediaUrl);
    });
    return picturesURL;
  }.property('entities'),

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