<template>
  <div>
    <p>验证码已发送至<span style="color:#79C4DD;">{{mobile|pwdPhone}}</span></p>
    <p v-if="errMsg" class="err-show sub-title">{{errMsg}}</p>
    <p v-else-if="subMsg" class="sub-title">{{subMsg}}</p>
    <p v-else class="sub-title" @click="subCB" style="color:#FE9D32;">再次发送</p>
    <div id="payPassword_container" class="alieditContainer clearfix" data-busy="0">
      <div class="i-block" data-error="i_error">
        <div class="i-block six-password">
          <input class="i-text sixDigitPassword" id="payPassword_rsainput" type="tel" pattern="[0-9]*"
                 autocomplete="off" required="required" value="" name="payPassword_rsainput"
                 data-role="sixDigitPassword" tabindex="" maxlength="6" minlength="6" aria-required="true">
          <div tabindex="0" class="sixDigitPassword-box">
            <i class=""><b style="visibility: hidden;"></b></i>
            <i><b style="visibility: hidden;"></b></i>
            <i><b style="visibility: hidden;"></b></i>
            <i><b style="visibility: hidden;"></b></i>
            <i><b style="visibility: hidden;"></b></i>
            <i><b style="visibility: hidden;"></b></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  p {
    font-size: 12px;
    text-align: center;
    margin-top: 18px;
  }

  .sub-title {
    z-index: 100;
    line-height: 16px;
    height: 16px;
    text-align: center;
    margin-top: 18px;
  }

  .sub-title.error {
    color: #FF6666;
  }

  .sub-title.success {
    font-size: 16px;
    color: #FC9947;
  }

  .alieditContainer {
    position: relative;
  }

  .sixDigitPassword {
    position: absolute;
    left: -122px;
    top: 0;
    width: 1000px;
    height: 44px;
    color: #fff;
    font-size: 12px;
    -webkit-user-select: initial;
    outline: none;
    z-index: 999;
    opacity: 0;
    filter: alpha(opacity=0);
  }

  .sixDigitPassword-box {

    cursor: text;
    background: #fff;
    outline: none;
    position: relative;
    border-radius: 2px;
  }

  .sixDigitPassword-box i {
    float: left;
    display: block;
    margin: 3px 10px 0 0;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    border: 1px solid #EFF2F7;
  }

  .sixDigitPassword-box.err i {
    border: 1px solid #FA7E7F;
  }

  .sixDigitPassword-box i:last-child {
    margin-right: 0;
  }

  .sixDigitPassword-box i:first-child {
    margin-left: 3px;
  }

  .sixDigitPassword-box .active {
    background: url('../../assets/img/password-blink.gif') no-repeat center center;
  }

  .sixDigitPassword-box b {
    display: block;
    margin: 15.5px auto;
    width: 7px;
    height: 7px;
    overflow: hidden;
    visibility: hidden;
    background: url('../../assets/img/passeord-dot.png') no-repeat;
  }

  .ui-securitycore .ui-form-item .ui-form-explain {
    margin-top: 8px;
  }

  .six-password {
    position: relative;
    width: 293px;
    overflow: hidden;
    margin: 30px auto;
    height: 46px;
  }
</style>
<script>
  let vueObj = null
  import {apiService} from "@/utils/apiservice.js";
  import {config} from '@/utils/config'
  import {mapGetters} from 'vuex'
  export default {
    props: ['mobile', 'findPwd', 'type','dataObj','ReqCodeId'],
    data() {
      return {
        subMsg: '',
        timer: null, //定时器
        errMsg: '',
        isValidate: false,
        apiService: null,
        idInfoObj:null,
        verifyReqId:""
      }
    },
    created() {
      this.apiService = apiService
    },
    mounted() {
      console.log(this,"状态管理")
      this.init()
      vueObj = this
      // console.log(this.$route.verifyReqId)
      // this.verifyReqId = this.$route.verifyReqId
      
    },
    filters: {
      pwdPhone: function (value) {
        if (value) {
          var strs = value
          var str = value.slice(3, (value.length - 4))
          str = str.replace(/./g, '*')
          return strs.slice(0, 3) + str + strs.slice(value.length - 4, value.length)
        }
      }
    },
    computed: {
      ...mapGetters([
        'idInfo',
      ])
    },
    methods: {
      init() {
        this.sent('init');
        var payPassword = $("#payPassword_container"),
          _this = payPassword.find('i'),
          k = 0, me = this;
        _this.removeClass('active').find('b').css('visibility', 'hidden');
        _this.eq(k).addClass("active");
        payPassword.attr('data-busy', '1');
        this.$nextTick(() => {
          $("input[name='payPassword_rsainput']").val('').focus()
        })
        //点击隐藏的input密码框,在6个显示的密码框的第一个框显示光标
        payPassword.on('focus', "input[name='payPassword_rsainput']", function () {
          if (payPassword.attr('data-busy') === '0') {
            //在第一个密码框中添加光标样式
            _this.eq(k).addClass("active");
            payPassword.attr('data-busy', '1');
          }
        });
        //change时去除输入框的高亮，用户再次输入密码时需再次点击
        payPassword.on('change', "input[name='payPassword_rsainput']", function () {
          _this.eq(k).removeClass("active");
          payPassword.attr('data-busy', '0');
        }).on('blur', "input[name='payPassword_rsainput']", function () {
          _this.eq(k).removeClass("active");
          payPassword.attr('data-busy', '0');
        });
        //使用keyup事件，绑定键盘上的数字按键和backspace按键
        payPassword.on('keyup', "input[name='payPassword_rsainput']", function (e) {
          var e = (e) ? e : window.event;
          //键盘上的数字键按下才可以输入
          if (e.keyCode == 8 || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 229) {
            k = this.value.length;//输入框里面的密码长度
            var l = _this.size();//6
            for (; l--;) {
              //输入到第几个密码框，第几个密码框就显示高亮和光标（在输入框内有2个数字密码，第三个密码框要显示高亮和光标，之前的显示黑点后面的显示空白，输入和删除都一样）
              if (l === k) {
                _this.eq(l).addClass("active");
                _this.eq(l).find('b').css('visibility', 'hidden');
              } else {
                _this.eq(l).removeClass("active");
                _this.eq(l).find('b').css('visibility', l < k ? 'visible' : 'hidden');
              }
            }
            if (k === 6 && !me.isValidate) {
              me.isValidate = true
              if (me.type == "password") {
                let vuethis = this;
                // 验证短信验证码
                let dataPamas = {"verifyCode": this.value, "phone": me.mobile};
                me.apiService.validSms(me, dataPamas, function (obj) {
                  if (obj.data.code == "00000") {
                    me.$emit('passCheck', {
                      sendms: vuethis.value
                    })
                    me.$router.push({path:me.$route.path.replace('/account/no-card', '/identify/password')})

                  } else {
                    //输入错误
                    me.isValidate = false
                    $('.sixDigitPassword-box').addClass('err shake-animate')
                    $('.sixDigitPassword-box b').css('visibility', 'hidden')
                    k = 0;
                    $(this).val('');
                    _this.eq(k).addClass("active");
                    payPassword.attr('data-busy', '1');
                    me.errMsg = '错误，请重新输入'
                    me.$nextTick(() => {
                      $('.err-show.sub-title').addClass('active').addClass('error').addClass('shake-animate')
                    })
                    var mecopy = me
                    setTimeout(function () {
                      mecopy.errMsg = ''
                      $('.sixDigitPassword-box').removeClass('err shake-animate')

                      //抖动
                      var payPassword = $("#payPassword_container"),
                        _this = payPassword.find('i'),
                        k = 0, me = this;
                      _this.removeClass('active').find('b').css('visibility', 'hidden');
                      _this.eq(k).addClass("active");
                      payPassword.attr('data-busy', '1');
                      $("input[name='payPassword_rsainput']").val('').focus()
                      //点击隐藏的input密码框,在6个显示的密码框的第一个框显示光标
                      payPassword.on('focus', "input[name='payPassword_rsainput']", function () {
                        if (payPassword.attr('data-busy') === '0') {
                          //在第一个密码框中添加光标样式
                          _this.eq(k).addClass("active");
                          payPassword.attr('data-busy', '1');
                        }
                      });
                      //change时去除输入框的高亮，用户再次输入密码时需再次点击
                      payPassword.on('change', "input[name='payPassword_rsainput']", function () {
                        _this.eq(k).removeClass("active");
                        payPassword.attr('data-busy', '0');
                      }).on('blur', "input[name='payPassword_rsainput']", function () {
                        _this.eq(k).removeClass("active");
                        payPassword.attr('data-busy', '0');
                      });
                    }, 2000)
                  }

                })

              } else if(me.type == "indentifyType"){
                let vuethis = this;
                // 验证短信验证码
                // let dataPamas = {"verifyCode": this.value, "phone": me.mobile};
                console.log(this.ReqCodeId)
                var dataObj=JSON.parse(sessionStorage.getItem('idInfoObj'))
                var dataPamas=Object.assign(dataObj,{"verifyCode": this.value,"macAddress":""})
                var dataPamas1=Object.assign(dataObj,{"verifyCode": this.value,"macAddress":"","verifyReqId":sessionStorage.getItem('verifyReqId')})
                sessionStorage.setItem('idInfoObj',JSON.stringify(dataPamas))
                console.log(sessionStorage.getItem('idInfoObj'),"111")
                me.apiService.verifyForReal(me, dataPamas1, function (obj) {
                  if (obj.data.success) {
                    window.location.replace(config.domainPersonal+'/#/account/index')
                   // this.$router.push({'path': this.$route.path.replace('/identify/real_name', '/account/index')})
                    // me.$emit('passCheck', {
                    //   sendms: vuethis.value
                    // })
                  } else {
                    //输入错误
                    me.isValidate = false
                    $('.sixDigitPassword-box').addClass('err shake-animate')
                    $('.sixDigitPassword-box b').css('visibility', 'hidden')
                    k = 0;
                    $(this).val('');
                    _this.eq(k).addClass("active");
                    payPassword.attr('data-busy', '1');
                    me.errMsg = '错误，请重新输入'
                    me.$nextTick(() => {
                      $('.err-show.sub-title').addClass('active').addClass('error').addClass('shake-animate')
                    })
                    var mecopy = me
                    setTimeout(function () {
                      mecopy.errMsg = ''
                      $('.sixDigitPassword-box').removeClass('err shake-animate')

                      //抖动
                      var payPassword = $("#payPassword_container"),
                        _this = payPassword.find('i'),
                        k = 0, me = this;
                      _this.removeClass('active').find('b').css('visibility', 'hidden');
                      _this.eq(k).addClass("active");
                      payPassword.attr('data-busy', '1');
                      $("input[name='payPassword_rsainput']").val('').focus()
                      //点击隐藏的input密码框,在6个显示的密码框的第一个框显示光标
                      payPassword.on('focus', "input[name='payPassword_rsainput']", function () {
                        if (payPassword.attr('data-busy') === '0') {
                          //在第一个密码框中添加光标样式
                          _this.eq(k).addClass("active");
                          payPassword.attr('data-busy', '1');
                        }
                      });
                      //change时去除输入框的高亮，用户再次输入密码时需再次点击
                      payPassword.on('change', "input[name='payPassword_rsainput']", function () {
                        _this.eq(k).removeClass("active");
                        payPassword.attr('data-busy', '0');
                      }).on('blur', "input[name='payPassword_rsainput']", function () {
                        _this.eq(k).removeClass("active");
                        payPassword.attr('data-busy', '0');
                      });
                    }, 2000)
                  }
                })
              } else if(me.type == "bindCard"){
                let vuethis = this;
                // 验证短信验证码
                let dataPamas = {"verifyCode": this.value, "phone": me.mobile};
                var bindCardInfoObj=JSON.parse(sessionStorage.getItem('bindCardInfo'))
                let data="token="+bindCardInfoObj.token+"&verifyCode="+this.value+"&applyInfoId="+bindCardInfoObj.applyInfoId+"&cardType="+bindCardInfoObj.cardType+"&cardNo="+bindCardInfoObj.cardNo+"&bankCode="+bindCardInfoObj.bankCode+"&aucReqId="+bindCardInfoObj.aucReqId+"&mobile="+me.mobile;
                me.apiService.verify(me,data, function (obj) {
                  if (obj.data.code=='00000') {
                    window.location.reload()
                    window.location.replace(config.jdpay+'/#/account/card')
                  } else {
                    //输入错误
                    me.isValidate = false
                    $('.sixDigitPassword-box').addClass('err shake-animate')
                    $('.sixDigitPassword-box b').css('visibility', 'hidden')
                    k = 0;
                    $(this).val('');
                    _this.eq(k).addClass("active");
                    payPassword.attr('data-busy', '1');
                    me.errMsg = '错误，请重新输入'
                    me.$nextTick(() => {
                      $('.err-show.sub-title').addClass('active').addClass('error').addClass('shake-animate')
                    })
                    var mecopy = me
                    setTimeout(function () {
                      mecopy.errMsg = ''
                      $('.sixDigitPassword-box').removeClass('err shake-animate')

                      //抖动
                      var payPassword = $("#payPassword_container"),
                        _this = payPassword.find('i'),
                        k = 0, me = this;
                      _this.removeClass('active').find('b').css('visibility', 'hidden');
                      _this.eq(k).addClass("active");
                      payPassword.attr('data-busy', '1');
                      $("input[name='payPassword_rsainput']").val('').focus()
                      //点击隐藏的input密码框,在6个显示的密码框的第一个框显示光标
                      payPassword.on('focus', "input[name='payPassword_rsainput']", function () {
                        if (payPassword.attr('data-busy') === '0') {
                          //在第一个密码框中添加光标样式
                          _this.eq(k).addClass("active");
                          payPassword.attr('data-busy', '1');
                        }
                      });
                      //change时去除输入框的高亮，用户再次输入密码时需再次点击
                      payPassword.on('change', "input[name='payPassword_rsainput']", function () {
                        _this.eq(k).removeClass("active");
                        payPassword.attr('data-busy', '0');
                      }).on('blur', "input[name='payPassword_rsainput']", function () {
                        _this.eq(k).removeClass("active");
                        payPassword.attr('data-busy', '0');
                      });
                    }, 2000)
                  }

                })
              }
              else if(me.type == "recharge"){
                me.$emit('passCheck', {
                  sendms: this.value
                })
              }
              else {
                //非修改密码
                me.$emit('passCheck', {
                  sendms: this.value
                })
              }
            }
          } else {
            //输入其他字符，直接清空
            var _val = this.value;
            this.value = _val.replace(/\D/g, '');
          }
        });
      },
      sendValidSmsCallBack1(obj) {
        if (obj.data.code == '00000') {
          this.mobile = obj.data.data.mobile
        }
      },
      // 递减时间
      sent(vueObj) {
        this.setCode(vueObj)
        this.subMsg = '119s';
        this.timer = setInterval(() => {
          var n;
          if ((n = parseInt(this.subMsg)) > 0) {
            this.subMsg = --n + 's'
          } else {
            this.subMsg = ''
            clearInterval(this.timer)
          }
        }, 1000)

        //再次发送
        var payPassword = $("#payPassword_container"),
          _this = payPassword.find('i'),
          k = 0, me = this;
        _this.removeClass('active').find('b').css('visibility', 'hidden');
        _this.eq(k).addClass("active");
        payPassword.attr('data-busy', '1');
        this.$nextTick(() => {
          $("input[name='payPassword_rsainput']").val('').focus()
        })
        //点击隐藏的input密码框,在6个显示的密码框的第一个框显示光标
        payPassword.on('focus', "input[name='payPassword_rsainput']", function () {
          if (payPassword.attr('data-busy') === '0') {
            //在第一个密码框中添加光标样式
            _this.eq(k).addClass("active");
            payPassword.attr('data-busy', '1');
          }
        })
      },
      setCode(item) {
        let _this=this
        //修改密码发送短信验证码
        if (this.type == "password") {
          if (this.apiService) {
            this.apiService.sendValidSms1(this, this.sendValidSmsCallBack1)
          }

        }else if(this.type == "indentifyType"&&item!='init'){
          if (this.apiService) { //再次发送
            var data=JSON.parse(sessionStorage.getItem('idInfoObj'))
            this.apiService.sendVerifyCode(this,data,function (res) {
              console.log(data)
              console.log(res.data)
            })
          }

        }else if(this.type == "bindCard"&&item!='init'){
          if (this.apiService) { //再次发送
            var bindCardInfoObj=JSON.parse(sessionStorage.getItem('bindCardInfo'))
            var data = "cardType=" + bindCardInfoObj.cardType + "&cardNo=" + bindCardInfoObj.cardNo + "&bankCode=" + bindCardInfoObj.bankCode + "&mobile=" + bindCardInfoObj.mobile
            this.apiService.bankCardSendCode(this,data,function (res) {

            })
          }

        } else if (this.type == "rechage") {

          this.$emit('sendSmsAgin', {
            sendms: this.value
          })
        }
      },
      subCB() {
        this.sent(this)
      }
    },
    beforeDestroy() {
      $("#payPassword_container").off('focus blur change keyup', '**')
      this.timer && clearInterval(this.timer)
    },
    components: {}
  }
</script>
