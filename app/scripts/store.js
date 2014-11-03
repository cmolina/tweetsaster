DS.RESTAdapter.reopen({
  host: 'http://localhost:28017'
});

Tweetsaster.ApplicationAdapter = DS.RESTAdapter.extend({});

Tweetsaster.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: '_id',
  serialize: function (record, options) {
    var json = this._super(record, options);
    // Make sure the _id is a string
    if (json._id)
      json._id = json._id.toString();
    return json;
  }
});