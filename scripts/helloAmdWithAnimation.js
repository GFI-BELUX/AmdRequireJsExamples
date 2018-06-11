define(['jquery', 'animate'], function(jq, animate){
	var m = {
		show: function(name, options){
			var msg = 'Hello ' + (name || 'world');
			console.log(msg);
			options.target = $('<div></div>').html(msg).appendTo($('body'));
			if(options && options.animate) animate.textsize(options);
			return options.target;
		},
	};
	return {
		show: m.show
	};
});