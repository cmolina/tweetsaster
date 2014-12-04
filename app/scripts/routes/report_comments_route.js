Tweetsaster.ReportCommentsRoute = Ember.Route.extend({
  renderTemplate: function(controller) {
    this.render('report/comments_header', {
      outlet: 'header',
      controller: controller
    });
    this.render('report/comments', {
      controller: controller
    });
  }
});