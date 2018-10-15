
/*  AJAX 异步调用请求
 *  @404nan
 */



;(function(window){

var AJAX = function( opt ){
    this._app = new ajax( opt );
    return this._app;
}

var ajax = function(opt){
	var _this = this ;
	opt = opt||{};
    this.opt = {
        url:opt.url || '',//请求地址
        type:( opt.type || 'get' ).toUpperCase(),
        data:opt.data || {},
        dataType:(opt.dataType || "json").toUpperCase(),
        contentType: opt.contentType,
        isFormData: opt.isFormData,
        success:opt.success || function(){},
        error: opt.error || function(){}
    };

    this.request();

};
ajax.prototype = {

    //执行xhr请求
    request:function(){

        var _this = this,
           	  xhr = this.create() ,
            _data = this.opt.data,
          isFormData = this.opt.isFormData
        ;

        if (!xhr) {
            /*alert('CORS not supported');*/
            return ;
        }

        //连接 和 发送 - 第二步

        if(isFormData) {
          this.params = _data;
        } else {
          this.params = this.formatParams(_data).urlParamStr();
        }

        if (this.opt.type == "GET") {
            xhr.open("GET", this.formatParams({
            	url:this.opt.url,
            	param:this.params
            }).setUrlParam(), true);
            xhr.withCredentials = true;
            xhr.send();
        }else if(this.opt.type == "POST") {
          xhr.open("POST", this.opt.url, true);
          // xhr.setRequestHeader("Accept","application/json");
          xhr.withCredentials = true;
          //application/json
          //application/x-www-form-urlencoded
          if(!isFormData) {
            xhr.setRequestHeader("Content-Type", this.opt.contentType||"application/x-www-form-urlencoded");
            xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
          }

          xhr.send(this.params);
        }

         xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status ,
                    result = xhr.responseText
                ;

                if (status >= 200 && status < 300) {

                  if( _this.opt.dataType =="TEXT" ) {
                        //普通文本
                        result = xhr.responseText ;

                  }else if( _this.opt.dataType=="XML" ) {
                        //接收xml文档
                        result = xhr.responseXML ;

                  }else if( _this.opt.dataType == "JSON" ) {
                        if( xhr.responseText ){
                          result = eval("("+xhr.responseText+")") ;
                        }
                  }
                    _this.opt.success && _this.opt.success(result, status);
                } else {
                    _this.opt.error && _this.opt.error(result,status);
                }
            }
        }
    },

    //创建xmlreq
    create:function(){
        var xhr = new XMLHttpRequest();

        if ("withCredentials" in xhr) {

            //xhr.open(method, url, true);
            xhr = new XMLHttpRequest();

        } else if ( typeof (xhr) != "undefined") {
            //ie
            xhr = new XDomainRequest();

        } else {
            // 否则，浏览器不支持CORS
            xhr = null;

        }
        return xhr;
    },

     // 格式化参数
    formatParams:function(opt){
        var _this = this;
    	 var obj  = {
		        //转化为url字符串

			urlParamStr:function( o , isAnd ){
				var o = o || opt ,
					isAnd = isAnd || opt.isAnd,
					 _str = ''
				;

                // if( _this.opt.type == "GET" ){
                //     o["version"] = new Date().getTime()+parseInt(Math.random()*100);
                // }


				for( var key in o ){
					var _key = encodeURIComponent(key),
						_vlaue = encodeURIComponent(o[key])
					;
					if( isAnd ){
						_str += '&'+_key+'='+_vlaue+'&';
						isAnd = false;
					}else{
						_str += _key+'='+_vlaue+'&';
					}
			    }

			    _str = _str.split('') ;
			   	_str.pop();
			    _str = _str.join('');

			    return _str;
			},
			//设置url参数
			setUrlParam:function(url , param){
				var url =  url || opt.url ,
					param = param || opt.param ,
					_param = param ,
					_url = '' ,
					_hasParam = url.split('?')[1]
				;

				if( typeof param !== 'string' ){
					_param = o.urlParamStr( param );
				}

				if( url.indexOf('?') == -1 ){
					_url = url+'?'+ _param;
				}else{

					if( _hasParam == undefined || _hasParam == null || _hasParam == ''){
						_url = url+_param;
					}else{
						if( typeof param !== 'string' ){
							_param = this.urlParamStr( param , true);
						}
						_url = url+_param;
					}
				}
				return _url;
			}
		};
        return obj;
    }
};

if ( typeof define === "function" && define.amd ) {
    define( "AJAX", [], function() {
        return AJAX;
    });
} else if ( typeof module != 'undefined' && module.exports ) {
    module.exports = AJAX;
}

window.AJAX = AJAX;

})(window);
