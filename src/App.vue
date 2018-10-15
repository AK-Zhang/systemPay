<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    this.polyfill();
  },
  methods: {
    polyfill () {
      document.body.addEventListener('touchmove', function (e) {
        e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
      }, {passive: false}); //passive 参数不能省略，用来兼容ios和android
      $(document.body).on('keydown', 'input[data-num]', this.$methods.inputNumber)
      /**
       * toFixed精度丢失问题
       * */
      let me = this
      // eslint-disable-next-line
      Number.prototype.toFixed = function (s) {
        var changenum = (parseInt(me.$methods.numMulti(this, Math.pow(10, s)) + (this > 0 ? 0.5 : -0.5)) / Math.pow(10, s)).toString() || '0'
          var  index = changenum.indexOf('.')
        if (index < 0 && s > 0) {
          changenum = changenum + '.'
          for (let i = 0; i < s; i++) {
            changenum = changenum + '0'
          }
        } else {
          index = changenum.length - index
          for (let i = 0; i < (s - index) + 1; i++) {
            changenum = changenum + '0'
          }
        }
        return changenum
      }
      /**
       * 防止移动输入框导致的页面高度变形问题
       * */
//      var h = $(document.body).height();
//      window.addEventListener('resize', function () {
//        $('.focus-hide').removeClass('focus-hide')
//        if ($('.third-box').offset().top < h - 100) {
//          $('.third-box').addClass('focus-hide')
//        }
//      })
      /**
       * 日期格式化
       * @param fmt 格式化样式
       */
      // eslint-disable-next-line
      Date.prototype.Format = function (fmt) { // author: meizz
        var o = {
          'M+': this.getMonth() + 1, // 月份
          'd+': this.getDate(), // 日
          'h+': this.getHours(), // 小时
          'm+': this.getMinutes(), // 分
          's+': this.getSeconds(), // 秒
          'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
          'S': this.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (let k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k])
              : (('00' + o[k]).substr(('' + o[k]).length)))
          }
        }
        return fmt
      }
    }
  }
}
</script>

<style lang="less">
@import './assets/css/reset.css';
@import './assets/css/common.less';
@import './assets/css/vux-cover.less';

</style>
