<template>
  <div>
    <div class="app-head white-bg">
      <span class="nav-left" @click="$router.go(-1)"></span>
      <div class="app-title">{{key}}</div>
    </div>
    <div class="recharge-body">
      <div :class="money?'active':''">
        <span>¥</span>
        <div @click="money=maxMoney">全部{{key}}</div>
        <p v-if="money" @click="showKeyboard=true">
          {{money}}<img src="../../assets/img/password-blink.gif">
        </p>
        <p v-else @click="showKeyboard=true">
          <img src="../../assets/img/password-blink.gif">{{'可' + key + maxMoney}}
        </p>
      </div>
      <div class="confirm-btn" @click="confirmSettle">确认</div>
    </div>
    <keyboard :initResult="money" v-model="showKeyboard" :canMin="true" :hideMask="true" :hasDec="true" @result="modNum" @done="confirmSettle"></keyboard>
  </div>
</template>
<style lang="less" scoped>
  .recharge-body{
    .withdraw-rule{
      >span{
        margin-top: 4px;
      }
      >div{
        margin-left: 30px;
        >p:first-child{
          line-height: 23px;
          font-size: 16px;
          color:#788A96;
          margin-bottom: 5px;
        }
        >p:last-child{
          line-height: 20px;
          font-size: 14px;
          color: #9DAEB9;
          margin-bottom: 10px;
        }
      }
      margin-top: 13px;
    }
    >div:not(:first-child):not(:last-child){
      padding-left: 45px;
      height: 61px;
      line-height: 60px;
      color: #788A96;
      font-size: 16px;
      &.add{
        background-image: url("../../assets/img/bank-add.png");
      }
      &.abc{
        background-image: url("../../assets/img/bank-abc.png");
      }
      &.icbc{
        background-image: url("../../assets/img/bank-icbc.png");
      }
      &.cbc{
        background-image: url("../../assets/img/bank-cbc.png");
      }
      &.bc{
        background-image: url("../../assets/img/bank-bc.png");
      }
      background: url('../../assets/img/bank-icbc.png') no-repeat 0 center;
      border-bottom: 1px solid #f0f0f0;
    }
    >div:nth-child(1){
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
        line-height: 100px;
        font-size: 15px;
        margin: 0 65px 0 40px;
      }
      color: #9DAEB9;
      height: 101px;
      line-height: 100px;
      border-bottom: 1px solid #f0f0f0;
      img{
        height: 44px;
        position: relative;
        top:16px;
        width: 2px;
      }
      span{
        float: left;
        font-size:34px;
        margin-right: 23px;
        color: #788A96;
      }
    }
    >p{
      line-height: 20px;
      font-size: 14px;
      margin: 15px 0 6px 0;
      color:#9DAEB9;
    }
    padding: 0 15px ;
  }
</style>
<script>
  export default {
    data () {
      return {
        key: '',
        money: null,
        showCard: false,
        maxMoney: '5000.98',
        showKeyboard: false,
        showSettle: false,
        rule: 1,
        bankCard: {
          name: '中国工商银行（3980）',
          type: 'icbc'
        }
      }
    },
    beforeRouteUpdate (to, from, next) {
    },
    mounted () {
      this.key = this.$route.query.trans == 1 ? '转入' : '转出'
    },
    methods: {
      /**
       * 确认充值
       * */
      confirmSettle () {
        if (this.money > 0) {
          this.showKeyboard = false
          this.$router.push({path: '/account/payment2', query: {title: this.key, payType: '账户余额'}})
        }
      },
      /**
       * 修改金额
       * */
      modNum (v) {
        if (parseFloat(v) > this.maxMoney) return
        this.money = v
      },
      chooseCard (item) {
        this.bankCard = item
      }
    },
    components: {
    }
  }
</script>
