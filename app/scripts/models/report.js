Tweetsaster.Report = Tweetsaster.Tweet.extend({
  comments: DS.hasMany('comment', 
                       {async: true, inverse: 'inReplyToStatus'}),
});