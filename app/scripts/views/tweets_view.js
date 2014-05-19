Alarma.TweetsView = Ember.View.extend({
	tapToMenu: function(){
		var dragging=false;
		$menu = $('.menu');
		$overlay = $('.overlay');
		
		$(document).on('touchmove', function(e){
			dragging = true;
		});
		
		$(document).on('touchend', function(e){
			//if showing menu it doesn't disappear if touching inside it
			//also doesn't fire if dragging
			if($(e.target).parents().hasClass('menu') || $(e.target).hasClass('menu') || dragging || 
				$(e.target).parents().is('form') || $(e.target).is('img')){
				dragging = false;
				return;
			}
			e.preventDefault();
			if($menu.css('display') == 'none'){
				$menu.show();
				$overlay.show();
			} else {
				$menu.hide();
				$overlay.hide();
			}
		});
	},
	
	hideMenu: function(){
		$('.menu a').on('click', function(){
			$menu.hide();
			$overlay.hide();
		});
	},
	
	didInsertElement: function(){
		this.hideMenu();
		this.tapToMenu();
	}
})