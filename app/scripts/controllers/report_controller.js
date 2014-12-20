Tweetsaster.months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct' , 'nov', 'dic'];

Tweetsaster.timePassedFrom = function(date) {
  var date = new Date(date),
      nowDatetime = new Date(),
      hourMs = 60*60*1000, // miliseconds in an hour
      hours = (nowDatetime - date) / hourMs,
      timePassed;
  switch (true) {
    case hours*60*60 < 60:
      timePassed = parseInt(hours*60*60) + 's';
      break;
    case hours*60 < 60:
      timePassed = parseInt(hours*60) + 'm';
      break;
    case hours < 24:
      timePassed = parseInt(hours) + 'h';
      break;
    case hours < 2*24:
      timePassed = 'ayer';
      break;
    case hours < 7*24:
      timePassed = parseInt(hours/24)+'d';
      break;
    default:
      timePassed = date.getDate()+'-'+Tweetsaster.months[date.getMonth()];
      break;
  }
  return timePassed;
};

Tweetsaster.ReportController = Ember.ObjectController.extend({
  isFavourite: function(key, value) {
    if (arguments.length > 1) {
      Tweetsaster.lS.set('favourites_'+this.get('id'), value);
    }
    return Tweetsaster.lS.get('favourites_'+this.get('id'));
  }.property('id', 'Tweetsaster.lS'),
  timePassed: function() {
    return Tweetsaster.timePassedFrom(this.get("createdAt"));
  }.property('createdAt'),
  actions: {
    toggleFavourite: function() {
      var isFavourite = this.get('isFavourite'),
          report = this.get('model');
      if (isFavourite)
        this.set('isFavourite', null);
      else
        this.set('isFavourite', report.toJSON({includeId: true}));
    }
  }
});