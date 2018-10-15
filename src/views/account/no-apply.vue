<template>
  <div>
    <div class="app-head">
      <span class="nav-left" @click="jumpToIsPersonal"></span>
      <div class="app-title">未开通</div>
    </div>
    <div class="no-apply-body">
      <img src="../../assets/img/no-apply.png">
      <p>您尚未开通</p>
      <!--<div class="confirm-btn" @click="$router.push({path: $route.path + '/identify/index'})">实名认证开通</div>-->
      <div class="confirm-btn" @click="confirmBtn">实名认证开通</div>
      <div class="protocol-radio-box">
        <span :class="agreeProtocol?'active':''" @click="jumpToProtocol"></span>
        <div @click="jumpToProtocol"><span>同意</span><a href="javascript:;" class="color1">有钱钱包注册使用协议</a></div>
      </div>
      <p class="no-apply-footer">本服务由京东金融提供支持</p>
    </div>
    <protocol v-model="showP" @agree="agree"></protocol>
    <transition :name="trans">
      <router-view v-dom-portal class="router-container"></router-view>
    </transition>
    <!--<div @click="jumpToIsPersonal" class="resetType">重新选择账户类型</div>-->
  </div>
</template>
<style lang="less" scoped>
  .resetType{
    text-align: center;
    color:#9DAEB9;
    font-size:12px;
  }
  .no-apply-body {
    .protocol-radio-box {
      width: 195px;
      margin: 20px auto;
    }
    .confirm-btn {
      margin-top: 100px;
      background: #fbd6af;
    }
    > img {
      display: block;
      width: 61px;
      height: 44px;
      margin: 146px auto 24px;
    }
    > p {
      text-align: center;
      color: #9DAEB9;
      font-size: 14px;
      line-height: 20px;
    }
  }
  .no-apply-footer {
    position: absolute;
    bottom: 30px;
    width: 100%;
  }
</style>
<script>
  import {apiService} from "@/utils/apiservice.js";
  import Protocol from '../../components/common/protocol.vue'
  import {config} from '@/utils/config'
  export default {
    data() {
      return {
        agreeProtocol: false,
        showP: false,
        trans: 'slide',
        apiService: null
      }
    },
    beforeRouteUpdate(to, from, next) {
      if (to.path == '/account/no-apply' || from.path == '/account/no-apply') {
        this.trans = 'slide'
      } else {
        this.trans = ''
      }
      this.$nextTick(() => {
        next()
      })
    },
    mounted() {
      // this.apiService = apiService;
    },
    created() {
      let _this=this
      apiService.queryApplyAgree(this,function(res) {
        if(res.data.success){
          _this.agreeProtocol=true
          $(".confirm-btn").css({background: "#FCAD57"})
        }
      })
    },
    methods: {
      jumpBack(){
        window.history.go(-1)
      },
      jumpToIsPersonal(){
        window.location.replace(config.domainAll+'/#/isPersonal')
      },
      agree(showConfirmBtn) {
        this.agreeProtocol = true;
        this.showP = false
        $(".confirm-btn").css({background: "#FCAD57"})
      },
      confirmBtn() {
        if (this.agreeProtocol) {
           this.$router.push({"path": this.$route.path.replace('/account/no-apply', '/identify/index')})
        } else {
          return
        }
      },
      jumpToProtocol(){ //同意点击事件
        let _this=this
        apiService.regAgreement(_this,function(res) {
          console.log(res)
          if(res.data.success){
           window.location.replace(res.data.data)
          }
        })
      },
     },
    components: {
      Protocol
    }
  }
</script>
