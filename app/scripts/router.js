Tweetsaster.Router.map(function () {
  this.resource('reports', {path: '/noticias/'}, function() {
    this.route('index', {path: '/todos'});
    this.route('geolocated', {path: '/geo/:lat/:lng/:within'});
  });
  this.route('reports.new', {path: '/reportar'});
  this.route('search');
  this.resource('report', {path: '/noticia/:report_id'}, function() {
    this.route('index');
    this.route('map');
    this.route('pictures');
    this.route('comment');
  });
  this.route('report.denounce', {path: '/noticia/:report_id/denuncia'});
});