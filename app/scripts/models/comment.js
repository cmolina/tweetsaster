Tweetsaster.Comment = Tweetsaster.Tweet.extend({
  inReplyToStatus: DS.belongsTo('report'),
  comment: '',
  prepareText: function() {
    var name = this.get('inReplyToStatus.user.name'),
        comment = this.get('comment');
    this.set('text', '@'+name+' '+comment);
  },
  formattedText: function() {
    var comment = this.get('comment');
    if (!comment) {
      var text = this.get('text');
      if (text && text[0] == '@')
        comment = text.substring(text.indexOf(' ')+1);
    }
    return comment.charAt(0).toUpperCase() + comment.slice(1);
  }.property('comment', 'text'),
});
