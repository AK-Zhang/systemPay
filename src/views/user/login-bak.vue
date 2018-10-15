<template>
  <div class="login-box">
    <div class="login-head clearfix">
      <span v-show="showNavLeft" @click="backStatus" class="nav-left"></span>
      <span class="skip" @click="rtFun">{{rtMsg}}</span>
    </div>
    <div class="login-body">
      <div class="logo-box">
        <img src="../../assets/img/logo.png">
      </div>
      <p v-html="msg"></p>
      <p class="sub-title">{{subMsg}}</p>
      <div v-show="status==1">
        <div class="pwd-box">
          <input v-model="mobile" class="login-input" id="login-mobile" data-num="1" type="tel" pattern="[0-9]*" placeholder="请输入手机号">
        </div>
        <div class="sep-line"></div>
        <!--<button class="next-btn" v-show="showNext" @click="changeStatus(2,1)">下一步</button>-->
      </div>
      <div v-if="status==2" class="status-2-box">
        <div class="tips-box">请把我拉到橙色的圈圈里</div>
        <range class="range-box" ref="ranges" :max="1000" v-model="dragNum" @on-change="onDragChange"></range>
        <div class="range-handle-standard"><span></span></div>
      </div>
      <div v-show="status==3" class="status-3-box">
        <div id="payPassword_container" class="alieditContainer clearfix" data-busy="0">
          <div class="i-block" data-error="i_error">
            <div class="i-block six-password">
              <input class="i-text sixDigitPassword" id="payPassword_rsainput" type="tel" pattern="[0-9]*"  autocomplete="off" required="required" value="" name="payPassword_rsainput" data-role="sixDigitPassword" tabindex="" maxlength="6" minlength="6" aria-required="true">
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
      <div v-show="status==4" class="status-4-box">
        <div class="pwd-box">
          <input v-model="password" aria-required="true" required="required"  type="password" maxlength="20"  class="login-input" :placeholder="findPwd?'请输入6-20位新密码' : '请输入6-20位密码'">
          <i class="toggle-pwd" @click="togglePwd"></i>
        </div>
        <div class="sep-line"></div>
        <button class="next-btn" v-show="showNext" @click="changeStatus(5,4)">下一步</button>
      </div>
      <div v-show="status==5" class="status-5-box">
        <div class="pwd-box">
          <input v-model="repassword" aria-required="true" required="required"  type="password" maxlength="20"  class="login-input" :placeholder="findPwd?'请确认新密码':'请确认密码'">
          <i class="toggle-pwd" @click="togglePwd"></i>
        </div>
        <div class="sep-line"></div>
        <button class="next-btn" v-show="showNext" @click="checkPwd">完成</button>
      </div>
      <div v-show="status==6" class="status-6-box">
        <third-login class="third-box"></third-login>
        <span @click="changeStatus(7,6)">跳过</span>
      </div>
      <div v-show="status==7 || status == 9" class="status-7-box">
        <div class="pwd-box">
          <input  v-model="password"  aria-required="true" required="required" type="password"  maxlength="20" class="login-input" placeholder="请输入密码">
          <i class="toggle-pwd" @click="togglePwd"></i>
        </div>
        <div class="sep-line"></div>
        <button class="next-btn" v-show="showNext" @click="loginPwd">登录</button>
        <!--<button v-show="status==7" class="forgot-pwd" @click="forgotPwd">忘记密码</button>-->
        <div v-show="status==9" class="check-btn-box">
          <p>或</p>
          <button @click="changeStatus(2,9)">手机验证码登录</button>
        </div>
      </div>
      <div v-show="status==10" class="status-10-box" style="text-align: center">
        您已完成登录
      </div>
    </div>
    <third-login v-show="status ==1||status==9" class="third-box"></third-login>
  </div>
</template>
<style lang="less" scoped>
  .status-6-box{
    >span{
      position: absolute;
      bottom:-4px;
      color:#979797;
      left: 0;
      right: 0;
      margin: auto;
      width: 40px;
    }
    position: relative;
    height:177px;
  }
  .check-btn-box{
    color:#979797;
    text-align: center;
    line-height: 14px;
    p{
      margin: 15px 0;
    }
  }
  .login-box{
    height:100%;
    position: relative;
    overflow: hidden;
  }
  .pwd-box{
    width:197px;
    margin: 41px auto 12px;
    position: relative;
    height: 17px;
    >.toggle-pwd{
      position: absolute;
      right:0;
      top:0;
      width:40px;
      height:17px;
      background: #fff url('../../assets/img/show-pwd.png') no-repeat;
      background-size:18px ;
      cursor: pointer;
      z-index:100;
    }
    >.toggle-pwd.active{
      height:17px;
      background-image:url('../../assets/img/hide-pwd.png');
    }
  }
  .forgot-pwd{
    text-align: center;
    display: block;
    height:16px;
    width:100px;
    margin: 34px auto 0;
  }
  .sub-title{
    z-index:100;
    line-height: 16px;
    height:16px;
    text-align: center;
    visibility: hidden;
    margin-top: 18px;
  }
  .sub-title.active{
    visibility: visible;
  }
  .sub-title.error{
    color:#FF6666;
  }
  .sub-title.success{
    font-size: 16px;
    color:#FC9947;
  }

  .range-handle-standard.error{
    background: #FF6666;
    box-shadow: 0 2px 4px 0px rgba(255,102,102,0.22);
  }
  .range-box{
    margin-top: 40px;
  }
  .status-2-box{
    .tips-box{
      width:180px;
      text-align: center;
      line-height: 46px;
      border-radius: 23px;
      box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.06);
      height:46px;
      position: relative;
    }
    .tips-box::before{
      content:'';
      position: absolute;
      left:25px;
      bottom:0;
      background: #fff;
      width:18px;
      height:25px;
      z-index: 10;
    }
    .tips-box::after{
      content:'';
      position: absolute;
      left:30px;
      bottom:-8px;
      transform: rotate(55deg) skew(18deg);
      background: #fff;
      width:18px;
      box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.06);
      height:18px;
    }
    margin: 24px 25px 0;
    position: relative;
  }

  .login-body{
    .sep-line{
      width:197px;
      margin:0 auto;
    }
    .login-input{
      width:197px;
      height:17px;
      display: block;
      line-height: 17px;
      text-align: center;
    }
    >p{
      font-size: 12px;
      text-align: center;
      margin-top: 18px;
    }
  }
  .login-head{
    height:24px;
    margin-top: 13px;
    .skip{
      float: right;
      font-size: 16px;
      margin-right: 15px;
      line-height: 24px;
      cursor: pointer;
    }
  }
  .logo-box{
    width: 60px;
    height: 60px;
    text-align: center;
    border-radius: 50%;
    margin: 52px auto 0;
    box-shadow: 0 2px 1px 2px #f7f7f7;
    >img{
      width: 41px;
      height:41px;
      margin-top: 9.5px;
    }
  }
  .alieditContainer{
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
    opacity:0;
    filter:alpha(opacity=0);
  }

  .sixDigitPassword-box {

    cursor:text;
    background: #fff;
    outline: none;
    position: relative;
    border-radius: 2px;
  }
  .sixDigitPassword-box i {
    float: left;
    display: block;
    margin:3px 10px 0 0 ;
    width:40px;
    height:40px;
    background:rgba(255,255,255,1);
    border-radius: 2px ;
    border: 1px solid #EFF2F7;
  }
  .sixDigitPassword-box.err i {
    border: 1px solid #FA7E7F;
  }
  .sixDigitPassword-box i:last-child{
    margin-right: 0;
  }
  .sixDigitPassword-box i:first-child{
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
    visibility:hidden;
    background: url('../../assets/img/passeord-dot.png') no-repeat;
  }
  .ui-securitycore  .ui-form-item .ui-form-explain{
    margin-top: 8px;
  }
  .six-password{
    position: relative;
    width:293px;
    overflow: hidden;
    margin: 30px auto;
    height:46px;
  }
</style>

<script>
  import { Range} from 'vux'
  import thirdLogin from '../../components/third/index.vue'
  export default {
    data () {
      return {
        mobile: null, // 手机号
        showNext: false, // 是否显示下一步按钮
        showNavLeft: true, // 是否显示后退按钮
        msg: '欢迎来到千呼生活', //头像下方提示文字
        status: 1, // 当前状态
        dragNum: 300,
        subMsg: '',
        timer: null, //定时器
        password: null,
        repassword: null,
        findPwd: false,
        rtMsg: '',
        imLogin: false,
        verifyNum: null,
        verrifyCodeToken: null
      }
    },
    watch: {
      'repassword': function (v) {
        $('.sub-title.active').removeClass('active').removeClass('error').removeClass('shake-animate')
        if (v && v.length >= 6) {
          this.showNext = true
        }
      },
      'password': function (v) {
        if (v && v.length >= 6) {
          this.showNext = true
        }
      },
      'mobile': function (v) {
        if(/^1[34578]\d{9}$/.test(v)){
          if (v == '15755555555') {
            this.changeStatus(9, 1)
          } else {
            this.changeStatus(2, 1)
          }
        }
      }
    },
    mounted () {
      $('.login-input').click(function () {
        setTimeout(() => {
          this.scrollIntoView(true);
          this.scrollIntoViewIfNeeded();
        }, 200)
      })
    },
    methods: {
      /**
       * 密码登录
       * */
      loginPwd () {
        this.$ajax.post('/qh/mobile/user/login/password',{
          mobile: this.mobile,
          password: this.password
        })
      },
      /**
       * 切换密码显示状态
       * */
      togglePwd (e) {
        var t = $(e.target)
        if (t.hasClass('active')) {
          t.removeClass('active').prev().attr('type', 'password')
        } else {
          t.addClass('active').prev().attr('type', 'text')
        }
      },
      /**
       * 右侧按钮事件
       * */
      rtFun () {
        if (this.rtMsg == '跳过') {
          this.status = 10
          this.showNavLeft = false
        } else if (this.rtMsg == '忘记密码') {
          this.forgotPwd()
        }
      },
      /**
       * 拖拽事件
       * */
      onDragChange (v) {
      },
      /**
       * 忘记密码
       * */
      forgotPwd () {
        this.findPwd = true
        this.changeStatus(2, 9)
      },
      /**
       * 检验两次密码输入是否一致
       * */
      checkPwd () {
        if (this.password != this.repassword) {
          this.subMsg = '两次密码不一致，请重新输入'
          this.repassword = null
          this.$nextTick(() => {
            $('.sub-title').addClass('active').addClass('error').addClass('shake-animate')
          })
        } else {
          if (!this.findPwd) {
            this.$ajax.post('/qh/mobile/user', {
              mobile: this.mobile,
              password: this.password,
              verifyCodeToken: this.verifyCodeToken
            }, () => {
              this.changeStatus(6, 5);
            })
          } else {
            this.$ajax.put('/qh/mobile/user/mobile/forgotPassword', {
              mobile: this.mobile,
              password: this.password,
              verifyCodeToken: this.verifyCodeToken
            }, () => {
              this.changeStatus(7, 5);
            })
          }
        }
      },
      /**
       * 后退按钮
       * */
      backStatus () {
        if (this.status == 1) {
          this.$router.go(-1)
          return
        }
        this.changeStatus(this.status - 1, this.status)
      },
      /**
       * 状态更新函数
       * @params v 更新后的状态
       * @params o 更新前的状态
       * */
      changeStatus (v, o) {
        this.status = v;
        this['statusChange' + v] && this['statusChange' + v](o) // 每个状态值对应一个调用函数
      },
      statusChange9 (o) {
        this.showNext = true;
        this.msg = this.mobile
        this.rtMsg = '忘记密码'
        this.cb = this.forgotPwd
      },
      statusChange7 (o) {
        this.msg = this.mobile
      },
      statusChange6 (o) {
        this.msg = '请绑定第三方账号'
        this.rtMsg = ''
      },
      statusChange5 (o) {
        this.msg = '确认密码';
        this.showNext = false;
        this.repassword = null
        this.showNavLeft = true
        this.$nextTick(() => {
          $('.status-5-box input').focus()
        })
      },
      statusChange4 (o) {
        this.msg = this.findPwd ? '设置新密码' : '设置密码';
        this.password = null
        this.timer && clearInterval(this.timer)
        this.subMsg = ''
        this.showNext = false;
        this.showNavLeft = false
        this.$nextTick(() => {
          $('.status-4-box input').focus()
        })
      },
      /**
       * 获取滑块停留位置码
       * */
      getSliderCode () {

      },
      statusChange2 (o) {
        if (o == 9 && !this.findPwd) this.imLogin = true;
        this.msg = this.mobile
        this.rtMsg = ''
        this.dragNum = 300;
        this.timer && clearInterval(this.timer)
        $('.sub-title.active').removeClass('active')
        this.subMsg = '你没有拉对，请再试一次'
        this.$nextTick(() => {
          var me = this,w = ($('.status-2-box').width() - 23)/1000,left = this.dragNum * w + 'px', n = me.dragNum, isDrag = false;
          $('.tips-box').css('left', w * this.dragNum - 27 + 'px')
          this.$ajax.get('/qh/mobile/user/mobile/verifyNumber?mobile=' + this.mobile, (data) => {
            this.verifyNum = data.vertifyNumber
            $('.status-2-box').on('mousedown', '.range-handle', function () {
              isDrag = true
              $('.tips-box').css('visibility', 'hidden')
              $(this).removeClass('error').addClass('active')
              $('.range-handle-standard.error').removeClass('error')
              $('.sub-title.active').removeClass('active').removeClass('error').removeClass('shake-animate')
            })
            $(document.body).on('mouseup',function () {
              if (isDrag && !$(this).hasClass('range-handle')) {
                isDrag = false
                if (me.dragNum == n) return $('.range-handle').removeClass('active')
                if (Math.abs(me.dragNum - me.verifyNum) <= 20) {
                  $('.range-handle').addClass('success')
                  me.subMsg = '验证完成'
                  $('.sub-title').addClass('success active shake-animate')
                  setTimeout(function () {
                    me.changeStatus(3,2)
                    $('.sub-title').removeClass('success shake-animate')
                  }, 1200)
                } else {
                  $('.range-handle').removeClass('active').addClass('error').css('left',left)
                  $('.range-handle-standard').addClass('error')
                  $('.sub-title').addClass('active').addClass('error').addClass('shake-animate')
                }
              }
            })
            $('.status-2-box').on('mouseup', '.range-handle', function () {
              isDrag = false
              if (me.dragNum == n) return $(this).removeClass('active')
              if (Math.abs(me.dragNum - me.verifyNum) <= 20) {
                $(this).addClass('success')
                me.subMsg = '验证完成'
                $('.sub-title').addClass('success active shake-animate')
                setTimeout(function () {
                  me.changeStatus(3,2)
                  $('.sub-title').removeClass('success shake-animate')
                }, 1200)
              } else {
                $(this).removeClass('active').addClass('error').css('left',left)
                $('.range-handle-standard').addClass('error')
                $('.sub-title').addClass('active').addClass('error').addClass('shake-animate')
              }
            })
            $('.status-2-box').on('touchstart', '.range-handle', function () {
              $('.tips-box').css('visibility', 'hidden')
              $(this).removeClass('error').addClass('active')
              $('.range-handle-standard.error').removeClass('error')
              $('.sub-title.active').removeClass('active').removeClass('error').removeClass('shake-animate')
            })
            $('.status-2-box').on('touchend', '.range-handle', function () {
              if (Math.abs(me.dragNum - me.verifyNum) <= 20) {
                $(this).addClass('success')
                me.subMsg = '验证完成'
                $('.sub-title').addClass('success active shake-animate')
                setTimeout(function () {
                  me.changeStatus(3,2)
                  $('.sub-title').removeClass('success shake-animate')
                }, 1200)
              } else {
                $(this).removeClass('active').addClass('error').css('left',left)
                $('.range-handle-standard').addClass('error')
                $('.sub-title').addClass('active').addClass('error').addClass('shake-animate')
              }
            })
            $('.range-handle-standard').css('left', w * me.verifyNum -1.5 + 'px')
          })
        })
      },
      /**
       * 验证码发送
       * */
      sendVerifyCode () {
        this.msg = '验证码发送中..'
        this.$ajax.post('/qh/mobile/user/biu/login/verifyCode', {
          mobile: this.mobile,
          verifyNumber: this.verifyNum
        }, () => {
          this.msg = '验证码已发送至<span style="color:#79C4DD;">' + this.mobile + '</span>'
          this.subMsg = '59s';
          this.timer = setInterval(() => {
            var n;
            if ((n = parseInt(this.subMsg.slice(0, 2))) > 0) {
              this.subMsg = --n + 's'
            } else {
              this.subMsg = '再次发送'
              clearInterval(this.timer)
            }
          }, 1000)
        }, () => {
          this.msg = '验证码发送失败'
          this.subMsg = '再次发送'
          clearInterval(this.timer)
        })
      },
      statusChange3 (o) {
        this.sendVerifyCode()
        var payPassword = $("#payPassword_container"),
          _this = payPassword.find('i'),
          k = 0, me = this;
        _this.removeClass('active').find('b').css('visibility','hidden');
        _this.eq(k).addClass("active");
        payPassword.attr('data-busy','1');
        $('.sub-title').click(function () {
          if ($(this).html().indexOf('再次发送') !== -1) {
            me.sendVerifyCode()
          }
        })
        this.$nextTick(() => {
          $("input[name='payPassword_rsainput']").val('').focus()
        })
        //点击隐藏的input密码框,在6个显示的密码框的第一个框显示光标
        payPassword.on('focus',"input[name='payPassword_rsainput']",function(){
          if(payPassword.attr('data-busy') === '0'){
            //在第一个密码框中添加光标样式
            _this.eq(k).addClass("active");
            payPassword.attr('data-busy','1');
          }
        });
        //change时去除输入框的高亮，用户再次输入密码时需再次点击
        payPassword.on('change',"input[name='payPassword_rsainput']",function(){
          _this.eq(k).removeClass("active");
          payPassword.attr('data-busy','0');
        }).on('blur',"input[name='payPassword_rsainput']",function(){
          _this.eq(k).removeClass("active");
          payPassword.attr('data-busy','0');
        });
        //使用keyup事件，绑定键盘上的数字按键和backspace按键
        payPassword.on('keyup',"input[name='payPassword_rsainput']",function(e){
          var  e = (e) ? e : window.event;
          $('.sixDigitPassword-box').removeClass('err shake-animate')
          //键盘上的数字键按下才可以输入
          if(e.keyCode == 8 || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 229){
            k = this.value.length;//输入框里面的密码长度
            var l = _this.size();//6
            for(;l--;){
              //输入到第几个密码框，第几个密码框就显示高亮和光标（在输入框内有2个数字密码，第三个密码框要显示高亮和光标，之前的显示黑点后面的显示空白，输入和删除都一样）
              if(l === k){
                _this.eq(l).addClass("active");
                _this.eq(l).find('b').css('visibility','hidden');
              }else{
                _this.eq(l).removeClass("active");
                _this.eq(l).find('b').css('visibility', l < k ? 'visible' : 'hidden');
              }
            }
            if(k === 6){
              if (this.imLogin) {
                /**
                 * 直接通过验证码登录
                 * */
                me.$ajax.post('/qh/mobile/user/login/verifyCode', {
                  mobile: me.mobile,
                  verifyCode: this.value
                })
              } else {
                /**
                 * 检查验证码
                 * */
                me.$ajax.post('/qh/mobile/user/verifyCode/check', {
                  mobile: me.mobile,
                  verifyCode: this.value
                }, data => {
                  me.verifyCodeToken = data.verifyCodeToken
                  me.changeStatus(4, 3)
                }, () => {
                  $('.sixDigitPassword-box').addClass('err shake-animate')
                  $('.sixDigitPassword-box b').css('visibility', 'hidden')
                  k = 0;
                  $(this).val('');
                  _this.eq(k).addClass("active");
                  payPassword.attr('data-busy','1');
                })
              }
            }
          }else{
            //输入其他字符，直接清空
            var _val = this.value;
            this.value = _val.replace(/\D/g,'');
          }
        });
      },
      statusChange1 () {
        this.msg = '欢迎来到千呼生活'
        this.mobile = null
      }
    },
    components: {
      thirdLogin,
      Range
    }
  }
</script>
