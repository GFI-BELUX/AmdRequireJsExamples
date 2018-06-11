define(['jquery'], function(jq){
	var m = {
		textsize: function(options){
			if(! options) options = {};
			if(! options.target) return;
			if(!options.speed) options.speed = 200;
			if(!options.maxHeight) options.maxHeight = 200;
			if(!options.minHeight) options.minHeight = 20;
			options.target = jq(options.target);
			setInterval(m._animate('textsize', options), options.speed);
		},
		_animate: function(type, options){
			return function(){
				switch(type){
					case 'textsize':
						if(! options.currentHeight || options.currentHeight >= options.maxHeight) options.currentHeight = options.minHeight;
						jq(options.target).css({'font-size':options.currentHeight+'px'});
						options.currentHeight++;
						break;
				}
			}
		}
	}
	return {
		textsize: m.textsize
	}
})