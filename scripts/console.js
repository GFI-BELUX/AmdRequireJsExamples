define([], function(){
	m = {
		id: 'console',
		template: '<div class="output" style="height: 250px;width:100%;overflow-y: auto; padding: 5px;"></div><table style="position: absolute; bottom:0; width:100%; height:40px; margin:5px;"><tr><td><input type="text" class="form-control" placeholder="Console command" style="width:100%"></td><td style="width: 70px; padding: 5px;"><button class="btn btn-default">Run</button></td></tr></table>',
		consoleOutput: null,
		consoleInput: null,
		console: null,
		create: function(id){
			//create console
			m.console = $('<div></div>').css({height:'300px', position:'relative', border: '1px solid #aaa', margin:'20px'}).attr({id: id || m.id});
			m.console.html(m.template);
			//connect listeners
			m.consoleInput = m.console.find('input');
			m.events();
			//add to body
			$('body').append(m.console);
			console.log('Created live inpage-console');
		},
		events: function(){
			//on enter
			m.consoleInput.on('keypress', function(evt){if(evt.keyCode===13) m.run();});
			//on click run
			m.console.find('button').on('click', m.run);
			//override console
			var oldConsole = {log: console.log, warn: console.warn, error: console.error};
			console.log = function(msg){
				m.log(msg, '#999');
				oldConsole.log.apply(console, arguments);
			};
			console.error = function(msg){
				m.log(msg, '#f00');
				oldConsole.error.apply(console, arguments);
			};
			console.warn = function(msg){
				m.log(msg, '#f48024');
				oldConsole.warn.apply(console, arguments);
			};
			//window errors
			window.onerror = function(msg, url, line) {
				m.log(msg + ' (line ' + line + ')<br>' + url, '#f00');
			};
		},
		log: function(msg, color){
			if(! m.consoleOutput) m.consoleOutput = m.console.find('.output');
			m.consoleOutput.prepend($('<div></div>').css({'color':(color||'#000'), width:'100%'}).html(msg));
		},
		run: function(){
			var cmd = m.consoleInput.val();
			//log
			m.log('>> ' + cmd);
			//reset input
			m.consoleInput.val('');
			//run command
			eval(cmd);
		}
	};
	return{
		create: m.create
	}
});