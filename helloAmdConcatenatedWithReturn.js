define('animate', ['jquery'], function(){
	var m = {
		textsize: function(options){
			if(! options) options = {};
			if(! options.target) return;
			if(!options.speed) options.speed = 200;
			if(!options.maxHeight) options.maxHeight = 200;
			if(!options.minHeight) options.minHeight = 20;
			options.target = $(options.target);
			setInterval(m._animate('textsize', options), options.speed);
		},
		_animate: function(type, options){
			return function(){
				switch(type){
					case 'textsize':
						if(! options.currentHeight || options.currentHeight >= options.maxHeight) options.currentHeight = options.minHeight;
						$(options.target).css({'font-size':options.currentHeight+'px'});
						options.currentHeight++;
						break;
				}
			}
		}
	}
	return {
		textsize: m.textsize
	}
});

define('helloAmdWithAnimation', ['jquery', 'animate'], function(jq, animate){
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

define(['helloAmdWithAnimation','animate'], function(helloFactRet, animateFactRet){
	return {
		helloAmd: helloFactRet,
		animateAmd: animateFactRet
	};
});