function selectText(t){if(document.selection){var e=document.body.createTextRange();e.moveToElementText(document.getElementById(t)),e.select()}else if(window.getSelection){var e=document.createRange();e.selectNode(document.getElementById(t)),window.getSelection().addRange(e)}}function showdiv(t){document.getElementById(t).style.display="inline"}function confirmPost(){var t=confirm("Are you sure you want to delete?");return t?!0:!1}function submitform(){document.forms.myform.submit()}function checkTab(t){document.all&&9==event.keyCode&&(t.selection=document.selection.createRange(),setTimeout("processTab('"+t.id+"')",0))}function processTab(t){document.all[t].selection.text=String.fromCharCode(9),document.all[t].focus()}function setSelectionRange(t,e,i){if(t.setSelectionRange)t.focus(),t.setSelectionRange(e,i);else if(t.createTextRange){var o=t.createTextRange();o.collapse(!0),o.moveEnd("character",i),o.moveStart("character",e),o.select()}}function replaceSelection(t,e){if(t.setSelectionRange){var i=t.selectionStart,o=t.selectionEnd;t.value=t.value.substring(0,i)+e+t.value.substring(o),i!=o?setSelectionRange(t,i,i+e.length):setSelectionRange(t,i+e.length,i+e.length)}else if(document.selection){var n=document.selection.createRange();if(n.parentElement()==t){var s=""==n.text;n.text=e,s||(n.moveStart("character",-e.length),n.select())}}}function catchTab(t,e){if(navigator.userAgent.match("Gecko")?c=e.which:c=e.keyCode,9==c){var i=t.scrollTop;return replaceSelection(t,String.fromCharCode(9)),stopEvent(e),t.scrollTop=i,!1}}function stopEvent(t){t.preventDefault&&t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.stopped=!0}function fliprows(t,e){var i,o=document.getElementsByTagName("tr");for(i=0;i<o.length;i++){var n=o.item(i);n.className==t&&(n.className=e)}}function showold(){fliprows("new","hidenew"),fliprows("hideold","old"),document.getElementById("oldlink").style.background="#ddd",document.getElementById("newlink").style.background="",document.getElementById("bothlink").style.background=""}function shownew(){fliprows("hidenew","new"),fliprows("old","hideold"),document.getElementById("oldlink").style.background="",document.getElementById("newlink").style.background="#ddd",document.getElementById("bothlink").style.background=""}function showboth(){fliprows("hidenew","new"),fliprows("hideold","old"),document.getElementById("oldlink").style.background="",document.getElementById("newlink").style.background="",document.getElementById("bothlink").style.background="#ddd"}function highlight(t){var e=js.textElement.caretPosition(t);if(e.start||e.end){var i=js.text.getLines(js.textElement.value(t)),o=0,n=0,s="",r=!1,a=0;for(var l in i){if(n=o+i[l].length,e.start>=o&&e.start<=n&&(r=!0),r){var d="@h@"==i[l].substr(0,3);a||(a=d?1:2),1==a&&d?i[l]=i[l].substr(3,i[l].length-3):2!=a||d||(s+="@h@")}s=s+i[l]+"\n",e.end>=o&&e.end<=n&&(r=!1),o=n+1}t.value=s.substring(0,s.length-1);var c=e.start+(1==a?-3:3);js.textElement.setCaretPosition(t,{start:c,end:c})}}function getElementsByClassName(t,e){return t.getElementsByClassName?t.getElementsByClassName(e):function i(t,e){null==e&&(e=document);var o,n,i=[],s=e.getElementsByTagName("*"),r=s.length,a=new RegExp("(^|\\s)"+t+"(\\s|$)");for(o=0,n=0;r>o;o++)a.test(s[o].className)&&(i[n]=s[o],n++);return i}(e,t)}function twitpopup(t){window.open("http://twitter.com/share?url=https://pastebin.com"+t+"&via=pastebin","tweet","height=340,width=550,resizable=1")}function facebookpopup(t){window.open("http://facebook.com/sharer.php?u=https://pastebin.com"+t,"facebook","height=340,width=660,resizable=1")}var js={text:{lines:function(t){return this.getLines(t).length},getLines:function(t){var e=t.split("\n");return e}},textElement:{value:function(t){return t.value.replace(/\r/g,"")},caretPosition:function(t){var e={};if(document.selection){var i=document.selection.createRange(),o=document.body.createTextRange();o.moveToElementText(t);var n;for(n=0;o.compareEndPoints("StartToStart",i)<0;n++)o.moveStart("character",1);e.start=n,e.end=n+i.text.replace(/\r/g,"").length}else(t.selectionStart||0==t.selectionStart)&&(e.start=t.selectionStart,e.end=t.selectionEnd);return e},setCaretPosition:function(t,e){if(t.focus(),t.setSelectionRange)t.setSelectionRange(e.start,e.end);else if(t.createTextRange){var i=t.createTextRange();i.moveStart("character",e.start),i.moveEnd("character",e.end),i.select()}}}};!function(t,e){if("function"==typeof define&&define.amd)define(["exports","module"],e);else if("undefined"!=typeof exports&&"undefined"!=typeof module)e(exports,module);else{var i={exports:{}};e(i.exports,i),t.autosize=i.exports}}(this,function(t,e){"use strict";function i(t){function e(){var e=window.getComputedStyle(t,null);h=e.overflowY,"vertical"===e.resize?t.style.resize="none":"both"===e.resize&&(t.style.resize="horizontal"),u="content-box"===e.boxSizing?-(parseFloat(e.paddingTop)+parseFloat(e.paddingBottom)):parseFloat(e.borderTopWidth)+parseFloat(e.borderBottomWidth),isNaN(u)&&(u=0),n()}function i(e){var i=t.style.width;t.style.width="0px",t.offsetWidth,t.style.width=i,h=e,c&&(t.style.overflowY=e),o()}function o(){var e=window.pageYOffset,i=document.body.scrollTop,o=t.style.height;t.style.height="auto";var n=t.scrollHeight+u;return 0===t.scrollHeight?void(t.style.height=o):(t.style.height=n+"px",p=t.clientWidth,document.documentElement.scrollTop=e,void(document.body.scrollTop=i))}function n(){var e=t.style.height;o();var n=window.getComputedStyle(t,null);if(n.height!==t.style.height?"visible"!==h&&i("visible"):"hidden"!==h&&i("hidden"),e!==t.style.height){var s=document.createEvent("Event");s.initEvent("autosize:resized",!0,!1),t.dispatchEvent(s)}}var r=void 0===arguments[1]?{}:arguments[1],a=r.setOverflowX,l=void 0===a?!0:a,d=r.setOverflowY,c=void 0===d?!0:d;if(t&&t.nodeName&&"TEXTAREA"===t.nodeName&&!s.has(t)){var u=null,h=null,p=t.clientWidth,f=function(){t.clientWidth!==p&&n()},g=function(e){window.removeEventListener("resize",f),t.removeEventListener("input",n),t.removeEventListener("keyup",n),t.removeEventListener("autosize:destroy",g),s["delete"](t),Object.keys(e).forEach(function(i){t.style[i]=e[i]})}.bind(t,{height:t.style.height,resize:t.style.resize,overflowY:t.style.overflowY,overflowX:t.style.overflowX,wordWrap:t.style.wordWrap});t.addEventListener("autosize:destroy",g),"onpropertychange"in t&&"oninput"in t&&t.addEventListener("keyup",n),window.addEventListener("resize",f),t.addEventListener("input",n),t.addEventListener("autosize:update",n),s.add(t),l&&(t.style.overflowX="hidden",t.style.wordWrap="break-word"),e()}}function o(t){if(t&&t.nodeName&&"TEXTAREA"===t.nodeName){var e=document.createEvent("Event");e.initEvent("autosize:destroy",!0,!1),t.dispatchEvent(e)}}function n(t){if(t&&t.nodeName&&"TEXTAREA"===t.nodeName){var e=document.createEvent("Event");e.initEvent("autosize:update",!0,!1),t.dispatchEvent(e)}}var s="function"==typeof Set?new Set:function(){var t=[];return{has:function(e){return Boolean(t.indexOf(e)>-1)},add:function(e){t.push(e)},"delete":function(e){t.splice(t.indexOf(e),1)}}}(),r=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?(r=function(t){return t},r.destroy=function(t){return t},r.update=function(t){return t}):(r=function(t,e){return t&&Array.prototype.forEach.call(t.length?t:[t],function(t){return i(t,e)}),t},r.destroy=function(t){return t&&Array.prototype.forEach.call(t.length?t:[t],o),t},r.update=function(t){return t&&Array.prototype.forEach.call(t.length?t:[t],n),t}),e.exports=r}),jQuery(document).ready(function(t){var e=300,i=1200,o=700,n=t(".cd-top");t(window).scroll(function(){t(this).scrollTop()>e?n.addClass("cd-is-visible"):n.removeClass("cd-is-visible cd-fade-out"),t(this).scrollTop()>i&&n.addClass("cd-fade-out")}),n.on("click",function(e){e.preventDefault(),t("body,html").animate({scrollTop:0},o)})}),function(t){var e=function(e){this._options={checkOnLoad:!1,resetOnEnd:!1,loopCheckTime:50,loopMaxNumber:5,baitClass:"pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links",baitStyle:"width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;",debug:!1},this._var={version:"3.2.0",bait:null,checking:!1,loop:null,loopNumber:0,event:{detected:[],notDetected:[]}},void 0!==e&&this.setOption(e);var i=this,o=function(){setTimeout(function(){i._options.checkOnLoad===!0&&(i._options.debug===!0&&i._log("onload->eventCallback","A check loading is launched"),null===i._var.bait&&i._creatBait(),setTimeout(function(){i.check()},1))},1)};void 0!==t.addEventListener?t.addEventListener("load",o,!1):t.attachEvent("onload",o)};e.prototype._options=null,e.prototype._var=null,e.prototype._bait=null,e.prototype._log=function(t,e){console.log("[FuckAdBlock]["+t+"] "+e)},e.prototype.setOption=function(t,e){if(void 0!==e){var i=t;t={},t[i]=e}for(var o in t)this._options[o]=t[o],this._options.debug===!0&&this._log("setOption",'The option "'+o+'" he was assigned to "'+t[o]+'"');return this},e.prototype._creatBait=function(){var e=document.createElement("div");e.setAttribute("class",this._options.baitClass),e.setAttribute("style",this._options.baitStyle),this._var.bait=t.document.body.appendChild(e),this._var.bait.offsetParent,this._var.bait.offsetHeight,this._var.bait.offsetLeft,this._var.bait.offsetTop,this._var.bait.offsetWidth,this._var.bait.clientHeight,this._var.bait.clientWidth,this._options.debug===!0&&this._log("_creatBait","Bait has been created")},e.prototype._destroyBait=function(){t.document.body.removeChild(this._var.bait),this._var.bait=null,this._options.debug===!0&&this._log("_destroyBait","Bait has been removed")},e.prototype.check=function(t){if(void 0===t&&(t=!0),this._options.debug===!0&&this._log("check","An audit was requested "+(t===!0?"with a":"without")+" loop"),this._var.checking===!0)return this._options.debug===!0&&this._log("check","A check was canceled because there is already an ongoing"),!1;this._var.checking=!0,null===this._var.bait&&this._creatBait();var e=this;return this._var.loopNumber=0,t===!0&&(this._var.loop=setInterval(function(){e._checkBait(t)},this._options.loopCheckTime)),setTimeout(function(){e._checkBait(t)},1),this._options.debug===!0&&this._log("check","A check is in progress ..."),!0},e.prototype._checkBait=function(e){var i=!1;if(null===this._var.bait&&this._creatBait(),(null!==t.document.body.getAttribute("abp")||null===this._var.bait.offsetParent||0==this._var.bait.offsetHeight||0==this._var.bait.offsetLeft||0==this._var.bait.offsetTop||0==this._var.bait.offsetWidth||0==this._var.bait.clientHeight||0==this._var.bait.clientWidth)&&(i=!0),void 0!==t.getComputedStyle){var o=t.getComputedStyle(this._var.bait,null);("none"==o.getPropertyValue("display")||"hidden"==o.getPropertyValue("visibility"))&&(i=!0)}this._options.debug===!0&&this._log("_checkBait","A check ("+(this._var.loopNumber+1)+"/"+this._options.loopMaxNumber+" ~"+(1+this._var.loopNumber*this._options.loopCheckTime)+"ms) was conducted and detection is "+(i===!0?"positive":"negative")),e===!0&&(this._var.loopNumber++,this._var.loopNumber>=this._options.loopMaxNumber&&this._stopLoop()),i===!0?(this._stopLoop(),this._destroyBait(),this.emitEvent(!0),e===!0&&(this._var.checking=!1)):(null===this._var.loop||e===!1)&&(this._destroyBait(),this.emitEvent(!1),e===!0&&(this._var.checking=!1))},e.prototype._stopLoop=function(t){clearInterval(this._var.loop),this._var.loop=null,this._var.loopNumber=0,this._options.debug===!0&&this._log("_stopLoop","A loop has been stopped")},e.prototype.emitEvent=function(t){this._options.debug===!0&&this._log("emitEvent","An event with a "+(t===!0?"positive":"negative")+" detection was called");var e=this._var.event[t===!0?"detected":"notDetected"];for(var i in e)this._options.debug===!0&&this._log("emitEvent","Call function "+(parseInt(i)+1)+"/"+e.length),e.hasOwnProperty(i)&&e[i]();return this._options.resetOnEnd===!0&&this.clearEvent(),this},e.prototype.clearEvent=function(){this._var.event.detected=[],this._var.event.notDetected=[],this._options.debug===!0&&this._log("clearEvent","The event list has been cleared")},e.prototype.on=function(t,e){return this._var.event[t===!0?"detected":"notDetected"].push(e),this._options.debug===!0&&this._log("on",'A type of event "'+(t===!0?"detected":"notDetected")+'" was added'),this},e.prototype.onDetected=function(t){return this.on(!0,t)},e.prototype.onNotDetected=function(t){return this.on(!1,t)},t.FuckAdBlock=e,void 0===t.fuckAdBlock&&(t.fuckAdBlock=new e({checkOnLoad:!0,resetOnEnd:!0}))}(window),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){function e(e,o){var n,s,r,a=e.nodeName.toLowerCase();return"area"===a?(n=e.parentNode,s=n.name,e.href&&s&&"map"===n.nodeName.toLowerCase()?(r=t("img[usemap='#"+s+"']")[0],!!r&&i(r)):!1):(/^(input|select|textarea|button|object)$/.test(a)?!e.disabled:"a"===a?e.href||o:o)&&i(e)}function i(e){return t.expr.filters.visible(e)&&!t(e).parents().addBack().filter(function(){return"hidden"===t.css(this,"visibility")}).length}t.ui=t.ui||{},t.extend(t.ui,{version:"1.11.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),t.fn.extend({scrollParent:function(e){var i=this.css("position"),o="absolute"===i,n=e?/(auto|scroll|hidden)/:/(auto|scroll)/,s=this.parents().filter(function(){var e=t(this);return o&&"static"===e.css("position")?!1:n.test(e.css("overflow")+e.css("overflow-y")+e.css("overflow-x"))}).eq(0);return"fixed"!==i&&s.length?s:t(this[0].ownerDocument||document)},uniqueId:function(){var t=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++t)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&t(this).removeAttr("id")})}}),t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(i){return!!t.data(i,e)}}):function(e,i,o){return!!t.data(e,o[3])},focusable:function(i){return e(i,!isNaN(t.attr(i,"tabindex")))},tabbable:function(i){var o=t.attr(i,"tabindex"),n=isNaN(o);return(n||o>=0)&&e(i,!n)}}),t("<a>").outerWidth(1).jquery||t.each(["Width","Height"],function(e,i){function o(e,i,o,s){return t.each(n,function(){i-=parseFloat(t.css(e,"padding"+this))||0,o&&(i-=parseFloat(t.css(e,"border"+this+"Width"))||0),s&&(i-=parseFloat(t.css(e,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],s=i.toLowerCase(),r={innerWidth:t.fn.innerWidth,innerHeight:t.fn.innerHeight,outerWidth:t.fn.outerWidth,outerHeight:t.fn.outerHeight};t.fn["inner"+i]=function(e){return void 0===e?r["inner"+i].call(this):this.each(function(){t(this).css(s,o(this,e)+"px")})},t.fn["outer"+i]=function(e,n){return"number"!=typeof e?r["outer"+i].call(this,e):this.each(function(){t(this).css(s,o(this,e,!0,n)+"px")})}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(t.fn.removeData=function(e){return function(i){return arguments.length?e.call(this,t.camelCase(i)):e.call(this)}}(t.fn.removeData)),t.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),t.fn.extend({focus:function(e){return function(i,o){return"number"==typeof i?this.each(function(){var e=this;setTimeout(function(){t(e).focus(),o&&o.call(e)},i)}):e.apply(this,arguments)}}(t.fn.focus),disableSelection:function(){var t="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(t+".ui-disableSelection",function(t){t.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(e){if(void 0!==e)return this.css("zIndex",e);if(this.length)for(var i,o,n=t(this[0]);n.length&&n[0]!==document;){if(i=n.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(o=parseInt(n.css("zIndex"),10),!isNaN(o)&&0!==o))return o;n=n.parent()}return 0}}),t.ui.plugin={add:function(e,i,o){var n,s=t.ui[e].prototype;for(n in o)s.plugins[n]=s.plugins[n]||[],s.plugins[n].push([i,o[n]])},call:function(t,e,i,o){var n,s=t.plugins[e];if(s&&(o||t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType))for(n=0;n<s.length;n++)t.options[s[n][0]]&&s[n][1].apply(t.element,i)}};var o=0,n=Array.prototype.slice;t.cleanData=function(e){return function(i){var o,n,s;for(s=0;null!=(n=i[s]);s++)try{o=t._data(n,"events"),o&&o.remove&&t(n).triggerHandler("remove")}catch(r){}e(i)}}(t.cleanData),t.widget=function(e,i,o){var n,s,r,a,l={},d=e.split(".")[0];return e=e.split(".")[1],n=d+"-"+e,o||(o=i,i=t.Widget),t.expr[":"][n.toLowerCase()]=function(e){return!!t.data(e,n)},t[d]=t[d]||{},s=t[d][e],r=t[d][e]=function(t,e){return this._createWidget?void(arguments.length&&this._createWidget(t,e)):new r(t,e)},t.extend(r,s,{version:o.version,_proto:t.extend({},o),_childConstructors:[]}),a=new i,a.options=t.widget.extend({},a.options),t.each(o,function(e,o){return t.isFunction(o)?void(l[e]=function(){var t=function(){return i.prototype[e].apply(this,arguments)},n=function(t){return i.prototype[e].apply(this,t)};return function(){var e,i=this._super,s=this._superApply;return this._super=t,this._superApply=n,e=o.apply(this,arguments),this._super=i,this._superApply=s,e}}()):void(l[e]=o)}),r.prototype=t.widget.extend(a,{widgetEventPrefix:s?a.widgetEventPrefix||e:e},l,{constructor:r,namespace:d,widgetName:e,widgetFullName:n}),s?(t.each(s._childConstructors,function(e,i){var o=i.prototype;t.widget(o.namespace+"."+o.widgetName,r,i._proto)}),delete s._childConstructors):i._childConstructors.push(r),t.widget.bridge(e,r),r},t.widget.extend=function(e){for(var i,o,s=n.call(arguments,1),r=0,a=s.length;a>r;r++)for(i in s[r])o=s[r][i],s[r].hasOwnProperty(i)&&void 0!==o&&(t.isPlainObject(o)?e[i]=t.isPlainObject(e[i])?t.widget.extend({},e[i],o):t.widget.extend({},o):e[i]=o);return e},t.widget.bridge=function(e,i){var o=i.prototype.widgetFullName||e;t.fn[e]=function(s){var r="string"==typeof s,a=n.call(arguments,1),l=this;return r?this.each(function(){var i,n=t.data(this,o);return"instance"===s?(l=n,!1):n?t.isFunction(n[s])&&"_"!==s.charAt(0)?(i=n[s].apply(n,a),i!==n&&void 0!==i?(l=i&&i.jquery?l.pushStack(i.get()):i,!1):void 0):t.error("no such method '"+s+"' for "+e+" widget instance"):t.error("cannot call methods on "+e+" prior to initialization; attempted to call method '"+s+"'")}):(a.length&&(s=t.widget.extend.apply(null,[s].concat(a))),this.each(function(){var e=t.data(this,o);e?(e.option(s||{}),e._init&&e._init()):t.data(this,o,new i(s,this))})),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(e,i){i=t(i||this.defaultElement||this)[0],this.element=t(i),this.uuid=o++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),i!==this&&(t.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===i&&this.destroy()}}),this.document=t(i.style?i.ownerDocument:i.document||i),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var o,n,s,r=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(r={},o=e.split("."),e=o.shift(),o.length){for(n=r[e]=t.widget.extend({},this.options[e]),s=0;s<o.length-1;s++)n[o[s]]=n[o[s]]||{},n=n[o[s]];if(e=o.pop(),1===arguments.length)return void 0===n[e]?null:n[e];n[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];r[e]=i}return this._setOptions(r),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!e),e&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(e,i,o){var n,s=this;"boolean"!=typeof e&&(o=i,i=e,e=!1),o?(i=n=t(i),this.bindings=this.bindings.add(i)):(o=i,i=this.element,n=this.widget()),t.each(o,function(o,r){function a(){return e||s.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof r?s[r]:r).apply(s,arguments):void 0}"string"!=typeof r&&(a.guid=r.guid=r.guid||a.guid||t.guid++);var l=o.match(/^([\w:-]*)\s*(.*)$/),d=l[1]+s.eventNamespace,c=l[2];c?n.delegate(c,d,a):i.bind(d,a)})},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(i).undelegate(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){function i(){return("string"==typeof t?o[t]:t).apply(o,arguments)}var o=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,i,o){var n,s,r=this.options[e];if(o=o||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],s=i.originalEvent)for(n in s)n in i||(i[n]=s[n]);return this.element.trigger(i,o),!(t.isFunction(r)&&r.apply(this.element[0],[i].concat(o))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(o,n,s){"string"==typeof n&&(n={effect:n});var r,a=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),r=!t.isEmptyObject(n),n.complete=s,n.delay&&o.delay(n.delay),r&&t.effects&&t.effects.effect[a]?o[e](n):a!==e&&o[a]?o[a](n.duration,n.easing,s):o.queue(function(i){t(this)[e](),s&&s.call(o[0]),i()})}});t.widget;!function(){function e(t,e,i){return[parseFloat(t[0])*(p.test(t[0])?e/100:1),parseFloat(t[1])*(p.test(t[1])?i/100:1)]}function i(e,i){return parseInt(t.css(e,i),10)||0}function o(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var n,s,r=Math.max,a=Math.abs,l=Math.round,d=/left|center|right/,c=/top|center|bottom/,u=/[\+\-]\d+(\.[\d]+)?%?/,h=/^\w+/,p=/%$/,f=t.fn.position;t.position={scrollbarWidth:function(){if(void 0!==n)return n;var e,i,o=t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),s=o.children()[0];return t("body").append(o),e=s.offsetWidth,o.css("overflow","scroll"),i=s.offsetWidth,e===i&&(i=o[0].clientWidth),o.remove(),n=e-i},getScrollInfo:function(e){var i=e.isWindow||e.isDocument?"":e.element.css("overflow-x"),o=e.isWindow||e.isDocument?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,s="scroll"===o||"auto"===o&&e.height<e.element[0].scrollHeight;return{width:s?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),o=t.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:o,isDocument:n,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:o||n?i.width():i.outerWidth(),height:o||n?i.height():i.outerHeight()}}},t.fn.position=function(n){if(!n||!n.of)return f.apply(this,arguments);n=t.extend({},n);var p,g,v,m,b,y,w=t(n.of),_=t.position.getWithinInfo(n.within),E=t.position.getScrollInfo(_),x=(n.collision||"flip").split(" "),C={};return y=o(w),w[0].preventDefault&&(n.at="left top"),g=y.width,v=y.height,m=y.offset,b=t.extend({},m),t.each(["my","at"],function(){var t,e,i=(n[this]||"").split(" ");1===i.length&&(i=d.test(i[0])?i.concat(["center"]):c.test(i[0])?["center"].concat(i):["center","center"]),i[0]=d.test(i[0])?i[0]:"center",i[1]=c.test(i[1])?i[1]:"center",t=u.exec(i[0]),e=u.exec(i[1]),C[this]=[t?t[0]:0,e?e[0]:0],n[this]=[h.exec(i[0])[0],h.exec(i[1])[0]]}),1===x.length&&(x[1]=x[0]),"right"===n.at[0]?b.left+=g:"center"===n.at[0]&&(b.left+=g/2),"bottom"===n.at[1]?b.top+=v:"center"===n.at[1]&&(b.top+=v/2),p=e(C.at,g,v),b.left+=p[0],b.top+=p[1],this.each(function(){var o,d,c=t(this),u=c.outerWidth(),h=c.outerHeight(),f=i(this,"marginLeft"),y=i(this,"marginTop"),T=u+f+i(this,"marginRight")+E.width,k=h+y+i(this,"marginBottom")+E.height,W=t.extend({},b),N=e(C.my,c.outerWidth(),c.outerHeight());"right"===n.my[0]?W.left-=u:"center"===n.my[0]&&(W.left-=u/2),"bottom"===n.my[1]?W.top-=h:"center"===n.my[1]&&(W.top-=h/2),W.left+=N[0],W.top+=N[1],s||(W.left=l(W.left),W.top=l(W.top)),o={marginLeft:f,marginTop:y},t.each(["left","top"],function(e,i){t.ui.position[x[e]]&&t.ui.position[x[e]][i](W,{targetWidth:g,targetHeight:v,elemWidth:u,elemHeight:h,collisionPosition:o,collisionWidth:T,collisionHeight:k,offset:[p[0]+N[0],p[1]+N[1]],my:n.my,at:n.at,within:_,elem:c})}),n.using&&(d=function(t){var e=m.left-W.left,i=e+g-u,o=m.top-W.top,s=o+v-h,l={target:{element:w,left:m.left,top:m.top,width:g,height:v},element:{element:c,left:W.left,top:W.top,width:u,height:h},horizontal:0>i?"left":e>0?"right":"center",vertical:0>s?"top":o>0?"bottom":"middle"};u>g&&a(e+i)<g&&(l.horizontal="center"),h>v&&a(o+s)<v&&(l.vertical="middle"),r(a(e),a(i))>r(a(o),a(s))?l.important="horizontal":l.important="vertical",n.using.call(this,t,l)}),c.offset(t.extend(W,{using:d}))})},t.ui.position={fit:{left:function(t,e){var i,o=e.within,n=o.isWindow?o.scrollLeft:o.offset.left,s=o.width,a=t.left-e.collisionPosition.marginLeft,l=n-a,d=a+e.collisionWidth-s-n;e.collisionWidth>s?l>0&&0>=d?(i=t.left+l+e.collisionWidth-s-n,t.left+=l-i):d>0&&0>=l?t.left=n:l>d?t.left=n+s-e.collisionWidth:t.left=n:l>0?t.left+=l:d>0?t.left-=d:t.left=r(t.left-a,t.left)},top:function(t,e){var i,o=e.within,n=o.isWindow?o.scrollTop:o.offset.top,s=e.within.height,a=t.top-e.collisionPosition.marginTop,l=n-a,d=a+e.collisionHeight-s-n;e.collisionHeight>s?l>0&&0>=d?(i=t.top+l+e.collisionHeight-s-n,t.top+=l-i):d>0&&0>=l?t.top=n:l>d?t.top=n+s-e.collisionHeight:t.top=n:l>0?t.top+=l:d>0?t.top-=d:t.top=r(t.top-a,t.top)}},flip:{left:function(t,e){var i,o,n=e.within,s=n.offset.left+n.scrollLeft,r=n.width,l=n.isWindow?n.scrollLeft:n.offset.left,d=t.left-e.collisionPosition.marginLeft,c=d-l,u=d+e.collisionWidth-r-l,h="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+h+p+f+e.collisionWidth-r-s,(0>i||i<a(c))&&(t.left+=h+p+f)):u>0&&(o=t.left-e.collisionPosition.marginLeft+h+p+f-l,(o>0||a(o)<u)&&(t.left+=h+p+f))},top:function(t,e){var i,o,n=e.within,s=n.offset.top+n.scrollTop,r=n.height,l=n.isWindow?n.scrollTop:n.offset.top,d=t.top-e.collisionPosition.marginTop,c=d-l,u=d+e.collisionHeight-r-l,h="top"===e.my[1],p=h?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,g=-2*e.offset[1];0>c?(o=t.top+p+f+g+e.collisionHeight-r-s,(0>o||o<a(c))&&(t.top+=p+f+g)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+g-l,(i>0||a(i)<u)&&(t.top+=p+f+g))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,o,n,r,a=document.getElementsByTagName("body")[0],l=document.createElement("div");e=document.createElement(a?"div":"body"),o={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},a&&t.extend(o,{position:"absolute",left:"-1000px",top:"-1000px"});for(r in o)e.style[r]=o[r];e.appendChild(l),i=a||document.documentElement,i.insertBefore(e,i.firstChild),l.style.cssText="position: absolute; left: 10.7432222px;",n=t(l).offset().left,s=n>10&&11>n,e.innerHTML="",i.removeChild(e)}()}();t.ui.position,t.widget("ui.tooltip",{version:"1.11.4",options:{content:function(){var e=t(this).attr("title")||"";return t("<a>").text(e).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_addDescribedBy:function(e,i){var o=(e.attr("aria-describedby")||"").split(/\s+/);o.push(i),e.data("ui-tooltip-id",i).attr("aria-describedby",t.trim(o.join(" ")))},_removeDescribedBy:function(e){var i=e.data("ui-tooltip-id"),o=(e.attr("aria-describedby")||"").split(/\s+/),n=t.inArray(i,o);-1!==n&&o.splice(n,1),e.removeData("ui-tooltip-id"),o=t.trim(o.join(" ")),o?e.attr("aria-describedby",o):e.removeAttr("aria-describedby")},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable(),this.liveRegion=t("<div>").attr({role:"log","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)},_setOption:function(e,i){var o=this;return"disabled"===e?(this[i?"_disable":"_enable"](),void(this.options[e]=i)):(this._super(e,i),void("content"===e&&t.each(this.tooltips,function(t,e){o._updateContent(e.element)})))},_disable:function(){var e=this;t.each(this.tooltips,function(i,o){var n=t.Event("blur");n.target=n.currentTarget=o.element[0],e.close(n,!0)}),this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.is("[title]")&&e.data("ui-tooltip-title",e.attr("title")).removeAttr("title")})},_enable:function(){this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.data("ui-tooltip-title")&&e.attr("title",e.data("ui-tooltip-title"))})},open:function(e){var i=this,o=t(e?e.target:this.element).closest(this.options.items);o.length&&!o.data("ui-tooltip-id")&&(o.attr("title")&&o.data("ui-tooltip-title",o.attr("title")),o.data("ui-tooltip-open",!0),e&&"mouseover"===e.type&&o.parents().each(function(){var e,o=t(this);o.data("ui-tooltip-open")&&(e=t.Event("blur"),e.target=e.currentTarget=this,i.close(e,!0)),o.attr("title")&&(o.uniqueId(),i.parents[this.id]={element:this,title:o.attr("title")},o.attr("title",""))}),this._registerCloseHandlers(e,o),this._updateContent(o,e))},_updateContent:function(t,e){var i,o=this.options.content,n=this,s=e?e.type:null;return"string"==typeof o?this._open(e,t,o):(i=o.call(t[0],function(i){n._delay(function(){t.data("ui-tooltip-open")&&(e&&(e.type=s),this._open(e,t,i))})}),void(i&&this._open(e,t,i)))},_open:function(e,i,o){function n(t){d.of=t,r.is(":hidden")||r.position(d)}var s,r,a,l,d=t.extend({},this.options.position);if(o){if(s=this._find(i))return void s.tooltip.find(".ui-tooltip-content").html(o);i.is("[title]")&&(e&&"mouseover"===e.type?i.attr("title",""):i.removeAttr("title")),s=this._tooltip(i),r=s.tooltip,this._addDescribedBy(i,r.attr("id")),
r.find(".ui-tooltip-content").html(o),this.liveRegion.children().hide(),o.clone?(l=o.clone(),l.removeAttr("id").find("[id]").removeAttr("id")):l=o,t("<div>").html(l).appendTo(this.liveRegion),this.options.track&&e&&/^mouse/.test(e.type)?(this._on(this.document,{mousemove:n}),n(e)):r.position(t.extend({of:i},this.options.position)),r.hide(),this._show(r,this.options.show),this.options.show&&this.options.show.delay&&(a=this.delayedShow=setInterval(function(){r.is(":visible")&&(n(d.of),clearInterval(a))},t.fx.interval)),this._trigger("open",e,{tooltip:r})}},_registerCloseHandlers:function(e,i){var o={keyup:function(e){if(e.keyCode===t.ui.keyCode.ESCAPE){var o=t.Event(e);o.currentTarget=i[0],this.close(o,!0)}}};i[0]!==this.element[0]&&(o.remove=function(){this._removeTooltip(this._find(i).tooltip)}),e&&"mouseover"!==e.type||(o.mouseleave="close"),e&&"focusin"!==e.type||(o.focusout="close"),this._on(!0,i,o)},close:function(e){var i,o=this,n=t(e?e.currentTarget:this.element),s=this._find(n);return s?(i=s.tooltip,void(s.closing||(clearInterval(this.delayedShow),n.data("ui-tooltip-title")&&!n.attr("title")&&n.attr("title",n.data("ui-tooltip-title")),this._removeDescribedBy(n),s.hiding=!0,i.stop(!0),this._hide(i,this.options.hide,function(){o._removeTooltip(t(this))}),n.removeData("ui-tooltip-open"),this._off(n,"mouseleave focusout keyup"),n[0]!==this.element[0]&&this._off(n,"remove"),this._off(this.document,"mousemove"),e&&"mouseleave"===e.type&&t.each(this.parents,function(e,i){t(i.element).attr("title",i.title),delete o.parents[e]}),s.closing=!0,this._trigger("close",e,{tooltip:i}),s.hiding||(s.closing=!1)))):void n.removeData("ui-tooltip-open")},_tooltip:function(e){var i=t("<div>").attr("role","tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||"")),o=i.uniqueId().attr("id");return t("<div>").addClass("ui-tooltip-content").appendTo(i),i.appendTo(this.document[0].body),this.tooltips[o]={element:e,tooltip:i}},_find:function(t){var e=t.data("ui-tooltip-id");return e?this.tooltips[e]:null},_removeTooltip:function(t){t.remove(),delete this.tooltips[t.attr("id")]},_destroy:function(){var e=this;t.each(this.tooltips,function(i,o){var n=t.Event("blur"),s=o.element;n.target=n.currentTarget=s[0],e.close(n,!0),t("#"+i).remove(),s.data("ui-tooltip-title")&&(s.attr("title")||s.attr("title",s.data("ui-tooltip-title")),s.removeData("ui-tooltip-title"))}),this.liveRegion.remove()}})}),jQuery&&function(t){function e(e,n){var s=e?t(this):n,r=t(s.attr("data-jq-dropdown")),a=s.hasClass("jq-dropdown-open");if(e){if(t(e.target).hasClass("jq-dropdown-ignore"))return;e.preventDefault(),e.stopPropagation()}else if(s!==n.target&&t(n.target).hasClass("jq-dropdown-ignore"))return;i(),a||s.hasClass("jq-dropdown-disabled")||(s.addClass("jq-dropdown-open"),r.data("jq-dropdown-trigger",s).show(),o(),r.trigger("show",{jqDropdown:r,trigger:s}))}function i(e){var i=e?t(e.target).parents().addBack():null;if(i&&i.is(".jq-dropdown")){if(!i.is(".jq-dropdown-menu"))return;if(!i.is("A"))return}t(document).find(".jq-dropdown:visible").each(function(){var e=t(this);e.hide().removeData("jq-dropdown-trigger").trigger("hide",{jqDropdown:e})}),t(document).find(".jq-dropdown-open").removeClass("jq-dropdown-open")}function o(){{var e=t(".jq-dropdown:visible").eq(0),i=e.data("jq-dropdown-trigger"),o=i?parseInt(i.attr("data-horizontal-offset")||0,10):null;i?parseInt(i.attr("data-vertical-offset")||0,10):null}0!==e.length&&i&&e.css({left:e.hasClass("jq-dropdown-anchor-right")?i.offset().left-(e.outerWidth()-i.outerWidth())+5:i.offset().left+o})}t.extend(t.fn,{jqDropdown:function(o,n){switch(o){case"show":return e(null,t(this)),t(this);case"hide":return i(),t(this);case"attach":return t(this).attr("data-jq-dropdown",n);case"detach":return i(),t(this).removeAttr("data-jq-dropdown");case"disable":return t(this).addClass("jq-dropdown-disabled");case"enable":return i(),t(this).removeClass("jq-dropdown-disabled")}}}),t(document).on("mouseenter.jq-dropdown","[data-jq-dropdown]",e),t(document).on("click.jq-dropdown","[data-jq-dropdown]",e),t(document).on("click.jq-dropdown",i),t(window).on("resize",o)}(jQuery);
function createCookie(a,b,c){if(c){var d=new Date;d.setTime(d.getTime()+24*c*60*60*1e3);var e="; expires="+d.toGMTString()}else var e="";document.cookie=a+"="+b+e+"; path=/"}