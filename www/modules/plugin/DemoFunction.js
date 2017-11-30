
/**
 * 其他全局方法的绑定
 * by QC
 * 2016/11/15
 * 
 */
define(function(require, exports, module){
	require('jquery');
		
		/*
		 鼠标滚动时关闭日期选择器
		 * */
		$(document).on('mousewheel DOMMouseScroll','*',function(){
			$('#JTC_BG_DIV').hide();
		})
//		 document.body.addEventListener("DOMMouseScroll",function(e){
//	     	 $('#JTC_BG_DIV').hide();
//	    },false);
		
		/*
		 重写dom对象的点击事件
		 * */
		if(!HTMLElement.prototype.click){
			console.log('原点击事件不兼容，已重写')
			HTMLElement.prototype.click = function(){
	            try{
	                var evt = document.createEvent('Event');  
	                evt.initEvent("click",true,true);
	                this.dispatchEvent(evt);
	             }catch(e){alert(e)};
			}
		}
		
		/*
		  模拟title重写页面的title属性hover事件
		  
		 * */
		$(document).on('mouseenter','*',function(event){
			var _ev = event || window.event;
			var _t = _ev.target || _ev.srcElement;
			var $t = $(_t);
			if($t.attr('title') !==undefined && $t.attr('title') !==''){
				/*对未翻译词条的特殊识别*/
				var ttl = $t.attr('title');
				if(ttl.substr(0,1) != '{' && ttl.substr(ttl.length-1,ttl.length) != '}'){
					$t.attr('data-hover-title',$t.attr('title')).removeAttr('title');
				}else{
					$t.removeAttr('title');
				}
			}
			removeTileDom()
			if($t.attr('data-hover-title')!== undefined &&  $t.attr('data-hover-title') !==''){
				$t.attr('data-hover-sign',getTitleDom($t,event));
			}
		});
		$(document).on('mousemove','*',function(event){
			var e = event || window.event;
			var _t = e.target || e.srcElement;
			var $t = $(_t);
			var x = e.clientX+document.body.scrollLeft + document.documentElement.scrollLeft;
			var y = e.clientY+document.body.scrollTop + document.documentElement.scrollTop;
			var bodyw = document.body.clientWidth;
			$('[title-showsign="'+$t.attr('data-hover-sign')+'"]').css({
				left:x+'px',
				top:(y+20)+'px'
//				maxWidth : (bodyw-x-10)+'px'
			})
			
		});
		$(document).on('mouseleave','*',function(event){
			var e = event || window.event;
			var _t = e.target || e.srcElement;
			var $t = $(_t);
			var $hn = $('[title-showsign="'+$t.attr('data-hover-sign')+'"]').css({
				opacity:'0'
			});
			setTimeout(function(){
				$hn.remove();
			},200)
		});
		function removeTileDom(){
			var $hn = $('.u-titlespan').css({
				opacity:'0'
			});
			setTimeout(function(){
				$hn.remove();
			},200)
		}
		
		function getTitleDom($dom,event){
			var $div = $('<div class="u-titlespan"></div>');
			$div.text($dom.attr('data-hover-title'));
			var e = event || window.event;
			var x = e.clientX+document.body.scrollLeft + document.documentElement.scrollLeft;
			var y = e.clientY+document.body.scrollTop + document.documentElement.scrollTop;
			var bodyw = document.body.clientWidth;
			$div.css({
				left:x+'px',
				top:(y+20)+'px',
				maxWidth : (bodyw-x-$dom.width()-10)+'px',
				opacity:'0',
			});
			var $righttop = $('<div class="u-titlespan-rt"></div>');
			var $leftbottom = $('<div class="u-titlespan-lb"></div>');
			$div.append($righttop,$leftbottom);
			var nd = new Date().getTime();
			$div.attr('title-showsign',nd);
			$('body').append($div);
			$div.css({
				opacity:'1',
				boxShadow:'0 0 10px rgba(0,0,0,0.6)'
			});
			return nd;
		}
		
		
		/**
		 * 判断是否弹出Liscening
		 */
		$.ajax({
				type:"get",
				url:"/cgi-bin/luci/admin/allConfig_fastConfigPop",
				success:function(result){
					
					result = JSON.parse(result);
					var Eval       = require('/modules/core/Eval');
					var variables  = [
						"productLicense"
					];
					var res     = Eval.doEval(result, variables);
					var goon = true;
					if(res["data"].productLicense ==1){
						require('Tips').showProductLicensing();
						goon = false;
					}
					
					if(goon){
						/* 判断是否需要用户修改密码 */
						$.ajax({
							type:"get",
							url:"/cgi-bin/luci/admin/adminConfig",
							success:function(result){
								result = JSON.parse(result);
								eval(result);
								var data = {
									prompt       :prompt,
									username     :'admin',
									usernameold  :'admin',
									role         :'adm',
									passwd1      :'',
									Action       :'edit'
									
								}
								if(data.prompt == '1'){
									require('Tips').showModifyPassword(data);
								}
								
							}
						});
					}
				}
			});
		
		

		
		
		
		/*
		// ajax方法重写
		var originalAjax = $.ajax;
		$.ajax = function(){
			// 记录网址栏与路径栏的标识
			var beforeSiderSign = window.location.href;
			var beforeNavSign = getClickNavSign();
			var originalSuccess = arguments[0].success;
			arguments[0].success = function(){
				var successSiderSign = window.location.href;
				var successNavSign = getClickNavSign();
				// 请求成功时 判断与开始时记录的值是否相同
				if(beforeSiderSign == successSiderSign && beforeNavSign == successNavSign){
					originalSuccess.apply(this,arguments);
				}
				
			//	else if(beforeSiderSign == successSiderSign && beforeNavSign != successNavSign){
			//		console.log('标签栏不同');
			//	}else if(beforeSiderSign != successSiderSign && beforeNavSign == successNavSign){
			//		console.log('导航栏不同');
			//	}else{
			//		console.log('参数均不相同！取消ajax');
			//	}
				
			}
			originalAjax.apply(this,arguments);
		}
		
		// 获取当前path路径栏
		function getClickNavSign(){
			var $beforeNav = $('#path>ol.breadcrumb>li.active'); 
			var beforeNavSign = '0';
			if($beforeNav.length){
				beforeNavSign = $('#path>ol.breadcrumb>li.active').attr('data-local') || 'nohas'; 
			}
			return beforeNavSign;
		}

		*/
		
		// 重填按钮的绑定
		$(document).on('click','#reset,#reset_demo_button',function(event){
			var _ev = event || window.event;
			var _t = _ev.target || _ev.srcElement;
			var $t = $(_t);
			//找到准确的父类
			var $inputparent = $t.parents('.tab-pane.active');
			var $modalparent = $t.parents('.modal-content');
			var $trueparent = '';
			if($inputparent.hasClass('tab-pane')&&$inputparent.hasClass('active')){
				$trueparent = $inputparent;
			}else if($modalparent.hasClass('modal-content')){
				$trueparent = $modalparent;
			}
			if($trueparent !== ''){
				$t.attr('id','reset_demo_button');
				var $_form = $trueparent.wrap('<form></form>').parent();
				$_form[0].reset();
				$trueparent.unwrap();
				//初始化交互
//				$trueparent.find('[type="radio"]:checked,[type="checkbox"]:checked,select').each(function(){
				$trueparent.find('[type="radio"]:checked,select').each(function(){
					var $ti = $(this);
					if($ti.is(':visible')){
						var thisTagName = $ti[0].tagName;
						if(thisTagName == 'INPUT'){
							$ti.trigger('click');
						}else if(thisTagName == 'SELECT'){
							$ti.trigger('change');
						}
					}
				});
				//取消所有报错气泡
				$trueparent.find('.input-error').remove();
			}
		});
		
		// 所有button点击后立刻失焦
		$(document).on('click','button',function(event){
			$(this).blur();
		});
	
		//日期绑定
		laydate = function(){
			var e =  window.event || arguments.callee.caller.arguments[0],
			    $t = $(e.target || e.srcElement);
			/*绑定内容变化监听事件*/
			$t.valueChanged(function(){
				$t.trigger('blur');				
			});
			
			JTC.setday();
		}
	
		//自定义JQ方法设置
		$.fn.extend({
			/**
			 * input内容监听事件
			 */
			valueChanged : function(func){
				var $t = $(this);
				if($t.attr('onListening-valueChange')){
					return $t;
				}
				$t.attr('onListening-valueChange','true');
				var oldvalue = $t.val();
				var clit =  setInterval(function(){
						if(!$t.is(':visible')){clearInterval(clit);}
						if(oldvalue !== $t.val()){func();oldvalue = $t.val();}
						
					},100);
				
//				return $t;
			},
			/**
			 * 输入框检查格式
			 * by QC
			 */
			checkfuncs : function(){
				var $t = $(this);
				
				if(!($t[0].tagName == 'INPUT' && $(this).attr('type') == 'text') && !($t[0].tagName == 'TEXTAREA')){
					return $(this);
				}
				var checkFuncs = Array.prototype.slice.call(arguments);
				// 检测函数数组
				var funcArr = [];
				if(checkFuncs != undefined ) {
					checkFuncs.forEach(function(func) {
						var checkFunc = function() {};
						if(typeof func == 'string') {
							var CheckFunctioins = require('P_core/CheckFunctions');
							checkFunc = CheckFunctioins.getFunc(func);
						} else {
							checkFunc = func;
						}
						funcArr.push(checkFunc);
					});
				}
				if(funcArr.length > 0) {
					initCheck_a($t, funcArr);
				}
				return $t;
			},
			/**
			 * 输入框检查格式（可传参）
			 * by QC
			 */
			checkdemofunc : function(){
				var $t = $(this);
				if(!($t[0].tagName == 'INPUT' && $(this).attr('type') == 'text') && !($t[0].tagName == 'TEXTAREA')){
					return $(this);
				}
				var checkDemoFuncArr = Array.prototype.slice.call(arguments);
				
				// 检测函数数组
				var demoDataObj = [];
				if(checkDemoFuncArr != undefined && checkDemoFuncArr.length > 1) {
		
					var CheckFunctioins = require('P_core/CheckFunctions');
					var funcname = checkDemoFuncArr[0];
					checkDemoFuncArr.shift();
					demoFunc = CheckFunctioins.getFunc(funcname);
					demoDataObj = checkDemoFuncArr;
				}
				if(demoDataObj.length > 0) {
					initDemoCheck_a($t, demoFunc, demoDataObj);
				}
			}
		});



function initCheck_a($input, funcArr) {
		$input.focus(function(event) {
			removeErrorStr_a($input);
		});
		$input.blur(function() {
			var $t = $(this);
			removeErrorStr_a($t);
			var text = ($(this).val().length > 0) ? $(this).val() : $(this).text();
			var isCorrect = true;
			var errorStr = '';
			funcArr.forEach(function(func) {
				var result = func(text);
				isCorrect = result["isCorrect"];
				if(!isCorrect) {
					isCorrect = false;
					errorStr += result["errorStr"];
				}
			});
			if(isCorrect) {
				// showSuccess($input);
			} else {
				if(errorStr == '') {
					errorStr = '输入错误';
				}
				showErrorStr_a($t, errorStr);
			}
		});
	}
function initDemoCheck_a($input, func, demoDatas) {
		$input.focus(function(event) {
			removeErrorStr_a($input);
		});
		$input.blur(function(){
			
			var $t = $(this);
			removeErrorStr_a($t);
			var text = $(this).val();
			var isCorrect = true;
			var errorStr = '';
			
			var newDatas = demoDatas.concat();
			var result = func(text, newDatas);
			isCorrect = result["isCorrect"];
			if(!isCorrect) {
				isCorrect = false;
				errorStr += result["errorStr"];
			}

			if(isCorrect) {
				// showSuccess($input);
			} else {
				if(errorStr == '') {
					errorStr = '输入错误';
				}
				showErrorStr_a($t, errorStr);
			}
		});
	}
function removeErrorStr_a($dom) {
		var nowdom = $dom.nextAll('.input-error');
		nowdom.addClass('input-error-fadeout');
		nowdom.css({
			left: (parseInt(nowdom.css('left')) + 15) + "px"
		});
		setTimeout(function() {
			nowdom.remove();
		}, 201);
	}
function showErrorStr_a($dom, errorStr) {
		removeErrorStr_a($dom);
		var html = '<span class="input-error"><span class="glyphicon glyphicon-exclamation-sign"></span>&nbsp' + errorStr + '</span>';
		var $h = $(html);
		var left = Number($dom.position().left),
			top = Number($dom.position().top),
			width = Number($dom.width()),
			height = Number($dom.height());
		$h.css({
			transition: "left 0.3s ease-out,opacity 0.2s",
			left: (left + width*1.05) + "px",
			top: (top - height*0.8) + "px"
		});
		$dom.after($h);
		setTimeout(function() {
			$h.css({
				left: (left + width) + "px"
			});
		}, 1);

	}

});
