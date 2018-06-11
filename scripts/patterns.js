//function
var pattern1 = function(){
	alert('this is a function');
}
//sample: pattern1();




//object
var pattern2 = {
	username: 'hendrik de permentier',
	hello: function(){
		alert('hello ' + pattern2.username);
	}
}
//sample: pattern3.hello();




//prototype
var Pattern3 = function(name){
	this.username = name;
}
Pattern3.prototype.hello = function(){
	alert('hello ' + this.username);
}
//sample: new Pattern2('hendrik de permentier').hello();




//factory-function returning an object
var pattern4 = function(name){
	var m = {
		username: name,
		hello: function(){
			alert('hello ' + m.username);
		}
	}
	return {
		hello: m.hello
	}
}
//sample: pattern4('hendrik de permentier').hello();




//self-executing-function returning an object (current T1-objects)
var pattern5 = (function(){
	var m = {
		username: 'hendrik de permentier',
		hello: function(){
			alert('hello ' + m.username);
		}
	}
	return {
		hello: m.hello
	}
}());
//sample: pattern5.hello();




//AMD module
define('pattern6', [], function(){
	var m = {
		username: 'hendrik de permentier',
		hello: function(){
			alert('hello ' + m.username);
		}
	}
	return {
		hello: m.hello
	}
});
//sample: require(['pattern6'], function(p6){p6.hello()});




//AMD module OR Normal JS || Read: function(factory){//init}(factory)
function(factory){
	if ( typeof define === "function" && define.amd ) {
		//requirejs
		define('pattern7', [], function(){
			return factory();
		});
	}else{
		//plain js
		window.pattern7 = factory();
	}
}(function(){
	var m = {
		username: 'hendrik de permentier',
		hello: function(){
			alert('hello ' + m.username);
		}
	}
	return {
		hello: m.hello
	}
});
//sample: require(['pattern7'], function(p7){p7.hello()}); / OR / window.pattern7.hello();




//AMD module OR Normal JS OR NodeJS || Read: function(context, factory){//init}(this, factory); where context=module (nodejs)||window (frontend)
//function(root){//this-context will be window in frontend; module in backend}(this)
(function(root, factory){
	if(root.exports){
		//nodejs
		root.exports = factory();
	}else if ( typeof root.define === "function" && root.define.amd ) {
		//requirejs
		define('pattern8', [], factory);
	}else{
		//plain js
		root.pattern8 = factory();
	}
}(this, function(){
	var m = {
		username: 'hendrik de permentier',
		hello: function(){
			alert('hello ' + m.username);
		}
	}
	return {
		hello: m.hello
	}
}));
//sample: require(['pattern8'], function(p8){p8.hello()}); / OR / window.pattern8.hello(); / OR / (@NodeJs) var p8 = require('pattern8'); p8.hello();