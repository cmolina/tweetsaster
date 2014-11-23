Tweetsaster.Report = Tweetsaster.Tweet.extend({
  comments: DS.hasMany('comment', 
                       {async: true, inverse: 'inReplyToStatus'}),
  allPictures: function() {
    var allPictures = this.get('pictures').toArray();
    this.get('comments').then(function(comments) {
      comments.forEach(function(comment) {
        allPictures.pushObjects(comment.get('pictures'));
      });
    }); 
    return allPictures;
  }.property('comments.@each.pictures', 'pictures'),
  center: function() {
    var coordinates = this.get('coordinates').coordinates;
    var lat = coordinates[1],
        lng = coordinates[0];
    return new google.maps.LatLng(lat, lng);
  }.property('coordinates')
});