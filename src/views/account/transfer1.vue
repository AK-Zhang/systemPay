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
      <div :class="money?'active':''">
        <span>¥</span>
        <p v-if="money" @click="showKeyboard=true">
          {{money}}<img  v-show="showKeyboard" src="../../assets/img/password-blink.gif">
        </p>
        <p v-else @click="showKeyboard=true">
          <img v-show="showKeyboard" src="../../assets/img/password-blink.gif">{{'可转账金额' + maxMoney}}
        </p>
      </div>
      <input v-model="remark" @click="showKeyboard=false" type="text" placeholder="添加备注">
    </div>
    <div class="confirm-btn" style="margin-top: 101px;" @click="confirmSettle">确认</div>
    <keyboard :initResult="money" v-model="showKeyboard" :canMin="true" :hideMask="true" :hasDec="true" @result="modNum" @done="confirmSettle"></keyboard>
  </div>
</template>
<style lang="less" scoped>
  .payment1-content{
    >input{
      text-align: left;
      display: block;
      margin: 6px 15px;
    }
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
      >div{
        float: right;
        font-size: 15px;
        color: #FCAD57;
      }
      &.active{
        >p{
          color: #788A96;
          font-size: 44px;
          vertical-align: middle;
          >img{
            top:6px;
          }
        }
      }
      >p{
        height: 62px;
        line-height: 62px;
        font-size: 15px;
        text-align: left;
      }
      color: #9DAEB9;
      height: 63px;
      line-height: 62px;
      border-bottom: 1px solid #f0f0f0;
      img{
        height: 44px;
        position: relative;
        top:16px;
        width: 2px;
      }
      span{
        float: left;
        font-size:25px;
        margin-right: 23px;
        line-height: 25px;
        margin-top: 30px;
        color: #788A96;
      }
      margin: 0 15px ;
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
        showKeyboard: true,
        money: null,
        remark: null,
        maxMoney: '5000.98',
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
    },
    methods: {
      /**
       * 确认充值
       * */
      confirmSettle () {
        if (this.money > 0) {
          this.showKeyboard = false
          this.$ajax.post('/trade/transfer', {inMerCustomerId: this.$route.query.id, orderAmount: this.money}, data => {
            location.href = data
          })
//          this.$router.push({path:'/account/payment1', query: {money:+this.money, remark: this.remark, id: this.$route.query.id}})
        }
      },
      /**
       * 修改金额
       * */
      modNum (v) {
        if (parseFloat(v) > this.maxMoney) return
        this.money = v
      },
    },
    components: {
    }
  }
</script>
