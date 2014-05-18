Alarma.TweetController = Ember.ObjectController.extend({
	// isValidImageUrl: function(imageUrl, controller) {
// 	    $("<img>", {
// 	        src: imageUrl,
// 	        error: function() { console.log(imageUrl);},
// 	        load: function() {controller.set('image', imageUrl);  }
// 	    });
// 	},
	timePassed: function(){
		var creationDatetime = new Date(this.get("model.created_at"));
		var nowDatetime = new Date();
		var dayMs = 24*60*60*1000; //day in ms
		var dayDiff = (nowDatetime - creationDatetime) / dayMs;
		var timePassed;
		switch(true){
			case parseInt(dayDiff*24*60*60) == 0:
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
	}.property('created_at')
});