/**
 * Created by kevin.si on 2017/11/7.
 */
import $methods from './common'
var Ajax = function () {
  var _param = function (param) {
    if (param &&  $methods.getObjectClass(param) == 'Object') {
      var params = {};
      for (var k in param) {
        if (param[k] === null) continue;
        params[k] =param[k];
      }
      return params
    } else {
      return param
    }
  };
  var _execute = function (method, url, params, success, error) {
    var obj = {
      type: method,
      cache: false,
      url: url,
      data: params,
      success: function(data, status){
        if (typeof data != 'object') {
          data = JSON.parse(data)
        }
        if (data.success) {
          success && success(data.hasOwnProperty('data') ? data.data : data, status, data);
        } else {
          if (!!error) error(data.message, status, data);
          if (!params.noErrAlert) {
            window.HMO_APP.$vux.toast.show({
              text: data.message
            })
          }
        }
      },
      error: function (data) {
        if (data.statusText == 'abort') {
          if (!!error) error(0);
          return;
        }
        var result = ''
        if(!navigator.onLine){
          result = '请检查您的网络！';
        } else {
          result = '后端服务异常，请刷新后重试！';
        }
        if (!!error) error(result);
        if (!params.noErrAlert) {
          window.HMO_APP.$vux.toast.show({
            text: result
          })
        }
      }
    }
    if (method == 'post' || method == 'put') {
      if (params.toString() == '[object FormData]') {
        obj.contentType = false
        obj.processData = false
      } else if (!params.isFormType) {
        obj.contentType = 'application/json; charset=utf-8'
        obj.data = JSON.stringify(params)
      }
    }
    return $.ajax(obj);
  };
  var _action = function (method, api, bizParam, callback1, callback2) {
    var url = ajaxPath + api, type = $methods.getObjectClass(bizParam);
    if (type == 'Function') {
      return _execute(method, url, _param(null), bizParam, callback1);
    } else {
      return _execute(method, url, _param(bizParam, method), callback1, callback2);
    }
  };
  return {
    action: function (method, api, bizParam, callback1, callback2) {
      return _action(method, api, bizParam, callback1, callback2)
    }
  }
}
export default {
  get: function (api, bizParam, callback1, callback2) {
    if (!ajax) var ajax = new Ajax();
    return ajax.action('get', api, bizParam, callback1, callback2);
  },
  post: function (api, bizParam, callback1, callback2) {
    if (!ajax) var ajax = new Ajax();
    return ajax.action('post', api, bizParam, callback1, callback2);
  },
  put: function (api, bizParam, callback1, callback2) {
    if (!ajax) var ajax = new Ajax();
    return ajax.action('put', api, bizParam, callback1, callback2);
  }
}
