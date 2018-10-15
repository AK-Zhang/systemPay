<template>
  <div>
    <div class="app-head">
      <span @click="back" class="nav-left"></span>
      <div class="app-title">{{forgetPassword ? '找回密码' : '认证'}}</div>
    </div>
    <process  v-if="!forgetPassword" :process="3"></process>
    <keyboard v-model="v" maxLength="6" :initResult="status==1?password:rePassword" :hideMask="true" @done="doneP" @result="inputPassword">
      <div class="password-set-box">
        <div class="password-set1" :class="{'toggle': status==2}">
          <p>请设置支付密码</p>
          <div>
            <input type="password" v-model="password" readonly>
            <span @click="toggleP"></span>
          </div>
        </div>
        <div class="password-set2" :class="{'toggle': status==2}">
          <span class="nav-left" style="top: -10px;" @click="back(0)"></span>
          <p>请确认支付密码</p>
          <p class="err-msg">两次输入不一致，请重输</p>
          <div>
            <input type="password" v-model="rePassword" readonly>
            <span @click="toggleP"></span>
          </div>
        </div>
      </div>
    </keyboard>
  </div>
</template>
<style lang="less" scoped>
.password-set-box{
  text-align: center;
  position: relative;
  overflow: hidden;
  .password-set1,.password-set2{
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
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -o-transition: all .3s;
    -ms-transition: all .3s;
    transition: all .3s;
  }
  .password-set1{
    left: 0;
    &.toggle{
      left:-100%;
    }
  }
  .password-set2{
    left:100%;
    &.toggle{
      left:0;
    }
  }
  p{
    line-height: 22px;
    height: 22px;
    font-size: 16px;
    color: #5A4B41;
  }
  input{
    border-bottom: 1px solid #BECDD7;
    text-align: center;
    padding:0 12px;
    line-height: 20px;
    height: 44px;
    margin-top: 22px;
    width: 168px;
    font-size: 16px;
    border-radius: 0;
    letter-spacing: 4px;
    color: #788A96;
    &[type=password] {
      /*color: #BECDD7;*/
    }
  }
  padding-top: 24px;
  height:150px;
  box-shadow: 0 -1px 20px 0 RGBA(0, 0, 0, 0.05);
  background-color: #fff;
}
</style>
<script>
 import {JSEncrypt} from 'jsencrypt'
 import { apiService } from "@/utils/apiservice.js";
 import {config} from '@/utils/config'
  export default {
    data () {
      return {
        v: true,
        status: 1,
        password: null,
        rePassword: null,
        newPwd:'',
        forgetPassword: false,
        cipherType:'',//加密类型
        publicKey:'',//公钥
        hasKeyDatas:null,
        opType:'2',//操作类型 1开启，2修改
        secrutyKey:''
      }
    },
    mounted () {
      if (this.$route.query.forgetPassword) {
        this.forgetPassword = true
      }
      //  let dataPamas= JSON.stringify({"salt":""})
    },
    methods: {
        payPasswordIndexCallBack(obj){
          // let _this=this;
          // if (obj.status == "200") {
          //   _this.secrutyKey = obj.data.data.secrutyKey
          // }
          // if(_this.secrutyKey){
          //   _this.cipherType=1
          // }else{
          //   _this.cipherType=0
          // }
          // if(_this.cipherType){ //加密
          //   let publicKey=_this.secrutyKey
          //   if (publicKey.indexOf('-----') < 0 ) {
          //     publicKey = "-----BEGIN PUBLIC KEY-----" + publicKey + "-----END PUBLIC KEY-----";
          //   }
          //   var jsencrypt = new JSEncrypt();
          //   jsencrypt.setPublicKey(publicKey);
          //   _this.rePassword= jsencrypt.encrypt(_this.rePassword)
          // }
          // let eid=""
          // try{
          //   var riskInfo = getJdEid();
          //   eid=riskInfo.eid
          //   console.log(eid)
          // }catch(e){
          // }
          // let data={"newPayPassword":_this.rePassword,"eid":eid,"key":"360000005000307295","cipherType":_this.cipherType}
          // apiService.openOrUpdatePayPassword(_this,data,_this.openOrUpdatePayPasswordCallBack)
        },
        commonkeyCallBack(obj){
          let _this=this;
          if(obj.data.data.pubKey){
            _this.cipherType=1
            _this.hasKeyDatas={"shaKey":obj.data.data.key,"pubKey":obj.data.data.pubKey}
            // cryptico.setPublicKeyString(this.hasKeyDatas)
          }else{
            _this.cipherType=0

          }
          if(_this.cipherType){ //加密
                let publicKey=_this.hasKeyDatas.pubKey
                var jsencrypt = new JSEncrypt();
                var subStr=/\r\n|\r|\n|\n\r/;
               // var subStr=new RegExp('/r/n');
                var result=publicKey.replace(subStr,"");
                result = result.replace(/\r\n/g,"")
                result = result.replace(/\n/g,"");
                result = result.replace(/\n\r/g,"")
                result = result.replace(/\r/g,"");
                console.log("pubkeyqian:----"+result)
                if (result.indexOf('-----') < 0 ) {
                  result = "-----BEGIN PUBLIC KEY-----" + result + "-----END PUBLIC KEY-----";
                  }
                jsencrypt.setPublicKey(result);
                console.log("key 后"+result)
                console.log("his.rePassword 前"+_this.rePassword)
                _this.newPwd= encodeURIComponent(jsencrypt.encrypt(_this.rePassword))
                console.log(" 后"+ _this.newPwd)
              let eid=""
              try{
                var riskInfo = getJdEid();
                eid=riskInfo.eid
              }catch(e){
              }
              let data={"newPayPassword":_this.newPwd,"eid":eid,"key":_this.hasKeyDatas.shaKey,"cipherType":_this.cipherType}
              apiService.openOrUpdatePayPassword(_this,data,_this.openOrUpdatePayPasswordCallBack)
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
      /**
       * 密码输入确认
       * */
      doneP () {
        if (this.status == 1) this.status = 2
        else {
          if (this.password != this.rePassword) {
            $('.password-set2 .err-msg').addClass('active')
            $('.password-set2>p:first').hide()
            this.rePassword = null
          } else {
            apiService.commonkey(this,this.commonkeyCallBack)
           // apiService.payPasswordIndex(this,this.payPasswordIndexCallBack)
          }
        }
      },
      openOrUpdatePayPasswordCallBack(obj){
          if(obj.status==200){
            if(obj.data.data.openOrUpdatePayPasswordType==0){
                  window.HMO_APP.$vux.toast.show({
                    text: "后端服务异常，请刷新后重试！"
                  })
            }else if(obj.data.data.openOrUpdatePayPasswordType==1){
                window.HMO_APP.$vux.toast.show({
                  text: "支付密码设置成功"
                })
               window.location.replace(config.domainPersonal+'/#/account/index')
            }else if(obj.data.data.openOrUpdatePayPasswordType==2){
                window.HMO_APP.$vux.toast.show({
                  text: "与原密码一致，请重新输入密码"
                })
            }
          }
      },
      back (e) {
        if (e) {
          this.$router.go(-1)
        } else {
          this.status = 1
          this.reset()
        }
      },
      inputPassword (v) {
        if (this.status == 1) {
          this.password = v
          $('.password-set1>input').val(v)
        } else {
          this.rePassword = v
          this.reset()
        }
      },
      /**
       * 错误样式恢复
       * */
      reset () {
        if ($('.password-set2 .err-msg.active').length == 1) {
          $('.password-set2 .err-msg.active').removeClass('active')
          $('.password-set2>p:first').show()
        }
      }
    },
    components: {}
  }
</script>
