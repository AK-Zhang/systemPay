<template>
    <div class="gray-body">
      <div class="app-head1">
        <span class="nav-left" @click="$router.go(-1)"></span>
        <div class="app-title1">余额</div>
        <div class="nav-right" @click="$router.push({path: $route.path.replace('/account/chest', '/account/detail')})">明细</div>
      </div>
      <div class="chest-body">
        <div class="chest-info">
          <p>账号余额</p>
          <h1>5028.26</h1>
          <div>
            <p>昨日收益</p>
            <h6>0.56</h6>
          </div>
          <div>
            <p>累计收益</p>
            <h6>56.88</h6>
          </div>
        </div>
        <div class="chest-rule white-bg">
          <div class="switch-toggle label" :class="{active: !autoTrans}" @click="showSettle=true">
            <div class="toggle-handle"></div>
          </div>
          <p>{{!autoTrans?'立即开启余额自动转入享受收益':'1月25日 3000元已自动转入金库'}}</p>
        </div>
        <div class="chest-act white-bg">
          <div  @click="transMoney(1)">
            转入
            <span class="right-arrow"></span>
          </div>
          <div></div>
          <div @click="transMoney(2)">
            转出
            <span class="right-arrow"></span>
          </div>
        </div>
      </div>
      <transition :name="trans">
        <router-view  v-dom-portal v-dom-portal class="router-container"></router-view>
      </transition>
      <pay-board v-model="showSettle" :selectCard="false" @hasPaid="(showSettle=false)||(autoTrans = !autoTrans)"></pay-board>
    </div>
</template>
<style lang="less" scoped>
  .chest-act{
    margin-top: 10px;
    >div:first-child{
      background: url('../../assets/img/trans-in.png') no-repeat 15px center;
    }
    >div:last-child{
      background: url('../../assets/img/withdraw.png') no-repeat 15px center;
    }
    >div:first-child,>div:last-child{
      padding: 0 15px 0 50px;
      height: 60px;
      font-size: 16px;
      color: #788A96;
      line-height: 60px;
    }
    >div:nth-child(2){
      margin-left: 50px;
      height: 1px;
      background-color: #F0F0F0;
    }
  }
  .chest-rule{
    >div{
      float: right;
      width:50px;
      margin-top: 10px;
    }
    >p{
      margin-right: 60px;
      line-height: 50px;
    }
    height: 50px;
    padding: 0 15px;
    color: #788A96;
    font-size: 14px;
  }
  .chest-info{
    >div{
      background: rgba(255,255,255,.1);
      height: 65px;
      width: 50%;
      float: left;
      text-align: center;
      padding: 10px 0;
      h6{
        line-height: 21px;
        margin-top: 5px;
        color: #fff;
        font-size: 15px;
      }
    }
    p{
      line-height: 19px;
      color: #FFE5CA;
      font-size: 13px;
      padding-left: 15px;
    }
    h1{
      padding-left: 15px;
      color: #fff;
      font-size: 34px;
      line-height: 48px;
      margin: 3px 0 10px;
    }
    background-color: #FCAD57;
    height: 194px;
    padding-top: 50px;
  }
</style>
<script>
  import payBoard from '../../components/common/payboard.vue'
  export default {
    data () {
      return {
        autoTrans: false,
        showSettle: false,
        trans: 'slide'
      }
    },
    beforeRouteUpdate (to, from, next) {
      if (to.path == '/account/chest' || from.path == '/account/chest') {
        this.trans = 'slide'
      } else {
        this.trans = ''
      }
      this.$nextTick(() => {
        next()
      })
    },
    mounted () {
    },
    methods: {
      transMoney (type) {
        this.$router.push({path: '/account/chest-trans', query: {trans: type}})
      }
    },
    components: {
      payBoard
    }
  }
</script>
