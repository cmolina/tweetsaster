Alarma.TweetController = Ember.ObjectController.extend({
	IsValidImageUrl: function(imageUrl, controller) {
	    $("<img>", {
	        src: imageUrl,
	        error: function() { console.log(imageUrl);},
	        load: function() {controller.set('image', imageUrl);  }
	    });
	},
	
	timePassed: function(){
		if(this.get("model.created_at")){
			var creationDatetime = new Date(this.get("model.created_at"));
		} else {
			var creationDatetime = new Date(this.get("model.created_at"));
		}
		var nowDatetime = new Date();
		//day in ms
		var dayMs = 24*60*60*1000;
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
			// case dayDiff <= 29:
// 					timePassed = parseInt(dayDiff/7) + 's';
// 					break;
// 				default:
// 					timePassed = parseInt(dayDiff/30) + 'm'
// 					break;
		}
		
		return timePassed;
	}.property()
});