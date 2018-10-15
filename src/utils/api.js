/**
 * Created by kevin.si on 2018/5/31.
 */
import $ajax from './fetch'
import store from '../store/index'

/**
 * 保存公司信息
 * @param cb 保存成功回调函数
 * @param e 对应的按钮对象 若传递，则禁用启用按钮
 * */
export function saveCompanyInfo (cb, e) {
  if (e && $(e.target).hasClass('disabled')) return
  e && $(e.target).addClass('disabled')
  $ajax.post('/company/', store.getters.idInfo, data => {
    cb && cb (data)
    e && $(e.target).removeClass('disabled')
  }, () => {
    e && $(e.target).removeClass('disabled')
  })
}

/**
 * 公司实名认证
 * @param cb 保存成功回调函数
 * @param e 对应的按钮对象 若传递，则禁用启用按钮
 * */
export function identifyCompany (cb, e) {
  if (e && $(e.target).hasClass('disabled')) return
  e && $(e.target).addClass('disabled')
  $ajax.post('/company/realnameapply', store.getters.idInfo, data => {
    cb && cb (data)
    e && $(e.target).removeClass('disabled')
  }, () => {
    e && $(e.target).removeClass('disabled')
  })
}

