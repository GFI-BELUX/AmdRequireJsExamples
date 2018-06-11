define(['jquery'], function(jq){
	var m = {
		editor: null,
		editorDiv: null,
		html: '',
		iEditors: 0,
		aceLoaded: false,
		create: function(options){
			if(! options) options = {};
			if(! m.html) m.html = jq(options.source || 'body').html();
			if(!m.aceLoaded) m.addAce(options);
			if(options.url){
				if(window.location.protocol!=='file:'){
					m.addEditor(options);
					m.getSource(options);
				}
			}else{
				m.addEditor(options)
				m.configureAce(options);
			};
		},
		addAce: function(options){
			jq('body').append(jq('<script><\/script>').attr({src:'http://cdnjs.cloudflare.com/ajax/libs/ace/1.2.3/ace.js', type: 'text/javascript', charset: 'utf-8'}));
			if(options.noScroll){
				jq('body').append(jq('<style></style>').html('.ace_scrollbar {display: none;}'));
			}
			m.aceLoaded = true;
		},
		addEditor: function(options){
			var target = jq(options.target || 'body');
			options.id = options.id || ('aceSnippet' + m.iEditors);
			m.iEditors++;
			if(options.header) target.append(jq('<h2 style="margin: 0 20px"></h2>').html(options.header));
			target.append(jq('<div></div>').css({height:options.height||'400px', margin: '20px'}).attr({id:options.id}));
		},
		getSource: function(options){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
				   if (xmlhttp.status == 200) {
					   options.content=xmlhttp.responseText;
					   m.configureAce(options);
				   }
				}
			};
			xmlhttp.open("GET", options.url, true);
			xmlhttp.send();
		},
		configureAce: function(options){
			var interv = setInterval(function(){
				if(window.ace){
					clearInterval(interv);
					m.editor = ace.edit(options.id);
					m.editor.setTheme('ace/theme/clouds');
					m.editor.getSession().setMode(options.mode || 'ace/mode/html');
					m.editor.setValue(options.content || m.html, 1);
					m.editor.setReadOnly(true);
					console.log('Created pagesource editor');
				}
			},500);
		}
	};
	return {
		create: m.create
	}
});