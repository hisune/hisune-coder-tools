$(function(){
//获取并返回数据
function getJson (data,name){
	//给数据添加索引
	var newData = {},
		num = 0;
	for (k in data){
		newData[k] = data[k];
		newData[k]["url"] = k;
		newData[k]["index"] = num;
		num ++;
	};
	//获取指定数据
	var getData = function(index){
		for(i in newData){
			if(i == index)
				return newData[i];
			for(k in newData[i]){
				if(newData[i][k] == index)
					return newData[i];
			}
		}
	};
	//获取当前索引号
	var index = getData(name).index;
	//返回指定数据
	return {
		"prev" : getData(index - 1),
		"next" : getData(index + 1),
		"thisName": getData(index)
	};
};

//原始数据
var data = {
	/*核心 18*/
	jQuery_selector_context:{title:"jQuery(sel,[context])",type:"核心"},
	jQuery_html_ownerDocument:{title :"jQuery(html,[ownerDocument])",type:"核心"},
	jQuery_callback:{title : "jQuery(callback)",type:"核心"},
	"jQuery.holdReady":{title : "jQuery.holdReady(hold)",type:"核心"},
	each:{title:"each(callback)",type:"核心"},
	size:{title:"size()",type:"核心"},
	length:{title:"length",type:"核心"},
	selector:{title:"selector",type:"核心"},
	context:{title:"context",type:"核心"},
	get:{title:"get([index])",type:"核心"},
	index_1:{title:"index([selector|element])",type:"核心"},
	data:{title:"data([key],[value])",type:"核心"},
	removeData:{title:"removeData([name|list])",type:"核心"},
	"jQuery.data":{title:"jQuery.data(element,[key],[value])",type:"核心"},
	queue:{title:"queue(element,[queueName])",type:"核心"},
	dequeue:{title:"dequeue([queueName])",type:"核心"},
	clearQueue:{title:"clearQueue([queueName])",type:"核心"},
	"jQuery.fn.extend":{title:"jQuery.fn.extend(object)",type:"核心"},
	"jQuery.extend_object":{title:"jQuery.extend(object)",type:"核心"},
	"jQuery.noConflict":{title:"jQuery.noConflict([extreme])",type:"核心"},
	
	/*选择器 51*/
	id:{title:"id",type:"选择器"},
	element:{title:"element",type:"选择器"},
	"class":{title:"class",type:"选择器"},
	"all":{title:"*",type:"选择器"},
	multiple:{title:"selector1,selector2,selectorN",type:"选择器"},
	descendant:{title:"ancestor descendant",type:"选择器"},
	child:{title:"parent > child",type:"选择器"},
	next_1:{title:"prev + next",type:"选择器"},
	siblings_1:{title:"prev ~ siblings",type:"选择器"},
	
	first_1:{title:":first",type:"选择器"},
	not_1:{title:":not(selector)",type:"选择器"},
	even:{title:":even",type:"选择器"},
	odd:{title:":odd",type:"选择器"},
	eq_1:{title:":eq(index)",type:"选择器"},
	gt:{title:":gt(index)",type:"选择器"},
	lang:{title:":lang",type:"选择器"},
	last_1:{title:":last",type:"选择器"},
	lt:{title:"lt(index)",type:"选择器"},
	header:{title:":header",type:"选择器"},
	animated:{title:":animated",type:"选择器"},
	focus_1:{title:":focus",type:"选择器"},
	root:{title:":root",type:"选择器"},
	target:{title:":target",type:"选择器"},
	
	contains:{title:":contains(text)",type:"选择器"},
	empty_1:{title:"empty",type:"选择器"},
	has_1:{title:":has(selector)",type:"选择器"},
	parent_1:{title:":parent",type:"选择器"},
	hidden_1:{title:":hidden",type:"选择器"},
	visible:{title:":visible",type:"选择器"},
	attributeHas:{title:"[attribute]",type:"选择器"},
	attributeEquals:{title:"[attribute=value]",type:"选择器"},
	attributeNotEqual:{title:"[attribute!=value]",type:"选择器"},
	attributeStartsWith:{title:"[attribute^=value]",type:"选择器"},
	attributeEndsWith:{title:"[attribute$=value]",type:"选择器"},
	attributeContains:{title:"[attribute*=value]",type:"选择器"},
	attributeMultiple:{title:"[selector1][selector2][selectorN]",type:"选择器"},
	
	firstChild:{title:":first-child",type:"选择器"},
	firstOfType:{title:":first-of-type",type:"选择器"},	
	lastChild:{title:":last-child",type:"选择器"},
	lastOfType:{title:":last-of-type",type:"选择器"},
    nthChild:{title:":nth-child()",type:"选择器"},
	nthLastChild:{title:":nth-last-child()",type:"选择器"},
	nthLastOfType:{title:":nth-last-of-type()",type:"选择器"},
	nthOfType:{title:":nth-of-type()",type:"选择器"},
	onlyChild:{title:":only-child",type:"选择器"},
	onlyOfType:{title:":only-of-type",type:"选择器"},
	
	input:{title:":input",type:"选择器"},
	text_1:{title:":text",type:"选择器"},
	password:{title:":password",type:"选择器"},
	radio:{title:":radio",type:"选择器"},
	checkbox:{title:":checkbox",type:"选择器"},
	submit_1:{title:":submit",type:"选择器"},
	image:{title:":image",type:"选择器"},
	"reset":{title:":reset",type:"选择器"},
	button:{title:":button",type:"选择器"},
	file:{title:":file",type:"选择器"},
	hidden_1:{title:":hidden",type:"选择器"},
	enabled:{title:":enabled",type:"选择器"},
	disabled:{title:":disabled",type:"选择器"},
	checked:{title:":checked",type:"选择器"},
	selected:{title:":selected",type:"选择器"},
	
	/*属性 9*/
	attr:{title:"attr(name|pro|key,val|fn)",type:"属性"},
	removeAttr:{title:"removeAttr(name)",type:"属性"},
	prop:{title:"prop(name|pro|key,val|fn)",type:"属性"},
	removeProp:{title:"removeProp(name)",type:"属性"},
	addClass:{title:"addClass(class|fn)",type:"属性"},
	removeClass:{title:"removeClass([class|fn])",type:"属性"},
	toggleClass:{title:"toggleClass(class|fn[,sw])",type:"属性"},
	html:{title:"html([val|fn])",type:"属性"},
	text:{title:"text([val|fn])",type:"属性"},
	val:{title:"val([val|fn|arr])",type:"属性"},
	
	/*筛选 26*/
	eq:{title:"eq(index|-index)",type:"筛选"},
	first:{title:"first()",type:"筛选"},
	last:{title:"last()",type:"筛选"},
	hasClass:{title:"hasClass(class)",type:"筛选"},
	filter:{title:"filter(expr|obj|ele|fn)",type:"筛选"},
	is:{title:"is(expr|obj|ele|fn)",type:"筛选"},
	map:{title:"map(callback)",type:"筛选"},
	has:{title:"has(expr|ele)",type:"筛选"},
	not:{title:"not(expr|ele|fn)",type:"筛选"},
	"slice":{title:"slice(start, [end])",type:"筛选"},
	children:{title:"children([expr])",type:"筛选"},
	closest:{title:"closest(expr,[con]|obj|ele)",type:"筛选"},
	"find":{title:"find(expr|obj|ele)",type:"筛选"},
	next:{title:"next([expr])",type:"筛选"},
	nextAll:{title:"nextAll([expr])",type:"筛选"},
	nextUntil:{title:"nextUntil([exp|ele][,fil])",type:"筛选"},
	offsetParent:{title:"offsetParent()",type:"筛选"},
	parent:{title:"parent([expr])",type:"筛选"},
	parents:{title:"parents([expr])",type:"筛选"},
	parentsUntil:{title:"parentsUntil([exp|ele][,fil])",type:"筛选"},
	prev:{title:"prev([expr])",type:"筛选"},
	prevAll:{title:"prevAll([expr])",type:"筛选"},
	prevUntil:{title:"prevUntil([exp|ele][,fil])",type:"筛选"},
	siblings:{title:"siblings([expr])",type:"筛选"},
	add:{title:"add(expr|ele|html|obj[,con])",type:"筛选"},
	andSelf:{title:"andSelf()",type:"筛选"},
	addBack:{title:"addBack()",type:"筛选"},
	contents:{title:"contents()",type:"筛选"},
	end:{title:"end()",type:"筛选"},
	
	/*文档处理 17*/
	append:{title:"append(content|fn)",type:"文档处理"},
	appendTo:{title:"appendTo(content)",type:"文档处理"},
	prepend:{title:"prepend(content|fn)",type:"文档处理"},
	prependTo:{title:"prependTo(content)",type:"文档处理"},
	after:{title:"after(content|fn)",type:"文档处理"},
	before:{title:"before(content|fn)",type:"文档处理"},
	insertAfter:{title:"insertAfter(content)",type:"文档处理"},
	insertBefore:{title:"insertBefore(content)",type:"文档处理"},
	wrap:{title:"wrap(html|ele|fn)",type:"文档处理"},
	unwrap:{title:"unwrap()",type:"文档处理"},
	wrapAll:{title:"wrapAll(html|ele)",type:"文档处理"},
	wrapInner:{title:"wrapInner(html|ele|fn)",type:"文档处理"},
	replaceWith:{title:"replaceWith(content|fn)",type:"文档处理"},
	replaceAll:{title:"replaceAll(selector)",type:"文档处理"},
	empty:{title:"empty()",type:"文档处理"},
	remove:{title:"remove([expr])",type:"文档处理"},
	detach:{title:"detach([expr])",type:"文档处理"},
	clone:{title:"clone([Even[,deepEven]])",type:"文档处理"},
	
	/*css 10*/
	css:{title:"css(name|pro|[,val|fn])",type:"css"},
	"jQuery.cssHooks":{title:"jQuery.cssHooks",type:"css"},
	offset:{title:"offset([coordinates])",type:"css"},
	position:{title:"position()",type:"css"},
	scrollTop:{title:"scrollTop([val])",type:"css"},
	scrollLeft:{title:"scrollLeft([val])",type:"css"},
	height:{title:"height([val|fn])",type:"css"},
	width:{title:"width([val|fn])",type:"css"},
	innerHeight:{title:"innerHeight()",type:"css"},
	innerWidth:{title:"innerWidth()",type:"css"},
	outerHeight:{title:"outerHeight([options])",type:"css"},
	outerWidth:{title:"outerWidth([options])",type:"css"},
	
	/*事件 36*/
	ready:{title:"ready(fn)",type:"事件"},
	on:{title:"on(events,[selector],[data],fn)",type:"事件"},
	off:{title:"off(events,[selector],[fn])",type:"事件"},
	bind:{title:"bind(type,[data],fn)",type:"事件"},
	one:{title:"one(type,[data],fn)",type:"事件"},
	trigger:{title:"trigger(type,[data])",type:"事件"},
	triggerHandler:{title:"triggerHandler(type,[data])",type:"事件"},
	unbind:{title:"unbind(type,[data|fn])",type:"事件"},
	live:{title:"live(type,[data],fn)",type:"事件"},
	die:{title:"die(type,[fn])",type:"事件"},
	delegate:{title:"delegate(sel,[type],[data],fn)",type:"事件"},
	undelegate:{title:"undelegate([sel,[type],fn])",type:"事件"},
	hover:{title:"hover([over,]out)",type:"事件"},
	toggle:{title:"toggle(fn, fn2, [fn3, fn4, ...])",type:"事件"},
	"blur":{title:"blur([[data],fn])",type:"事件"},
	change:{title:"change([[data],fn])",type:"事件"},
	"click":{title:"click([[data],fn])",type:"事件"},
	dblclick:{title:"dblclick([[data],fn])",type:"事件"},
	error:{title:"error([[data],fn])",type:"事件"},
	"focus":{title:"focus([[data],fn])",type:"事件"},
	focusin:{title:"focusin([data],fn])",type:"事件"},
	focusout:{title:"focusout([data],fn)",type:"事件"},
	keydown:{title:"keydown([[data],fn])",type:"事件"},
	keypress:{title:"keypress([[data],fn])",type:"事件"},
	keyup:{title:"keyup([[data],fn])",type:"事件"},
	mousedown:{title:"mousedown([[data],fn])",type:"事件"},
	mouseenter:{title:"mouseenter([[data],fn])",type:"事件"},
	mouseleave:{title:"mouseleave([[data],fn])",type:"事件"},
	mousemove:{title:"mousemove([[data],fn])",type:"事件"},
	mouseout:{title:"mouseout([[data],fn])",type:"事件"},
	mouseover:{title:"mouseover([[data],fn])",type:"事件"},
	mouseup:{title:"mouseup([[data],fn])",type:"事件"},
	resize:{title:"resize([[data],fn])",type:"事件"},
	"scroll":{title:"scroll([[data],fn])",type:"事件"},
	"select":{title:"select([[data],fn])",type:"事件"},
	"submit":{title:"submit([[data],fn])",type:"事件"},
	"unload":{title:"unload([[data],fn])",type:"事件"},
	
	/*效果 14*/
	show:{title:"show([s.[e],[fn]])",type:"效果"},
	hide:{title:"hide([s,[e],[fn]])",type:"效果"},
	toggle:{title:"toggle([s],[e],[fn])",type:"效果"},
	slideDown:{title:"slideDown([s],[e],[fn])",type:"效果"},
	slideUp:{title:"slideUp([s,[e],[fn]])",type:"效果"},
	slideToggle:{title:"slideToggle([s],[e],[fn])",type:"效果"},
	fadeIn:{title:"fadeIn([s],[e],[fn])",type:"效果"},
	fadeOut:{title:"fadeOut([s],[e],[fn])",type:"效果"},
	fadeTo:{title:"fadeTo([[s],o,[e],[fn]])",type:"效果"},
	fadeToggle:{title:"fadeToggle([s,[e],[fn]])",type:"效果"},
	animate:{title:"animate(p,[s],[e],[fn])",type:"效果"},
	"stop":{title:"stop([c],[j])",type:"效果"},
	delay:{title:"delay(d,[q])",type:"效果"},
	finish:{title:"finish([queue])",type:"效果"},
	"jQuery.fx.off":{title:"jQuery.fx.off",type:"效果"},
	"jQuery.fx.interval":{title:"jQuery.fx.interva",type:"效果"},
	
	/*Ajax 14*/
	"jQuery.ajax":{title:"$.ajax(url,[settings])",type:"Ajax"},
	"load":{title:"load(url,[data],[callback])",type:"Ajax"},
	"jQuery.get":{title:"$.get(url,[data],[fn],[type])",type:"Ajax"},
	"jQuery.getJSON":{title:"$.getJSON(url,[data],[fn])",type:"Ajax"},
	"jQuery.getScript":{title:"$.getScript(url,[callback])",type:"Ajax"},
	"jQuery.post":{title:"$.post(url,[data],[fn],[type])",type:"Ajax"},
	ajaxComplete:{title:"ajaxComplete(callback)",type:"Ajax"},
	ajaxError:{title:"ajaxError(callback)",type:"Ajax"},
	ajaxSend:{title:"ajaxSend(callback)",type:"Ajax"},
	ajaxStart:{title:"ajaxStart(callback)",type:"Ajax"},
	ajaxStop:{title:"ajaxStop(callback)",type:"Ajax"},
	ajaxSuccess:{title:"ajaxSuccess(callback)",type:"Ajax"},
	"jQuery.ajaxPrefilter":{title:"$.ajaxPrefilter([type],fn)",type:"Ajax"},
	"jQuery.ajaxSetup":{title:"$.ajaxSetup([options])",type:"Ajax"},
	serialize:{title:"serialize()",type:"Ajax"},
	serializeArray:{title:"serializeArray()",type:"Ajax"},
	
	/*工具 28*/
	"jQuery.support":{title:"$.support",type:"工具"},
	"jQuery.browser":{title:"$.browser",type:"工具"},
	"jQuery.browser.version":{title:"$.browser.version",type:"工具"},
	"jQuery.boxModel":{title:"$.boxModel",type:"工具"},
	"jQuery.each":{title:"$.each(object,[callback])",type:"工具"},
	"jQuery.extend":{title:"$.extend([d],tgt,obj1,[objN])",type:"工具"},
	"jQuery.grep":{title:"$.grep(array,fn,[invert])",type:"工具"},
	"jQuery.sub":{title:"jQuery.sub()",type:"工具"},
	"jQuery.when":{title:"jQuery.when(deferreds)",type:"工具"},
	"jQuery.makeArray":{title:"$.makeArray(obj)",type:"工具"},
	"jQuery.map":{title:"$.map(arr|obj,callback)",type:"工具"},
	"jQuery.inArray":{title:"$.inArray(val,arr,[from])",type:"工具"},
	"jQuery.toArray":{title:"$.toArray()",type:"工具"},
	"jQuery.merge":{title:"$.merge(first,second)",type:"工具"},
	"jQuery.unique":{title:"$.unique(array)",type:"工具"},
	"jQuery.parseJSON":{title:"$.parseJSON(json)",type:"工具"},
	"jQuery.parseXML":{title:"$.parseXML(data)",type:"工具"},
	"jQuery.noop":{title:"$.noop",type:"工具"},
	"jQuery.proxy":{title:"$.proxy(fn,c)",type:"工具"},
	"jQuery.contains":{title:"$.contains(c,c)",type:"工具"},
	"jQuery.type":{title:"$.type(obj)",type:"工具"},
	"jQuery.isArray":{title:"$.isArray(obj)",type:"工具"},
	"jQuery.isFunction":{title:"$.isFunction(obj)",type:"工具"},
	"jQuery.isEmptyObject":{title:"$.isEmptyObject(obj)",type:"工具"},
	"jQuery.isPlainObject":{title:"$.isPlainObject(obj)",type:"工具"},
	"jQuery.isWindow":{title:"$.isWindow(obj)",type:"工具"},
	"jQuery.isNumeric":{title:"$.isNumeric(value)",type:"工具"},
	"jQuery.trim":{title:"$.trim(str)",type:"工具"},
	"jQuery.param":{title:"$.param(obj,[traditional])",type:"工具"},
	"jQuery.error":{title:"$.error(message)",type:"工具"},
	jquery:{title:"$.fn.jquery",type:"工具"},
	/*Event 对象 17*/
	"event.currentTarget":{title:"eve.currentTarget",type:"Event对象"},
	"event.data":{title:"eve.data",type:"Event对象"},
	"event.delegateTarget":{title:"eve.delegateTarget",type:"Event对象"},
	"event.isDefaultPrevented":{title:"eve.isDefaultPrevented()",type:"Event对象"},
	"event.isImmediatePropagationStopped":{title:"eve.isImmediatePropag...()",type:"Event对象"},
	"event.isPropagationStopped":{title:"eve.isPropagationStopped()",type:"Event对象"},
	"event.namespace":{title:"eve.namespace",type:"Event对象"},
	"event.pageX":{title:"eve.pageX",type:"Event对象"},
	"event.pageY":{title:"eve.pageY",type:"Event对象"},
	"event.preventDefault":{title:"eve.preventDefault()",type:"Event对象"},
	"event.relatedTarget":{title:"eve.relatedTarget",type:"Event对象"},
	"event.result":{title:"eve.result",type:"Event对象"},
	"event.stopImmediatePropagation":{title:"eve.stopImmediatePropag...()",type:"Event对象"},
	"event.stopPropagation":{title:"eve.stopPropagation()",type:"Event对象"},
	"event.target":{title:"eve.target",type:"Event对象"},
	"event.timeStamp":{title:"eve.timeStamp",type:"Event对象"},
	"event.type":{title:"eve.type",type:"Event对象"},
	"event.which":{title:"eve.which",type:"Event对象"},
	
	/*Deferred 14*/
	"deferred.done":{title:"def.done(d,[d])",type:"Deferred"},
	"deferred.fail":{title:"def.fail(failCal)",type:"Deferred"},
	"deferred.isRejected":{title:"def.isRejected()",type:"Deferred"},
	"deferred.isResolved":{title:"def.isResolved()",type:"Deferred"},
	"deferred.reject":{title:"def.reject(args)",type:"Deferred"},
	"deferred.rejectWith":{title:"def.rejectWith(c,[a])",type:"Deferred"},
	"deferred.resolve":{title:"def.resolve(args)",type:"Deferred"},
	"deferred.resolveWith":{title:"def.resolveWith(c,a)",type:"Deferred"},
	"deferred.then":{title:"def.then(d,f,[,p])",type:"Deferred"},
	"deferred.promise":{title:"def.promise([ty],[ta])",type:"Deferred"},
	"deferred.pipe":{title:"def.pipe([d],[f],[p])",type:"Deferred"},
	"deferred.always":{title:"def.always(al,[al])",type:"Deferred"},
	"deferred.notify":{title:"def.notify(args)",type:"Deferred"},
	"deferred.notifyWith":{title:"def.notifyWith(c,[a])",type:"Deferred"},
	"deferred.progress":{title:"def.progress(proCal)",type:"Deferred"},
	"deferred.state":{title:"def.state()",type:"Deferred"},
	
	
	/*Callbacks 10*/
	"callbacks.add":{title:"cal.add(callbacks)",type:"Callbacks"},
	"callbacks.disable":{title:"cal.disable()",type:"Callbacks"},
	"callbacks.empty":{title:"cal.empty()",type:"Callbacks"},
	"callbacks.fire":{title:"cal.fire(arguments)",type:"Callbacks"},
	"callbacks.fired":{title:"cal.fired()",type:"Callbacks"},
	"callbacks.fireWith":{title:"cal.fireWith([c][,a])",type:"Callbacks"},
	"callbacks.has":{title:"cal.has(callback)",type:"Callbacks"},
	"callbacks.lock":{title:"cal.lock()",type:"Callbacks"},
	"callbacks.locked":{title:"cal.locked()",type:"Callbacks"},
	"callbacks.remove":{title:"cal.remove(callbacks)",type:"Callbacks"},
	"jQuery.callbacks":{title:"$.callbacks(flags)",type:"Callbacks"},
	/*关于 2*/
	about:{title:"关于jQuery API 文档",type:"关于"},
	bugandUpdate:{title:"提交bug及获取更新",type:"关于"},
	/*其它 2*/
/*	cssFormat:{title:"CSS压缩/格式化",type:"其它"},
	jsFormat:{title:"JS压缩/格式化",type:"其它"},
	regexChe:{title:"正则表达式在线测试",type:"其它"},*/
	regexp:{title:"正则表达式",type:"其它"}
	//html5:{title:"HTML5速查表",type:"其它"}
};
var thisRelName = $("#content.a2 > div").attr("rel");//获取当前名称
//传入原始数据与指定数据名
var hemin = getJson(data,thisRelName);

$("#content").prepend("<div class='return'><div class='retLeft'><a href='cheatsheet.html' class='pc' title=''>首页</a>&nbsp;&gt;&nbsp;"+hemin.thisName.type +"&nbsp;&gt;&nbsp;"+hemin.thisName.title +"</div><div class='retRight'><a href='cheatsheet.html'>返回首页</a></div></div>");

if(thisRelName == "jQuery_selector_context"){
	$("#content").append("<div class='navigation'><div class='alignright'>下一篇：<a href='"+hemin.next.url+".html'>"+hemin.next.title+"</a></div></div>");
}
 else if(thisRelName == "regexp"){
	$("#content").append("<div class='navigation'><div class='alignleft'>上一篇：<a href='"+hemin.prev.url+".html'>"+hemin.prev.title+"</a></div></div>");	
}else{
	$("#content").append("<div class='navigation'><div class='alignleft'>上一篇：<a href='"+hemin.prev.url+".html'>"+hemin.prev.title+"</a></div><div class='alignright'>下一篇：<a href='"+hemin.next.url+".html'>"+hemin.next.title+"</a></div></div>");
}


$("#content").append("<a id='go_home' title='回到首页' href='cheatsheet.html' >首页</a><div id='go_top' title='回到顶部'>顶部</div>");

var this_height = $("body").height();
$('#J_right',window.parent.document).height(this_height+10);
	
$(document).on('click','#go_top',function(){
	$('body,html',window.parent.document).animate({scrollTop:0},500);
});

/*$(document).on('click','a',function(){
		var t_href = $(this).attr("href");
		window.parent.history.pushState(null, null, t_href);
		$(".dtree li a.up",window.parent.document).removeClass("up");
		$(".dtree ol",window.parent.document).hide();
		$(".dtree h2",window.parent.document).removeClass("up");
		
		$('.dtree li a[href="'+t_href+'"]',window.parent.document).parents("ol").show();
		$('.dtree li a[href="'+t_href+'"]',window.parent.document).parents("ol").siblings("h2").addClass("up");
		$('.dtree li a[href="'+t_href+'"]',window.parent.document).addClass("up");
		
	//return false;
});*/

/*$(".navigation,.retRight").on('click','a', function(e) {
	
	if($("div").attr("id") == "right"){
		$("#right").load($(this).attr('href'));
	}
	$('#iframe_over',parent.document).slideDown(800);
	$("#conview",parent.document).delay(800).append('<iframe id=iframe_over src='+$(this).attr('href')+'></iframe>');

	$('#iframe_over:eq(0)',parent.document).remove();
	
	window.history.pushState(null, null, $(this).attr('href'));
	e.preventDefault();	
	window.addEventListener('popstate', function(e) { 
		$('#conview').remove();
	　　　$("#right").load(location.pathname); 
　	});
});*/

/*$(document).on("click","#go_home",function(){
	location.href='index.html';
});*/

/*try{ 
		var state = { 
		title : "hemin jq_manual", 
		url : thisRelName+".html"
		}; 
		history.pushState(state, state.title, state.url);
		//alert(thisRelName+".html");
} 
catch(e){ 
	//alert('您的浏览器不支持');	
} 	*/
//alert(hemin.thisName.index);
//获取数据
//console.log("Prve:" + hemin.prev.index + "," + hemin.prev.title + "," + hemin.prev.cont + "\nNext:" + hemin.next.index + "," + hemin.next.title + "," + hemin.next.cont);

});


/*if(num<= 18){ newData[k]["type"] = "核心";}//18
if(19<=num && num<= (19+51)){ newData[k]["type"] = "选择器";}//51
if(52<=num && num<= (51+9)){ newData[k]["type"] ="属性"}//9
if((51+9+1)<=num && num<= (51+9+1+26)){ newData[k]["type"] ="筛选"}//26*/

//语言切换
//var name = (lang == "cn" && hemin.prev.type == "core") ? "核心" : hemin.prev.type;	
//获取当前名称，判断当前名称对于索引号，+1上一篇 -1下一篇
