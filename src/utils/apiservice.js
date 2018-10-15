/**
 *
 * /red.service/cusApi  /red.service
 */
let host = '@/mock';
export const apiService = {
  api: {
    getJrId: '/personal/account/exist',//金融jrid查询接口
    authorize: '/personal/account/authorize',//授权接口
    balance: '/personal/account/balance', //余额查询
    records: '/personal/account/records',//交易记录
    getQueryList: '/personal/bankCard/queryList',//查询用户所有银行卡列表
    queryCardBinByCardNo: '/personal/bankCard/queryCardBinByCardNo',//卡bin
    payPasswordIndex: '/personal/payPwd/payPasswordIndex',//修改支付密码主页
    sendValidSms: '/personal/payPwd/sendValidSms',//修改支付密码发送短信老接口
    sendValidSms1: '/personal/payPwd/sendValidSms1',//修改支付密码发送短信新接口
    commonkey: '/personal/key/get',//获取公钥接口
    validSms: '/personal/payPwd/validSms',//修改密码验证短信验证码
    openOrUpdatePayPassword: '/personal/payPwd/openOrUpdatePayPasswordNew', //支付密码修改
    checkWithdraw: '/personal/withdraw/checkWithdraw',//提现前置
    withDrawIndex: '/personal/withdraw/withDrawIndex',//提现主页
    handleWithdraw: '/personal/withdraw/handleWithdrawNew',//提现操作
    unbind: '/personal/bankCard/unbind',//解绑银行卡
    sendValidateSms: '/personal/recharge/sendValidateSms',//充值验证短信
    checkRecharge: '/personal/recharge/checkRecharge',//充值前校验
    rechargeIndex: '/personal/recharge/rechargeIndex',//充值主页
    handleRecharge: '/personal/recharge/handleRecharge',//充值操作
    verifyForReal:'/personal/verifyForReal', // 个人实名验证短信验证码
    sendVerifyCode: '/personal/sendVerifyCode',  // 实名输入银行卡和手机后  发送验证码
    bankCardSendCode: '/personal/bankCard/sendVerifyCode',  // 实名输入银行卡和手机后  发送验证码(我们的页面)
    queryApplyAgree:  '/personal/queryApplyAgree', //个人同意协议查询
    applyAgree:  '/personal/applyAgree', //个人同意协议
    regAgreement:  '/personal/regAgreement', //个人同意协议
    bankCardBind:'/personal/bankCardBind', //钱包首页绑卡
    rechargeBind:'/personal/rechargeBind',//钱包首页充值
    withdrawBind:'/personal/withdrawBind',//钱包首页提现
    accountDetailBind:'/personal/accountDetailBind',//钱包首页明细
    resetPwdBind:'/personal/resetPwdBind',//钱包首页设置修改密码
    queryEnterAccountInfo:'/personal/queryPersonalAccount',//钱包首页查询接口
    verify:'/personal/bankCard/verify', // 个人实名验证短信验证码
    queryAccountInfo:'/personal/real/queryAccountInfo'//手机号查询
  },
  queryAccountInfo(_this,callback){
    _this.$http({
      method: 'post',
      url: this.api.queryAccountInfo
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  queryEnterAccountInfo(_this,callback){
    _this.$http({
      method: 'get',
      url: this.api.queryEnterAccountInfo
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  verify(_this,data,callback){
    _this.$http({
      method: 'post',
      url: this.api.verify + "?" + data
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  resetPwdBind(_this,callback){
    _this.$http({
      method: 'get',
      url: this.api.resetPwdBind,
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  accountDetailBind(_this,callback){
    _this.$http({
      method: 'get',
      url: this.api.accountDetailBind,
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  withdrawBind(_this,callback){
    _this.$http({
      method: 'get',
      url: this.api.withdrawBind,
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  rechargeBind(_this,callback){
    _this.$http({
      method: 'get',
      url: this.api.rechargeBind,
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  bankCardBind(_this,callback){
    _this.$http({
      method: 'get',
      url: this.api.bankCardBind,
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  queryApplyAgree(_this,callback) {
    _this.$http({
      method: 'get',
      url: this.api.queryApplyAgree,
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  regAgreement(_this,callback) {
    _this.$http({
      method: 'get',
      url: this.api.regAgreement,
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  applyAgree(_this,callback) {
    _this.$http({
      method: 'get',
      url: this.api.applyAgree
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  verifyForReal(_this,data, callback) {
    _this.$http({
      method: 'post',
      url: this.api.verifyForReal,
      data:data
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  bankCardSendCode(_this,data, callback) {
    _this.$http({
      method: 'post',
      url: this.api.bankCardSendCode+"?"+data,
      data:{},
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  sendVerifyCode(_this,data, callback) {
    _this.$http({
      method: 'post',
      url: this.api.sendVerifyCode,
      data:data
    }).then(function (res) {
      // console.log()
      callback(res)
    }).catch(function (err) {
    })
  },
  getJrId(_this, data, callback) {
    _this.$http({
      method: 'post',
      url: this.api.getJrId,
      data: data
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  authorize(_this, callback) {
    _this.$http({
      method: 'post',
      url: this.api.authorize
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  balance(_this, data, callback) {
    _this.$http({
      method: 'post',
      url: this.api.balance,
      data: data
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  records(_this, data, callback) {
    _this.$http({
      method: 'get',
      url: this.api.records + "?amountIO=" + data.amountIO + "&endTimeStamp=" + data.endTimeStamp + "&pageSize=" + data.pageSize + "&startTimeStamp=" + data.startTimeStamp + "&timeStamp=" + data.timeStamp,
      // data:data
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  getQueryList(_this, data, callback) {
    _this.$http({
      method: 'post',
      url: this.api.getQueryList,
      data: data
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  queryCardBinByCardNo(_this, data, callback) {
    _this.$http({
      method: 'post',
      url: this.api.queryCardBinByCardNo+"?cardNo="+data,
      data: {},
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {

    })
  },
  payPasswordIndex(_this, callback) {
    _this.$http({
      method: 'post',
      url: this.api.payPasswordIndex
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  sendValidSms(_this, data, callback) {
    _this.$http({
      method: 'post',
      url: this.api.sendValidSms,
      data: data
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  sendValidSms1(_this, callback) {
    _this.$http({
      method: 'post',
      url: this.api.sendValidSms1
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  commonkey(_this, callback) {
    _this.$http({
      method: 'post',
      url: this.api.commonkey,
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  validSms(_this, data, callback) {
    _this.$http({
      method: 'get',
      url: this.api.validSms + "?phone=" + data.phone + "&verifyCode=" + data.verifyCode
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  openOrUpdatePayPassword(_this, data, callback) {
    _this.$http({
      method: 'get',
      url: this.api.openOrUpdatePayPassword + "?newPayPassword=" + data.newPayPassword +  "&eid=" + data.eid + "&key=" + data.key + "&cipherType=" + data.cipherType,
      // data: data
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  sendValidateSms(_this, data, callback) {
    _this.$http({
      method: 'get',
      url: this.api.sendValidateSms + "?bankCardId=" + data.bankCardId + "&amount=" + data.amount
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  checkRecharge(_this, callback) {
    _this.$http({
      method: 'post',
      url: this.api.checkRecharge,
      // data:data
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  rechargeIndex(_this, data, callback) {
    _this.$http({
      method: 'post',
      url: this.api.rechargeIndex,
      data: data
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  handleRecharge(_this, data, callback) {
    _this.$http({
      method: 'post',
      url: this.api.handleRecharge+"?"+data,
      // data: data
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  checkWithdraw(_this, callback) {
    _this.$http({
      method: 'post',
      url: this.api.checkWithdraw,
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  withDrawIndex(_this, data, callback) {
    this.http(_this, data, callback, this.api.withDrawIndex)
  },
  handleWithdraw(_this, data, callback) {
    _this.$http({
      method: 'get',
      url: this.api.handleWithdraw + "?amount=" + data.amount + "&bankCardId=" + data.bankCardId + "&cipherType=" + data.cipherType + "&payPwd=" + data.payPwd,
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  },
  unbind(_this, data, callback) {
    _this.$http({
      method: 'post',
      url: this.api.unbind+"?"+data,
      data: {}
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
      callback(err)
    })
  },
  http(_this, data, callback, url) {
    _this.$http({
      method: 'post',
      url: url,
      data: data
    }).then(function (res) {
      callback(res)
    }).catch(function (err) {
    })
  }
};

