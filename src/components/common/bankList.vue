<template>
  <div v-transfer-dom :id="id" class="pay-box">
    <popup class="pay-box" :show-mask="!hideMask" v-model="showKey" :style="{'z-index': zIndex}"  style="height:403px;overflow-y: visible;background:#fff;">
        银行卡列表
    </popup>
  </div>
</template>
<style lang="less" scoped>
  .pay-type-box{
    >[class^=pay]{
      height:44px;
      margin: 10px 20px;
      color: #788A96;
      font-size: 14px;
      position: relative;
      &.active{
        text-shadow: 0 2px 4px RGBA(120, 138, 150, 0.24);
        background: url('../../assets/img/pay-selected.png') no-repeat right center;
      }
      &.disabled{
        color:lighten(#788A96, 20%)
      }
      >img{
        float: left;
        width: 24px;
        height:24px;
        margin-top: 10px;
      }
      >div{
        margin: 0 60px 0 36px;
        height: 44px;
        >p{
          height:22px;
          line-height: 22px;
        }
        >p:nth-child(2){
          color:#9DAEB9;
          font-size: 12px;
        }
      }
    }
  }
  .pay-box{
    .pay-title,.err-msg{
      line-height: 22px;
      height: 22px;
      font-size: 16px;
      color: #5A4B41;
      text-align: center;
      margin-top: 24px;
    }
  }
  .nav-left{
    top:24px;
    z-index: 1;
  }
  .forget-box{
    position: absolute;
    top:24px;
    z-index: 1;
    right:20px;
    line-height: 20px;
    color:#BECDD7;
    font-size: 14px;
  }
  .password-set-box{
    text-align: center;
    position: relative;
    overflow: hidden;
    height: 184px;
    .password-set1{
      >p:last-child{
        line-height: 20px;
        height: 20px;
        font-size: 14px;
        color:#BECDD7;
        margin-top: 23px;
        >img{
          position: relative;
          top:1px;
          margin-left: 10px;
        }
      }
      >div{
        position: relative;
        width: 168px;
        margin:  0 auto;
        >span{
          position: absolute;
          right:0;
          bottom:12px;
          background: url('../../assets/img/show-pwd.png') no-repeat;
          width: 20px;
          height: 20px;
          background-size: 20px 20px;
          &.active{
            background: url('../../assets/img/hide-pwd.png') no-repeat;
            background-size: 20px 20px;
          }
        }
      }
      position: absolute;
      height: 100%;
      width: 100%;
    }

    input{
      border-bottom: 1px solid #BECDD7;
      text-align: center;
      padding:0 12px;
      line-height: 20px;
      height: 44px;
      margin-top: 12px;
      width: 168px;
      font-size: 16px;
      border-radius: 0;
      letter-spacing: 4px;
      color: #788A96;
      &[type=password] {
      }
    }
    box-shadow: 0 -1px 20px 0 RGBA(0, 0, 0, 0.05);
    background-color: #fff;
  }
</style>
<script>
 
  import {Popup, TransferDomDirective as TransferDom} from 'vux'
  import keyBody from '../common/keybody.vue'
  export default {
    props: {
      value: {
        required: true
      },
      'selectCard': {
        default: function () {
          return true
        }
      },
      'hideMask': {
        default: function () {
          return false
        }
      },
      'canMin': {
        default: function () {
          return true
        }
      },
    },
    data () {
      return {
        id: 'payboard' + new Date().getTime(),
        showKey: false,
        password: '',
        maxLength: 6,
        status: 0,
        zIndex: 9999,
        payPwdErroMsg:"密码输入错误"
      }
    },
    watch:{
      'value':function(){
        if (this.value) this.showKey=true;
        else {
          this.showKey=false;
          this.password = ''
        }
      },
      'showKey':function(){
        if(!this.showKey) this.$emit('input',false)
      },
      'password': function (v) {
        if (v && $('.password-set1 .err-msg.active').length > 0) {
          $('.password-set1 .pay-title').show()
          $('.password-set1 .err-msg.active').removeClass('active')
        }
      }
    },
    mounted () {
      this.showKey=this.value;
      if (this.$route.matched.length > 1) {
        this.zIndex = 9999999
      }
    },
    directives: {
      TransferDom
    },
    methods: {
      /**
       * 忘记密码
       * */
      forgetPassword () {
        this.$router.push({
          path: this.$route.path + '/identify/person',
          query: {
            forgetPassword: 1
          }
        })
      },
      /**
       * 密码输入完成
       * */
      doneSettle () {
       if (this.password) {
        // 校验支付密码
        // if (this.password == '123456') {
           if(this.password.length==6){
             this.payPwdErroMsg="密码输入错误"
             this.$emit('hasPaid',this.password)
           }else{
              this.payPwdErroMsg="至少输入6位数字"
              this.password = ''
              $('.password-set1 .pay-title').hide()
              $('.password-set1 .err-msg').addClass('active')
           }
//           this.$emit('hasPaid',this.password)
//           this.$router.push({path: '/cashier/success'})
//         } else if (this.password == '654321') {
// //          this.$router.push({path: '/cashier/fail'})
        } else {
          this.payPwdErroMsg="密码输入错误"
          this.password = ''
          $('.password-set1 .pay-title').hide()
          $('.password-set1 .err-msg').addClass('active')
        }
      },
      /**
       * 键盘输入
       * */
      keyIn (k) {
        if (k == 'e') {
          // if(this.password.length!=6){
          //   alert("密码位数少于6位")
          // }
          this.doneSettle()
          this.password = ''
        }
        else if (k == 'm') {
          if (this.canMin) this.$emit('input',false)
        } else if (k == '.') {
          return
        } else if (k == 'd') {
          this.password = this.password.slice(0, -1)
        } else {
          if (this.password.length == this.maxLength) return
          this.password += k
        }
      },
      toggleP (e) {
        let tar = $(e.target)
        if (tar.hasClass('active')) {
          tar.removeClass('active').prev().attr('type', 'password')
        } else {
          tar.addClass('active').prev().attr('type', 'text')
        }
      },
    },
    beforeDestroy () {
      this.$el && this.$el.parentNode.removeChild(this.$el)
    },
    components: {
      Popup,
      keyBody
    }
  }
</script>
