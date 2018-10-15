/**
 * Created by kevin.si on 2017/5/22.
 */
/**
 * 固定小数位数
 * @param v number 需格式化的数字
 * @param n number 小数位数，默认为2
 * @param f boolean 是否需要格式化为添加逗号
 * 为兼容ie9，进行toLocaleString的小数位去除
 * */
function fnum (v = 0, n = 2, f) {
  if (!f) {
    v = parseFloat(v) || 0
    let l = v.toString().replace(/^\d*\.?/, '').length
    if (n === 'w') { // 适配重量和数量格式化需要
      // 获取数字的小数长度
      n = l > 3 ? 3 : l
      return Math.abs(v.toFixed(n))
    } else if (n === 'x') {
      n = l > 4 ? 4 : l
      return Math.abs(v.toFixed(n))
    }
    return v.toFixed(n)
  } else {
    v = parseFloat(v) || 0
    let num, cent, str, idx, sign = (v === (v = Math.abs(v))), l
    if (n <= 0) {
      str = parseFloat(v).toFixed(0).toLocaleString()
      idx = str.lastIndexOf('.')
      if (idx === 0) return '0'
      return (sign ? '' : '-') + str.substring(0, idx === -1 ? str.length : idx)
    }
    // 获取数字的小数部分
    cent = v.toString().replace(/^\d*\.?/, '')
    if (n === 'x') { // 适配4位金额显示需要
      l = cent.length
      if (l < 2) cent = (v = v.toFixed(2)).toString().slice(-2)
      else if (l > 4) cent = (v = v.toFixed(4)).toString().slice(-4)
      else cent = v.toString().slice(-l)
    } else {
      cent = (v = v.toFixed(n)).toString().slice(-n)
    }
    // 获取数字的整数部分
    num = v.toString().replace(/\.\d*$/, '')
    str = parseFloat(num).toLocaleString()
    idx = str.lastIndexOf('.')
    if (idx === 0) return '0.' + cent
    return (sign ? '' : '-') + str.substring(0, idx === -1 ? str.length : idx) + '.' + cent
  }
}
/**
 * 数字加符号
 * @param v number 需格式化的数字
 * @param s string 符号标志，默认为空
 * @param n number 小数位数，默认为2
 * @param f boolean 符号位置，前还是后，默认为前
 */
function fsym (v, s, n, f) {
  return f ? fnum(v, n) + s.toString() : s ? s.toString() + ' ' + fnum(v, n, 1) : fnum(v, n)
}
/**
 * 还原格式化后的数字,并去除数字小数点后的无效0
 * @param v string 需还原的数字
 * */
function renew (v) {
  return parseFloat(v.toString().replace(/^\D*|\D*$|,/g, ''))
}
/**
 * 格式换日期
 * @param v 需要格式化的日期
 * @param fmt 格式
 * */
function fdate (v, fmt) {
  v = new Date(v)
  var o = {
    'M+': v.getMonth() + 1, // 月份
    'd+': v.getDate(), // 日
    'h+': v.getHours(), // 小时
    'm+': v.getMinutes(), // 分
    's+': v.getSeconds(), // 秒
    'q+': Math.floor((v.getMonth() + 3) / 3), // 季度
    'S': v.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (v.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k])
        : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
export default {
  fnum,
  fsym,
  renew,
  fdate
}
