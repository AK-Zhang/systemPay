/**
 * Created by kevin.si on 2017/11/14.
 */
/*
 * 存放全局公用方法
 * */
import ajax from './fetch'
var _INCRE = 0, cbMap = {}
export default {
  /**
   * 解析查询条件
   * @param name 条件参数名
   * @returns 参数值
   */
  getQueryString: name => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'), r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  },
  getObjectClass: obj => {
    return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1]
  },
  /**
   * 控制键盘输入事件，只能输入数字和小数点和删除键
   * @param e keydown事件
   * */
  inputNumber: e => {
    let k = e.which ? e.which : e.keyCode, s = e.shiftKey, tar = e.target
    if (k === 8 || k === 13 || k === 27 || k === 110 || (k === 190 || k >= 48 && k <= 57) && !s || k >= 96 && k <= 105) {
      return true
    } else {
      if (k === 38) {
        tar.value = parseFloat(tar.value) ? parseFloat(tar.value) + 1 : 1
      } else if (k === 40) {
        tar.value = parseFloat(tar.value) - 1 > 0 ? parseFloat(tar.value) - 1 : 0
      }
      return false
    }
  },
  /**
   * 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
   *
   * @param num1加数1 | num2加数2
   */
  numAdd: (num1, num2) => {
    var baseNum, baseNum1, baseNum2
    try {
      baseNum1 = num1.toString().split('.')[1].length
    } catch (e) {
      baseNum1 = 0
    }
    try {
      baseNum2 = num2.toString().split('.')[1].length
    } catch (e) {
      baseNum2 = 0
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
    return parseFloat((this.a.numMulti(num1, baseNum) + this.a.numMulti(num2, baseNum)) / baseNum)
  },
  /**
   * 加法运算，避免数据相减小数点后产生多位数和计算精度损失。
   *
   * @param num1被减数 | num2减数
   */
  numSub: (num1, num2) => {
    var baseNum, baseNum1, baseNum2, precision // 精度
    try {
      baseNum1 = num1.toString().split('.')[1].length
    } catch (e) {
      baseNum1 = 0
    }
    try {
      baseNum2 = num2.toString().split('.')[1].length
    } catch (e) {
      baseNum2 = 0
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2
    return parseFloat(((this.a.numMulti(num1, baseNum) - this.a.numMulti(num2, baseNum)) / baseNum).toFixed(precision))
  },
  /**
   * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
   *
   * @param num1被乘数 | num2乘数
   */
  numMulti: (num1, num2) => {
    if (!num1 || !num2) return 0
    var baseNum = 0
    try {
      baseNum += num1.toString().split('.')[1].length
    } catch (e) {
    }
    try {
      baseNum += num2.toString().split('.')[1].length
    } catch (e) {
    }
    return parseFloat(Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', '')) / Math.pow(10, baseNum))
  },
  /**
   * 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
   *
   * @param num1被除数 | num2除数
   */
  numDiv: (num1, num2) => {
    if (!num1 || !num2) return 0
    var baseNum1 = 0, baseNum2 = 0, baseNum3, baseNum4
    try {
      baseNum1 = num1.toString().split('.')[1].length
    } catch (e) {
      baseNum1 = 0
    }
    try {
      baseNum2 = num2.toString().split('.')[1].length
    } catch (e) {
      baseNum2 = 0
    }
    baseNum3 = Number(num1.toString().replace('.', ''))
    baseNum4 = Number(num2.toString().replace('.', ''))
    return parseFloat((baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1))
  },
  /**
   * 防抖动
   * 如果wait时间内一直触发，则不会执行，只会在不触发时停顿wait时间后触发一次，immediate第一次是否触发，若是第一次触发，则停顿后不会触发
   * */
  debounce: (func, wait, immediate) => {
    var timeout, args, context, timestamp, result, later
    later = function () {
      var last = new Date().getTime() - timestamp
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }
    return function () {
      context = this
      args = arguments
      timestamp = new Date().getTime() // 随着触发不断更新，导致定时器中的函数不会触发，而是生成下一个定时器
      var callNow = immediate && !timeout
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }
      return result
    }
  },
  /**
   * 图片上传处理函数
   * @param e 事件
   * @param prefix 图片前缀
   * @param cb 回调函数
   * */
  uploadImg: (e, prefix, cb) => {
    var file = e.target.files[0]
    if (!file) return
    if (!/\/(?:jpeg|png|gif)/i.test(file.type)) {
      this.$vux.toast.text('请上传正确的图片类型')
      return
    }
    if (file.size >= 51834880) {
      this.$vux.toast.text('图片不能大于5M')
      return
    }
    let fd = new FormData()
    // fd.append('Content-Type', 'multipart/form-data')
    fd.append('prefix', prefix)
    fd.append('file', file)
    ajax.post('/media/upload', fd, res => {
      cb && cb(res.url)
    })
  },
  /**
   * 保存公司信息
   * */
  saveCompanyInfo (e) {

  }
}
