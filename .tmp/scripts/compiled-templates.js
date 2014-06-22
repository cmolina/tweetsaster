Ember.TEMPLATES["tweets"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\n        <div class=\"new-tweet-background\"></div>\n        <div class=\"new-tweet\"></div>\n		");
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n	<div class=\"filler\"></div>\n	<div class=\"sub-header\">\n		<input type\"text\" id=\"search-field\">\n		<!-- TODO: api -->\n		<button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "CALL_TO_API", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"btn\" id=\"search-btn\">busca</button>\n	</div>\n	\n	");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n					<img class=\"menu-icon\" src=\"images/bell.png\">\n					");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\n					<img class=\"menu-icon\" src=\"images/earthquake.png\">\n					");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\n					<img class=\"menu-icon\" src=\"images/flame.png\">\n					");
  }

function program11(depth0,data) {
  
  
  data.buffer.push("\n					<img class=\"menu-icon\" src=\"images/dots.png\">\n					");
  }

  data.buffer.push("<div class=\"hook\" id=\"hook\"></div>\n<div class=\"spacer\"></div>\n<div class=\"wrapper\">\n	<div class=\"header\">\n		<button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleSearchBar", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"btn\" id=\"top-left-icon\">\n	        <div class=\"finder\"></div>\n		</button>\n		<h1>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\n		");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "tweets.tweetout", options) : helperMissing.call(depth0, "link-to", "tweets.tweetout", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n	</div>\n	");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "searchBarVisible", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n    \n	");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    <footer>\n		<ul class=\"nav\">\n					");
  hashContexts = {'tagName': depth0};
  hashTypes = {'tagName': "STRING"};
  options = {hash:{
    'tagName': ("li")
  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "tweets.index", options) : helperMissing.call(depth0, "link-to", "tweets.index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n			\n					");
  hashContexts = {'tagName': depth0,'class': depth0};
  hashTypes = {'tagName': "STRING",'class': "STRING"};
  options = {hash:{
    'tagName': ("li"),
    'class': ("pull-left")
  },inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "tweets.earthquakes", options) : helperMissing.call(depth0, "link-to", "tweets.earthquakes", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n			\n			\n					");
  hashContexts = {'tagName': depth0,'class': depth0};
  hashTypes = {'tagName': "STRING",'class': "STRING"};
  options = {hash:{
    'tagName': ("li"),
    'class': ("pull-left")
  },inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "tweets.fires", options) : helperMissing.call(depth0, "link-to", "tweets.fires", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n			\n			\n					");
  hashContexts = {'tagName': depth0,'class': depth0};
  hashTypes = {'tagName': "STRING",'class': "STRING"};
  options = {hash:{
    'tagName': ("li"),
    'class': ("pull-left")
  },inverse:self.noop,fn:self.program(11, program11, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "link-to", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n			\n		</ul>\n    </footer>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["tweets/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes;
  data.buffer.push("\n    	");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack1 = helpers.each.call(depth0, {hash:{
    'itemController': ("tweet")
  },inverse:self.noop,fn:self.program(2, program2, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    	<div class=\"list-element\">\n    			<div id=\"loading-gif\">\n    			</div>\n    	</div>\n    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts;
  data.buffer.push("\n    		<div class=\"list-element\">\n    			<div class=\"main-col\">\n    				<div class=\"side-col\">\n    					<div class=\"time\">\n    						");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "timePassed", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    					</div>\n    					");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "controller.image", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    				</div>\n    				");
  hashContexts = {'unescaped': depth0};
  hashTypes = {'unescaped': "STRING"};
  stack1 = helpers._triageMustache.call(depth0, "text", {hash:{
    'unescaped': ("true")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    			</div>\n    		</div>\n    	");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\n    						<div class=\"img-tweet\">\n    							<img ");
  hashContexts = {'src': depth0};
  hashTypes = {'src': "STRING"};
  options = {hash:{
    'src': ("controller.image")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n    						</div>\n    					");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\n	<div class=\"list-element\">\n		<div class=\"main-col\">\n			Todavía no hay tweets en este canal\n		</div>\n	</div>\n    ");
  }

  data.buffer.push("<div class=\"list-wrapper\">\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "model", {hash:{},inverse:self.program(5, program5, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n\n<script>\n// function imageColorBox(){\n// 	console.log('imageColorBox');\n// 	setTimeout(function(){\n// 		$('img').each(function(){\n// 			$this = $(this);\n// 			href = $this.attr('src')\n// 			console.log(href);\n// 			$this.colorbox({href:href, height:\"100%\",fixed:true, closeButton:false});\n// 		});\n// 		$('#cboxContent').on('click', function(){\n// 			$.colorbox.close();\n// 		});\n// 	}, 2000);\n// \n// $(window).on('hashchange', function() {\n//   imageColorBox();\n// });\n// \n// }\n// \n// $(imageColorBox)\n    \n</script>");
  return buffer;
  
});

Ember.TEMPLATES["tweets/tweetout"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"list-wrapper\">\n    <div class=\"tweetout\">\n    	<form ");
  hashContexts = {'on': depth0};
  hashTypes = {'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "tweet", {hash:{
    'on': ("submit")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n    		");
  hashContexts = {'value': depth0,'cols': depth0,'rows': depth0};
  hashTypes = {'value': "ID",'cols': "STRING",'rows': "STRING"};
  options = {hash:{
    'value': ("text"),
    'cols': ("23"),
    'rows': ("2")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['focus-text-area'] || depth0['focus-text-area']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "focus-text-area", options))));
  data.buffer.push("\n    		<br />\n    		<div class=\"controls\">\n    			");
  hashContexts = {'value': depth0,'content': depth0,'optionValuePath': depth0,'optionLabelPath': depth0};
  hashTypes = {'value': "ID",'content': "ID",'optionValuePath': "STRING",'optionLabelPath': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
    'value': ("selectedChannel"),
    'content': ("channels"),
    'optionValuePath': ("content.value"),
    'optionLabelPath': ("content.label")
  },contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    			<button type=\"submit\">Envia!</button>\n    		</div>\n    	</form>\n    </div>\n</div>");
  return buffer;
  
});