// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import methods from './utils/common'
import $ajax from './utils/fetch'
import store from './store'
import headBar from './components/headBar'
import boxInput from './components/boxInput'
import dInput from './components/dInput'
import Process from './components/process'
import Keyboard from './components/keyboard'
import Scroller from './components/Scroller'
import Confirm from './components/Confirm'
import  { ToastPlugin } from 'vux'
import App from './App'
import filters from './utils/filters'
import DomPortal from 'vue-dom-portal'
import {ConfirmPlugin} from 'vux'
import { DatetimePlugin } from 'vux'
import axios from 'axios'
import { JSEncrypt } from 'jsencrypt'

// 确认操作
Vue.use(ConfirmPlugin)
Vue.use(DatetimePlugin)
FastClick.attach(document.body)
Vue.use(headBar)
Vue.use(boxInput)
Vue.use(dInput)
Vue.use(Process)
Vue.use(Keyboard)
Vue.use(Scroller)
Vue.use(DomPortal)
Vue.use(Confirm)
Vue.use(ToastPlugin, {position: 'bottom', type: 'text'})
Vue.prototype.$methods = methods
Vue.prototype.$filters = filters
Vue.prototype.$ajax = $ajax
Vue.config.productionTip = false
Vue.prototype.$http=axios 

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
router.beforeEach((to, from, next) => {
  // if (to.matched.length == 1 && from.matched.length > 1 && to.matched[0].path !== from.matched[0].path) {
  //   $('.router-container').remove()
  // }
  next()
})
/* eslint-disable no-new */
window.HMO_APP = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

// //加密手机号
// Vue.filter('pwPhone',function(value){
//   var strs=value
//   var str=value.slice(3,(value.length-4))
//   str=str.replace(/./g,'*')
//  return strs.slice(0,3)+str+strs.slice(value.length-4,value.length)
// })
//时间显示问题（几天前、几分钟前）
Vue.filter('fomatTime', function (valueTime) {
 
  if(valueTime){
    var newData =  Date.parse(new Date());
    var diffTime = Math.abs(newData-valueTime);
    if (diffTime > 7 * 24 * 3600 * 1000) {
      var date = new Date(valueTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('1' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return  m + '-' + d+' '+h+':'+minute;

    } else if (diffTime < 7 * 24 * 3600 * 1000 && diffTime > 24 * 3600 * 1000) {
      // //注释("一周之内");

      // var time = newData - diffTime;
      var dayNum = Math.floor(diffTime / (24 * 60 * 60 * 1000));
      return dayNum + "天前";

    } else if (diffTime < 24 * 3600 * 1000 && diffTime > 3600 * 1000) {
      // //注释("一天之内");
      // var time = newData - diffTime;
      var dayNum = Math.floor(diffTime / (60 * 60 * 1000));
      return dayNum + "小时前";

    } else if (diffTime < 3600 * 1000 && diffTime > 0) {
      // //注释("一小时之内");
      // var time = newData - diffTime;
      var dayNum = Math.floor(diffTime / (60 * 1000));
      return dayNum + "分钟前";

    }
  }
});

