Tweetsaster.Report = Tweetsaster.Tweet.extend({
  comments: DS.hasMany('comment', 
                       {async: true, inverse: 'inReplyToStatus'}),
  filteredComments: function() {
    var prefix = '@'+this.get('user.name')+' Nuevas fotos',
        filtered = [];
    this.get('comments').then(function(comments) {
      comments.forEach(function(comment) {
        if (comment.get('text').lastIndexOf(prefix, 0) !== 0)
          filtered.pushObject(comment);
      });
    });
    return filtered;
  }.property('comments'),
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