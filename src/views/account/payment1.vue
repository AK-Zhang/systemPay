<template>
    <div>
      <div class="app-head">
        <span class="nav-left" @click="$router.go(-1)"></span>
        <div class="app-title">转账</div>
      </div>
      <div class="payment1-content">
        <img src="../../assets/img/female-icon.png">
        <div>
          <img src="../../assets/img/female.png">商家
          </div>
        <p>13676899878</p>
        <div><span>¥</span>{{money}}</div>
        <p class="single-line" v-if="remark">备注: {{remark}}</p>
      </div>
      <div class="confirm-btn" style="margin-top: 101px;" @click="showSettle=true">确认</div>
      <transition :name="trans">
        <router-view  v-dom-portal class="router-container"></router-view>
      </transition>
      <pay-board v-model="showSettle" :selectCard="false" :hideMask="true" :paid="money" @hasPaid="$router.push({path:'/account/success'})"></pay-board>
    </div>
</template>
<style lang="less" scoped>
  .payment1-content{
    text-align: center;
    color: #788A96;
    >div:nth-child(2){
      img{
        margin-right: 5px;
        position: relative;
        top:1px;
      }
      font-size: 14px;
      line-height: 20px;
    }
    >p{
      line-height: 20px;
      margin: 5px 15px;
    }
    >div:nth-child(4){
      line-height: 62px;
      font-size: 44px;
      >span{
        font-size: 25px;
        color: #9DAEB9;
        margin-right: 5px;
      }
    }
    >img{
      width: 60px;
      height: 60px;
      margin: 30px auto 5px;
    }
  }
  .payment1-body{
    position: absolute;
    top:44px;
    bottom: 44px;
    left: 0;
    right: 0;
  }
</style>
<script>
  import payBoard from '../../components/common/payboard.vue'
  export default {
    data () {
      return {
        showSettle: true,
        trans: 'slide',
        money: 10000,
        remark: null
      }
    },
    beforeRouteUpdate (to, from, next) {
      if (to.path == '/account/payment1' || from.path == '/account/payment1') {
        this.trans = 'slide'
      } else {
        this.trans = ''
      }
      this.$nextTick(() => {
        next()
      })
    },
    mounted () {
      this.money = this.$route.query.money || 10000
      this.remark = this.$route.query.remark
    },
    methods: {},
    components: {
      payBoard
    }
  }
</script>
