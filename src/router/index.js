import Vue from 'vue'
import Router from 'vue-router'

// const _import = require('./_import_' + process.env.NODE_ENV), // TODO 因点击侧边栏第一次会有卡顿，暂不采用按需加载，后续加以优化可使用
const _import = require('./_import_development'),
  login = _import('user/login'),
  myIndex = _import('my/index'),
  addressList = _import('my/address-list/index'),
  addressListMsg = _import('my/address-list/msg'),
  addressListDetail = _import('my/address-list/detail'),
  addressListDetails = _import('my/address-list/details'),
  addressListImport = _import('my/address-list/import'),
  addressListImportBatch = _import('my/address-list/import-batch'),
  addressListImportDetail = _import('my/address-list/import-detail'),
  addressListGroup = _import('my/address-list/group'),
  addressListGroupDetail = _import('my/address-list/group-detail'),
  mySetting = _import('my/setting/index'),
  mySettingMore = _import('my/setting/more'),
  mySettingAddress = _import('my/setting/address'),
  mySettingAddressEdit = _import('my/setting/address-edit'),
  mySettingJob = _import('my/setting/job'),
  mySettingEducation = _import('my/setting/education'),
  mySettingThird = _import('my/setting/third'),
  mySettingAbout = _import('my/setting/about'),
  mySettingSuggest = _import('my/setting/suggest'),
  mySettingAboutUs = _import('my/setting/about-us'),
  mySettingSafe = _import('my/setting/safe'),
  myInfo = _import('my/info/index'),
  myInfoNick = _import('my/info/nick'),
  myInfoIntro = _import('my/info/intro'),
  myQrcode = _import('my/qrcode'),
  gesture = _import('user/gesture'),
  chooseBankCard = _import('account/chooseCard'),
  timeSelect = require('../components/common/time.vue'),
  accountIndex = _import('account/index'),
  accountNoApply = _import('account/no-apply'),
  accountTransfer = _import('account/transfer'),
  accountTransfer1 = _import('account/transfer1'),
  accountSuccess = _import('account/success'),
  accountChest = _import('account/chest'),
  accountChestTrans = _import('account/chest-trans'),
  accoutCard = _import('account/card'),
  accoutCardDetail = _import('account/card-detail'),
  accoutCardAdd = _import('account/card-add'),
  personIdentify1 = _import('account/person'),
  realName1 = _import('account/realName'),
  accountCollection = _import('account/collection'),
  accountPayment= _import('account/payment'),
  accountPayment1= _import('account/payment1'),
  accountPayment2= _import('account/payment2'),
  accountRecord= _import('account/record'),
  accountRecharge = _import('account/recharge'),
  accountWithdraw = _import('account/withdraw'),
  accountNoCard = _import('account/no-card'),
  accountDetail = _import('account/detail'),
  cashier = _import('cashier/index'),
  cashierSuccess = _import('cashier/success'),
  cashierFail = _import('cashier/fail'),
  weixinLogin = _import('third/weixin'),
  userIdentify = _import('identify/index'),
  realNameIdentify= _import('identify/real_name'),
  personIdentify = _import('identify/person'),
  company01Identify = _import('identify/company0-1'),
  company02Identify = _import('identify/company0-2'),
  company1Identify = _import('identify/company1'),
  company2Identify = _import('identify/company2'),
  company3Identify = _import('identify/company3'),
  company4Identify = _import('identify/company4'),
  company5Identify = _import('identify/company5'),
  waitIdentify = _import('identify/wait'),
  failIdentify = _import('identify/fail'),
  successIdentify = _import('identify/success'),
  passwordIdentify = _import('identify/password'),
  realName = _import('identify/realName'),
  rechargePerson = _import('identify/rechargePerson'),
  indentifychildRouter = [
    {
      path: 'identify/real_name',
      name: '通用验证码',
      component: realNameIdentify
    },
    {
      path: 'identify/realName',
      name: '实名验证码',
      component: realName
    },
    {
      path: '/identify/recharge-person',
      name: '充值短信验证',
      component: rechargePerson
    },
    {
      path: 'identify/index',
      // name: '个人/企业认证',
      name: '个人认证',
      component: userIdentify
      // c端只是个人认证
    },
    {
      path: 'identify/person',
      name: '个人认证',
      component: personIdentify
    },
    {
      path: '/account/real_name',
      name: '暂无银行卡',
      component: realName1,
    },

    {
      path: 'identify/company0-1',
      name: '企业认证',
      component: company01Identify
    },
    {
      path: 'identify/company0-2',
      name: '企业认证',
      component: company02Identify
    },
    {
      path: 'identify/company1',
      name: '企业认证',
      component: company1Identify
    },
    {
      path: 'identify/company2',
      name: '企业认证',
      component: company2Identify
    },
    {
      path: 'identify/company3',
      name: '企业认证',
      component: company3Identify
    },
    {
      path: 'identify/company4',
      name: '企业认证',
      component: company4Identify
    },
    {
      path: 'identify/company5',
      name: '企业认证',
      component: company5Identify
    },
    {
      path: 'identify/wait',
      name: '企业认证',
      component: waitIdentify
    },
    {
      path: 'identify/fail',
      name: '企业认证',
      component: failIdentify
    },
    {
      path: 'identify/success',
      name: '企业认证',
      component: successIdentify
    },
    {
      path: 'identify/password',
      name: '认证',
      component: passwordIdentify
    }
  ], time = {
    path: 'time',
    name: '选择时间',
    component: timeSelect
  }, indentifyRouter = [], chooseCard = {
    path: 'choose-card',
    name: '选择银行卡',
    component: chooseBankCard
  }, payRecord = {
    path: 'record',
    name: '记录',
    component: accountRecord,
    children: [time]
  }
  for (let v of indentifychildRouter) {
    let c = Object.assign({}, v)
    c.path = '/' + c.path
    indentifyRouter.push(c)
  }
  const RouterMap = [
    {
      path: '/',
      name: '根页面',
      redirect: '/account/no-apply'
    },
    {
      path: '/login',
      name: '登录',
      component: login
    },
    {
      path: '/my/index',
      name: '我的',
      component: myIndex
    },
    {
      path: '/my/address-list/msg',
      name: '消息提示',
      component: addressListMsg
    },
    {
      path: '/my/address-list',
      name: '通讯录',
      component: addressList,
      children: [
        {
          path: 'detail',
          component: addressListDetail,
          children: [
            {
              path: 'details',
              component: addressListDetails,
            }
          ]
        },
        {
          path: 'group',
          component: addressListGroup,
          children: [
            {
              path: 'import',
              component: addressListImport,
              children: [
                {
                  path: 'batch',
                  component: addressListImportBatch,
                  children: [
                    {
                      path: 'detail',
                      component: addressListImportDetail
                    }
                  ]
                },
                {
                  path: 'detail',
                  component: addressListImportDetail
                }
              ]
            },
            {
              path: 'group',
              component: addressListGroup,
              children: [
                {
                  path: 'detail',
                  component: addressListGroupDetail,
                  children: [
                    {
                      path: 'member',
                      component: addressList
                    }
                  ]
                },
                {
                  path: 'import',
                  component: addressListImport,
                  children: [
                    {
                      path: 'batch',
                      component: addressListImportBatch,
                      children: [
                        {
                          path: 'detail',
                          component: addressListImportDetail
                        }
                      ]
                    },
                    {
                      path: 'detail',
                      component: addressListImportDetail
                    }
                  ]
                },
                {
                  path: 'group',
                  component: addressListGroup,
                  children: [
                    {
                      path: 'detail',
                      component: addressListGroupDetail,
                      children: [
                        {
                          path: 'member',
                          component: addressList
                        }
                      ]
                    },
                    {
                      path: 'import',
                      component: addressListImport,
                      children: [
                        {
                          path: 'batch',
                          component: addressListImportBatch,
                          children: [
                            {
                              path: 'detail',
                              component: addressListImportDetail
                            }
                          ]
                        },
                        {
                          path: 'detail',
                          component: addressListImportDetail
                        }
                      ]
                    },
                    {
                      path: 'group',
                      component: addressListGroup,
                      children: [
                        {
                          path: 'detail',
                          component: addressListGroupDetail,
                          children: [
                            {
                              path: 'member',
                              component: addressList
                            }
                          ]
                        },
                        {
                          path: 'import',
                          component: addressListImport,
                          children: [
                            {
                              path: 'batch',
                              component: addressListImportBatch,
                              children: [
                                {
                                  path: 'detail',
                                  component: addressListImportDetail
                                }
                              ]
                            },
                            {
                              path: 'detail',
                              component: addressListImportDetail
                            }
                          ]
                        },
                        {
                          path: 'group',
                          component: addressListGroup,
                          children: [
                            {
                              path: 'detail',
                              component: addressListGroupDetail,
                              children: [
                                {
                                  path: 'member',
                                  component: addressList
                                }
                              ]
                            },
                            {
                              path: 'import',
                              component: addressListImport,
                              children: [
                                {
                                  path: 'batch',
                                  component: addressListImportBatch,
                                  children: [
                                    {
                                      path: 'detail',
                                      component: addressListImportDetail
                                    }
                                  ]
                                },
                                {
                                  path: 'detail',
                                  component: addressListImportDetail
                                }
                              ]
                            }
                          ]
                        },
                      ]
                    },
                  ]
                },
              ]
            },
            {
              path: 'detail',
              component: addressListGroupDetail,
              children: [
                {
                  path: 'member',
                  component: addressList
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/my/setting',
      name: '设置',
      component: mySetting
    },
    {
      path: '/my/setting/more',
      name: '更多设置',
      component: mySettingMore
    },
    {
      path: '/my/setting/address',
      name: '我的地址',
      component: mySettingAddress,
      children: [{path: 'edit', component: mySettingAddressEdit}]
    },
    {
      path: '/my/setting/job',
      name: '我的工作',
      component: mySettingJob
    },
    {
      path: '/my/setting/education',
      name: '我的学历',
      component: mySettingEducation
    },
    {
      path: '/my/setting/third',
      name: '第三方账号',
      component: mySettingThird
    },
    {
      path: '/my/setting/about',
      name: '关于',
      component: mySettingAbout
    },
    {
      path: '/my/setting/about/suggest',
      name: '意见反馈',
      component: mySettingSuggest
    },
    {
      path: '/my/setting/about/us',
      name: '关于我们',
      component: mySettingAboutUs
    },
    {
      path: '/my/setting/safe',
      name: '账号与安全',
      component: mySettingSafe
    },
    {
      path: '/my/setting/safe/modPhone',
      name: '修改手机号',
      component: login
    },
    {
      path: '/my/setting/safe/modPwd',
      name: '修改密码',
      component: login
    },
    {
      path: '/my/info',
      name: '我的资料',
      component: myInfo,
      children: [{
        path: 'nick',
        component: myInfoNick
      },{
        path: 'intro',
        component: myInfoIntro
      }]
    },
    {
      path: '/my/qrcode',
      name: '我的二维码',
      component: myQrcode
    },
    {
      path: '/user/gesture',
      name: '手势验证',
      component: gesture
    },
    {
      path: '/cashier/index',
      name: '收银台',
      component: cashier,
      children: indentifychildRouter
    },
    {
      path: '/cashier/success',
      name: '收银成功',
      component: cashierSuccess
    },
    {
      path: '/cashier/fail',
      name: '收银失败',
      component: cashierFail
    },
    {
      path: '/third/weixin',
      name: '微信登录',
      component: weixinLogin
    },
    ...indentifyRouter,
    {
      path: '/account/index',
      name: '有钱',
      component: accountIndex
    },
    {
      path: '/account/no-apply',
      name: '未开通',
      component: accountNoApply,
      children: indentifychildRouter
    },
    {
      path: '/account/card',
      name: '银行卡',
      component: accoutCard,
      meta:{ keepAlive: false},
      children: [{
        path: 'detail',
        component: accoutCardDetail
      },{
        path: 'add',
        component: personIdentify1
      }]
    },
    {
      path: '/account/chest',
      name: '金库',
      component: accountChest,
      children: indentifychildRouter
    },
    {
      path: '/account/chest-trans',
      name: '金库流转',
      component: accountChestTrans
    },
    {
      path: '/account/transfer',
      name: '转账',
      component: accountTransfer
    },
    {
      path: '/account/success',
      name: '支付成功',
      component: accountSuccess
    },
    {
      path: '/account/transfer1',
      name: '转账',
      component: accountTransfer1
    },
    {
      path: '/account/recharge',
      name: '充值',
      component: accountRecharge,
      children: [chooseCard, ...indentifychildRouter]
    },
    {
      path: '/account/choose-card',
      name: '选择银行卡',
      component: chooseBankCard
    },
    {
      path: '/account/withdraw',
      name: '提现',
      component: accountWithdraw,
      children: [chooseCard, ...indentifychildRouter,{
        path: 'add',
        component: accoutCardAdd
      }]
    },
    {
      path: '/account/collection',
      name: '收款',
      component: accountCollection,
      children: [payRecord]
    },
    {
      path: '/account/payment',
      name: '付款',
      component: accountPayment,
      children: [payRecord]
    },
    {
      path: '/account/payment1',
      name: '付款',
      component: accountPayment1,
      children: indentifychildRouter
    },
    {
      path: '/account/payment2',
      name: '付款',
      component: accountPayment2,
      children: [{
        path: 'add',
        component: accoutCardAdd
      }, ...indentifychildRouter]
    },
    {
      path: '/account/no-card',
      name: '暂无银行卡',
      component: accountNoCard,
      children: [{
        path: 'add',
        component: personIdentify1
      }]
    },
    {
      path: '/account/detail',
      name: '资金明细',
      component: accountDetail,
      children: [time]
    },
  ]

Vue.use(Router)

export default new Router({
  routes: RouterMap
})

