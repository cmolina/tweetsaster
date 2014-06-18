Tweetsaster.ApplicationSerializer = DS.LSSerializer.extend();
Tweetsaster.ApplicationAdapter = DS.RESTAdapter.extend({});
DS.RESTAdapter.reopen({
  host: 'https://alarmer.herokuapp.com'
});