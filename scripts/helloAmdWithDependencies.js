define(['jquery'], function(){
	var m = {
		show: function(name){
			var msg = 'Hello ' + (name || 'world');
			console.log(msg);
			return $('<div></div>').html(msg).appendTo($('body'));
		},
	};
	return {
		show: m.show
	};
});