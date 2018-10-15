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
      <p v-show="msg" v-html="msg"></p>
      <p class="sub-title" v-if="status!=3">{{subMsg}}</p>
      <div v-show="status==1">
        <div class="pwd-box">
          <input v-model="mobile" class="login-input" id="login-mobile" data-num="1" type="tel" pattern="[0-9]*" placeholder="请输入手机号">
        </div>
        <div class="sep-line"></div>
        <!--<button class="next-btn" v-show="showNext" @click="changeStatus(2,1)">下一步</button>-->
      </div>
      <div v-if="status==2" class="status-2-box">
        <div class="tips-box">请把我拉到橙色的圈圈里</div>
        <range class="range-box" ref="ranges" v-model="dragNum" @on-change="onDragChange"></range>
        <div class="range-handle-standard"><span></span></div>
      </div>
      <div v-if="status==3" class="status-3-box">
        <validate-code :mobile="mobile" @passCheck="passCheck" :findPwd="findPwd"></validate-code>
      </div>
      <div v-show="status==11" class="status-11-box">
        <div class="pwd-box">
          <input v-model="password" aria-required="true" required="required"  type="password" maxlength="20"  class="login-input" placeholder="请输入旧密码">
          <i class="toggle-pwd" @click="togglePwd"></i>
        </div>
        <div class="sep-line"></div>
        <button class="next-btn" v-show="showNext" @click="changeStatus(4,11)">下一步</button>
        <button class="forgot-pwd" @click="forgotPwd">忘记密码</button>
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
        <button class="next-btn" v-show="showNext" @click="loginByPwd">登录</button>
        <div v-show="status==9" class="check-btn-box">
          <p>或</p>
          <button @click="changeStatus(2,9)">手机验证码登录</button>
        </div>
      </div>
      <div v-show="status==10" class="status-10-box" style="text-align: center">
        您已完成登录
      </div>
      <div v-show="status==12" class="status-12-box">
        <p style="text-align:center;margin-top: 69px;color: #9DAEB9;font-size: 14px">更改成功</p>
        <button class="finish-btn" @click="$router.go(-1)">完成</button>
      </div>
    </div>
    <third-login v-show="!modPwd && !modPhone && (status ==1||status==9)" class="third-box"></third-login>
  </div>
</template>
<style lang="less" scoped>
  .finish-btn{
    position: absolute;
    width: 271px;
    height: 46px;
    line-height: 46px;
    color: #fff;
    left:0;
    right: 0;
    margin: auto;
    bottom:138px;
    font-size: 16px;
    background: #FCAD57;
    border-radius: 23px;
  }
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
    height:16px;
    width:100px;
    color: #9DAEB9;
    position: absolute;
    bottom:58px;
    left:0;
    right: 0;
    margin: auto;
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
    margin-top: 10px;
    .skip{
      float: right;
      font-size: 14px;
      color: #9DAEB9;
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
      width: 45px;
      height:45px;
      margin-top: 9.5px;
    }
  }
</style>

<script>
  import { Range} from 'vux'
  import thirdLogin from '../../components/third/index.vue'
  import validateCode from '../../components/common/validateCode.vue'
  export default {
    data () {
      return {
        mobile: null, // 手机号
        showNext: false, // 是否显示下一步按钮
        showNavLeft: true, // 是否显示后退按钮
        msg: '欢迎来到红了旅行', //头像下方提示文字
        status: 1, // 当前状态
        lastStatus: 0,
        dragNum: 20,
        verifyNum: 60, // 后台定的滑块圆环位置
        subMsg: '',
        timer: null, //定时器
        password: null,
        repassword: null,
        findPwd: false,
        rtMsg: '',
        imLogin: false,
        modPhone: false,
        modPwd: false
      }
    },
    watch: {
      'status': function (v) {
        if (v == 10) {
          this.$router.push({path: '/account/no-apply'})
        }
      },
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
          this.phoneExist()
//          if (v == '15755555555') {
//            this.changeStatus(9, 1)
//          } else {
//            this.changeStatus(2, 1)
//          }
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
      if (this.$route.path.indexOf('modPwd') > -1) { // 个人中心的修改密码页面
        this.modPwd = true
        this.status = 11
      }
      if (this.$route.path.indexOf('modPhone') > -1) this.modPhone = true // 个人中心的修改手机页面
    },
    methods: {
      /**
       * 密码登录
       * */
      loginByPwd () {
        this.$ajax.post('/customer/login', {
          isFormType: true,
          username: this.mobile,
          password: this.password
        }, data => {
          this.showNavLeft = false
          switch (data.audit) {
            case 'NOTAUDIT':
              this.$router.push({path: '/account/no-apply'})
              break
            case 'WAITAUDITED':
              this.$router.push({path: '/identify/wait'})
              break
            case 'REJECTED':
              this.$router.push({path: '/identify/fail'})
              break
            case 'APPLYING':
              this.$router.push({path: '/identify/wait'})
              break
            case 'AUDITED':
              this.$router.push({path: '/account/index'})
              break
            case 'NOTAPPROVED':
              this.$router.push({path: '/account/no-apply'})
              break
          }
        })
      },
      /**
       * 判断手机号有无注册
       * **/
      phoneExist () {
        if (this.modPhone) {
          this.changeStatus(2, 1)
          return
        }
        this.$ajax.get('/phoneExists',{
          phone: this.mobile
        }, data => {
            console.log()
          if (data) this.changeStatus(9, 1)
          else this.changeStatus(2, 1)
        }, err => {
          this.changeStatus(2, 1)
        })
      },
      /**
       * 验证码验证成功
       * */
      passCheck (data, code) {
        this.smsCode = code
        if (this.modPhone) {
          this.changeStatus(12, 3)
        } else if (this.imLogin) {
          this.status = 10
          this.showNavLeft = false
        } else {
          this.changeStatus(4, 3)
        }
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
          if (this.modPwd) {
            this.changeStatus(12, 5);
          } else if (this.findPwd) {
            this.$ajax.post('/findpwd/reset?password=' + this.password, {
            }, data => {
              this.status = 10
              this.showNavLeft = false
            })
          } else {
            this.$ajax.post('/customer/reg?phone=' + this.mobile + '&password=' + this.password + '&smsCode=' + this.smsCode, {
            }, data => {
              this.status = 10
              this.showNavLeft = false
            })
          }
        }
      },
      /**
       * 后退按钮
       * */
      backStatus () {
        if (this.status < 2 || this.status > 9) this.$router.go(-1)
        this.changeStatus(this.lastStatus, this.status)
      },
      /**
       * 状态更新函数
       * @params v 更新后的状态
       * @params o 更新前的状态
       * */
      changeStatus (v, o) {
        this.status = v;
        this.lastStatus = o;
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
        this.subMsg = ''
        this.showNext = false;
        this.showNavLeft = false
        this.$nextTick(() => {
          $('.status-4-box input').focus()
        })
      },
      statusChange2 (o) {
        if (o == 9 && !this.findPwd) this.imLogin = true
        this.msg = this.mobile
        this.rtMsg = ''
        this.dragNum = 20;
        this.timer && clearInterval(this.timer)
        $('.sub-title.active').removeClass('active')
        this.subMsg = '你没有拉对，请再试一次'
        this.$nextTick(() => {
          var me = this,w = ($('.status-2-box').width() - 23)/100,left = this.dragNum * w + 'px', n = me.dragNum, isDrag = false;
          $('.tips-box').css('left', w * this.dragNum - 27 + 'px')
          this.$ajax.get('/codes/slide', (data) => {
            this.verifyNum = data
            function mouseE () {
              $('.status-2-box').one('mousedown', '.range-handle', function () {
                isDrag = true
                $('.tips-box').css('visibility', 'hidden')
                $(this).removeClass('error').addClass('active')
                $('.range-handle-standard.error').removeClass('error')
                $('.sub-title.active').removeClass('active').removeClass('error').removeClass('shake-animate')
              })
//            $(document.body).on('mouseup',function () {
//              if (isDrag && !$(this).hasClass('range-handle')) {
//                isDrag = false
//                if (me.dragNum == n) return $('.range-handle').removeClass('active')
//                if (Math.abs(me.dragNum - me.verifyNum) <= 2) {
//                  $('.range-handle').addClass('success')
//                  me.subMsg = '验证完成'
//                  $('.sub-title').addClass('success active shake-animate')
//                  me.sendCode()
//                } else {
//                  $('.range-handle').removeClass('active').addClass('error').css('left',left)
//                  $('.range-handle-standard').addClass('error')
//                  $('.sub-title').addClass('active').addClass('error').addClass('shake-animate')
//                }
//              }
//            })
              $('.status-2-box').one('mouseup', '.range-handle', function () {
                isDrag = false
                if (me.dragNum == n) return $(this).removeClass('active')
                if (Math.abs(me.dragNum - me.verifyNum) <= 2) {
                  $(this).addClass('success')
                  me.subMsg = '验证完成'
                  $('.sub-title').addClass('success active shake-animate')
                  me.sendCode()
                } else {
                  mouseE()
                  $(this).removeClass('active').addClass('error').css('left',left)
                  $('.range-handle-standard').addClass('error')
                  $('.sub-title').addClass('active').addClass('error').addClass('shake-animate')
                }
              })
            }
            mouseE()
            touchE()
            function touchE () {
              $('.status-2-box').one('touchstart', '.range-handle', function () {
                $('.tips-box').css('visibility', 'hidden')
                $(this).removeClass('error').addClass('active')
                $('.range-handle-standard.error').removeClass('error')
                $('.sub-title.active').removeClass('active').removeClass('error').removeClass('shake-animate')
              })
              $('.status-2-box').one('touchend', '.range-handle', function () {
                if (Math.abs(me.dragNum - me.verifyNum) <= 2) {
                  $(this).addClass('success')
                  me.subMsg = '验证完成'
                  $('.sub-title').addClass('success active shake-animate')
                  me.sendCode()
                } else {
                  touchE()
                  $(this).removeClass('active').addClass('error').css('left',left)
                  $('.range-handle-standard').addClass('error')
                  $('.sub-title').addClass('active').addClass('error').addClass('shake-animate')
                }
              })
            }
            $('.range-handle-standard').css('left', w * me.verifyNum -1.5 + 'px')
          })
        })
      },
      /**
       * 发送验证码
       * */
      sendCode () {
        if (this.modPwd || this.modPhone) {
          this.changeStatus(3,2)
          return
        }
        this.$ajax.get('/codes/sendSmsCode', {
          phone: this.mobile,
          code: this.verifyNum
        }, () => {
          this.changeStatus(3,2)
          $('.sub-title').removeClass('success shake-animate active')
        }, err => {
          $('.sub-title').removeClass('success shake-animate')
          $('.range-handle').removeClass('success')
//          this.$vux.toast.show({
//            text: '验证码发送失败，请重新拖动滑块'
//          })
          this.changeStatus(2,2)
        })
      },
      statusChange3 (o) {
        this.msg = ''
      },
      statusChange1 () {
        this.msg = '欢迎来到红了旅行'
        this.subMsg = ''
        this.mobile = null
      }
    },
    components: {
      thirdLogin,
      Range,
      validateCode
    }
  }
</script>
