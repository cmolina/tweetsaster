Tweetsaster.timePassedFrom = function(date) {
  var creationDatetime = new Date(date);
  var nowDatetime = new Date();
  var dayMs = 24*60*60*1000; //day in ms
  var dayDiff = (nowDatetime - creationDatetime) / dayMs;
  var timePassed;
  switch (true) {
    case parseInt(dayDiff*24*60*60) === 0:
      timePassed = 'ahora';
      break;
    case dayDiff*24*60*60 < 61:
      timePassed = parseInt(dayDiff*24*60*60) + 's';
      break;
    case dayDiff*24*60 < 60:
      timePassed = parseInt(dayDiff*24*60) + 'm';
      break;
    case dayDiff*24 < 24:
      timePassed = parseInt(dayDiff*24) + 'h';
      break;
    default:
      timePassed = parseInt(dayDiff) + 'd';
      break;
  }
  return timePassed;
};

Tweetsaster.ReportController = Ember.ObjectController.extend({
  timePassed: function() {
    return Tweetsaster.timePassedFrom(this.get("createdAt"));
  }.property('createdAt')
});