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
  }.property('comments.length')
});