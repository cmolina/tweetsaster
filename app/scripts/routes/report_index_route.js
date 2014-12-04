Tweetsaster.ReportIndexRoute = Ember.Route.extend({
  renderTemplate: function(controller) {
    this.render('report/index_header', {
      outlet: 'header',
      controller: controller
    });
    this.render('report/index', {
      controller: controller
    });
  }
});