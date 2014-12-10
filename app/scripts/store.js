DS.ActiveModelAdapter.reopen({
  //host: 'http://localhost:28017'
  host: 'http://restapi-dsas3.ngrok.com'
});

Tweetsaster.ApplicationAdapter = DS.ActiveModelAdapter.extend({});

Tweetsaster.ApplicationSerializer = DS.ActiveModelSerializer.extend({});
var userEmbeddedSerializer = DS.ActiveModelSerializer.extend(
  DS.EmbeddedRecordsMixin, 
  {
    attrs: {
      user: {embedded: 'always'}
    }
  }
);
Tweetsaster.TweetSerializer = Tweetsaster.ReportSerializer =
  Tweetsaster.CommentSerializer = userEmbeddedSerializer;