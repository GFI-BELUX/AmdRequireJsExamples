define(['jquery'], function(a){
	var m = {
		show: function(name){
			var msg = 'Hello ' + (name || 'world');
			console.log(msg);
			return a('<div></div>').html(msg).appendTo(a('body'));
		},
	};
	return {
		show: m.show
	};
});