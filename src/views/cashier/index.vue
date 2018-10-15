<template>
    <div class="cashier-box">
      <div class="cashier-head">
        <p>向商家付款</p>
        <img src="../../assets/img/logo.png">
        <p>千呼生活</p>
      </div>
      <div class="cashier-body">
        <div class="money-input-box" @click="modMoney">
          消费总额: <img :style="{visibility: showKeyboard&&!showPoint? 'visible' : 'hidden'}" src="../../assets/img/password-blink.gif"><span>{{money ? '¥ ' + money : null}}</span>
        </div>
        <div v-if="discountList[0] || points && paid1 > 0 || showPoint" class="sep-line" style="margin:18px 0 10px 0;"></div>
        <div class="discount-box clearfix" v-for="(item, index) in discountList" :key="item.key">
          <div class="discount-content" :class="'discount' + item.type">
            {{item.name}}
          </div>
          <div class="discount-select">
            {{item.selected? ('-¥ ' + item.discount) : null}}
            <button class="check-box" :class="{active: item.selected}" @click="toggleDiscount(index)"></button>
          </div>
        </div>
        <div class="discount-box clearfix" v-if="points && paid1 > 0 || showPoint">
          <div class="discount-content discount3">
            可用 <a class="point-mod-box" :class="{active:showPoint}" @click="modPoint">{{pointObj.point}}</a><img style="height:14px;position: relative;top:2px;" :style="{visibility: showKeyboard&&showPoint? 'visible' : 'hidden'}" src="../../assets/img/password-blink.gif"> 积分
          </div>
          <div class="discount-select">
            {{pointObj.selected? ('-¥ ' + (pointObj.discount||0)) : null}}
            <button class="check-box" :class="{active: pointObj.selected}" @click="toggleDiscount('point')"></button>
          </div>
        </div>
        <div class="money-input-box" v-if="money">
          <div class="sep-line" style="margin:10px 0 18px 0;"></div>
          实付金额: <span class="color1">{{'¥ ' + paid}}</span>
        </div>
        <div class="money-remark" @click="remarkClick">
          <label for="money-text">备注:</label>
          <div>
            <textarea id="money-text" class="money-text" maxlength="50" rows="3"></textarea>
          </div>
        </div>
      </div>
      <keyboard :initResult="showPoint ? pointObj.point : money" v-model="showKeyboard" :canMin="true" :hideMask="true" :hasDec="showPoint ? false : true" @result="modNum" @done="doneMoney"></keyboard>
      <!--<keyboard :initResult="pointObj.point" v-model="showPoint" :canMin="true" :hideMask="true" @result="modNum" @done="doneMoney"></keyboard>-->
      <pay-board v-model="showSettle" :paid="paid"></pay-board>
      <transition :name="trans">
        <router-view  v-dom-portal class="router-container"></router-view>
      </transition>
    </div>
</template>
<style lang="less" scoped>
  @import '../../assets/css/common.less';
  .point-mod-box{
    color:#FE9D32;
    text-decoration: underline;
    display: inline-block;
    text-align: center;
    &.active{
      color:#10aeff;
    }
  }
  .discount-box{
    line-height: 22px;
    margin: 5px 0;
  }
  .discount-select{
    float: right;
    margin-right: 18px;
    font-size: 14px;
    color: #626D74;
    .check-box{
      margin-left: 12px;
    }
  }
  .discount-content{
    padding-left: 21px;
    float: left;
    font-size: 13px;
    color: #9DAEB9;
    &.discount1{
      background: url(../../assets/img/discount-minus.png) no-repeat 0 center;
    }
    &.discount2{
      background: url(../../assets/img/discount-coupon.png) no-repeat 0 center;
    }
    &.discount3{
      background: url(../../assets/img/discount-point.png) no-repeat 0 center;
    }
  }
  .cashier-box.active{
    .cashier-head{
      >p:first-child{
        height: 0;
        margin: 0;
        visibility: hidden;
      }
      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 42px 0 5px 0;
      }
      .cashier-body{
        padding: 18px 0 18px 15px;
      }
      height: 130px;
    }
  }
  .cashier-body{
    .app-body;
    left:28px;
    right: 28px;
    padding: 25px 0 25px 15px;
    .transition-3s;
  }
  .money-remark{
    font-size: 12px;
    color:#9DAEB9;
    position: absolute;
    bottom:-78px;
    width:100%;
    left: 0;
    padding: 0 15px;
    line-height: 20px;
    >label{
      float: left;
    }
    >div{
      margin-left: 40px;
    }
    .money-text{
      width: 100%;
      resize: none;
      border: none;
      line-height: 20px;
    }
  }
  .money-input-box{
    span{
      float: right;
      color: #626D74;
      margin-right: 25px;
      font-size: 18px;
    }
    img{
      float: right;
      height: 22px;
      position: relative;
      top:2px;
      left: -25px;
    }
    height:25px;
    color: #788A96;
    font-size: 14px;
    line-height: 25px;
  }
  .cashier-head{
    >p:first-child{
      font-size: 16px;
      visibility: visible;
      height: 16px;
      line-height: 16px;
      margin: 16px 0 42px;
      -webkit-transition: height .3s, margin .3s;
      -moz-transition: height .3s, margin .3s;
      -o-transition: height .3s, margin .3s;
      -ms-transition: height .3s, margin .3s;
      transition: height .3s, margin .3s;
    }
    img{
      width: 80px;
      height: 80px;
      margin-bottom: 18px;
      .transition-3s;
    }
    font-size: 14px;
    text-align: center;
    color: #5A4B41;
    height:200px;
    .transition-3s;
    background:-webkit-linear-gradient(rgba(255,255,255,1),rgba(255,255,255,0.78));
    background:-o-linear-gradient(rgba(255,255,255,1),rgba(255,255,255,0.78));
    background:-ms-linear-gradient(rgba(255,255,255,1),rgba(255,255,255,0.78));
    background:-moz-linear-gradient(rgba(255,255,255,1),rgba(255,255,255,0.78));
    background:linear-gradient(rgba(255,255,255,1),rgba(255,255,255,0.78));
  }
</style>
<script>
  import payBoard from '../../components/common/payboard.vue'
  export default {
    data () {
      return {
        showKeyboard: true, // 是否显示输入金额框
        showPoint: false, // 是否显示修改积分框
        showSettle: false, // 是否显示输入密码框
        money: null,
        discountList: [],
        points: 100,
        trans: 'slide',
        pointObj: {
          selected: true
        },
        discount: 0
      }
    },
    beforeRouteUpdate (to, from, next) {
      if (to.path == '/cashier/index' || from.path == '/cashier/index') {
        this.trans = 'slide'
      } else {
        this.trans = ''
      }
      this.$nextTick(() => {
        next()
      })
    },
    watch: {
      'showSettle': function (v) {
        if (!v) {
          setTimeout(() => {
            this.showKeyboard = true
          }, 200)
        }
      },
      'money': function (v) {
        if (v && !$('.cashier-box').hasClass('active')) {
          $('.cashier-box').addClass('active')
        } else if (!v && $('.cashier-box').hasClass('active')) {
          $('.cashier-box').removeClass('active')
        }
        if (v >= 100 && !this.discountList[0]) {
          this.discountList.push({name: '每满100减10元', discount: 10, type: 1, selected: true})
          this.discountList.push({name: '30元代金券', discount: 30, type: 2, selected: true})
          this.discount += 40
        } else if (v < 100) {
          this.discountList = []
          this.discount = 0
        }
      },
      'paid1': function () {
        this.calPoint()
      },
      'showPoint': function (v) {
        if (!v) {
          if (!this.pointObj.point) {
            this.calPoint()
          }
        }
      }
    },
    computed: {
      'paid1': function () { // 不包含积分抵扣优惠的待支付
        return this.$methods.numSub(this.money, this.discount || 0)
      },
      'paid': function () {
        return this.$methods.numSub(this.money,this.$methods.numAdd(this.discount, this.pointObj.selected ? (this.pointObj.discount) || 0 : 0))
      }
    },
    mounted () {
    },
    methods: {
      /**
       * 计算可抵扣积分
       * */
      calPoint () {
        let p = this.$methods.numMulti(this.paid1, 100), discount = this.paid1
        if (this.points < p) {
          p = this.points
          discount = this.$methods.numMulti(this.points, 0.01)
        }
        this.pointObj.point = p
        this.pointObj.discount = discount
      },
      /**
       * 点击金额框
       * */
      modMoney () {
        if (!this.showPoint) {
          $('#money-text').blur()
          setTimeout(() => {
            this.showPoint = false
            this.showKeyboard = true
          }, 400)
        } else {
          this.showPoint = false
          this.showKeyboard = true
        }
      },
      /**
       * 点击积分
       * */
      modPoint () {
        if (!this.showKeyboard) {
          $('#money-text').blur()
          setTimeout(() => {
            this.showKeyboard = true
            this.showPoint = true
          }, 400)
        } else {
          this.showKeyboard = true
          this.showPoint = true
        }
        this.pointObj.point = null
        this.pointObj.discount = null
      },
      /**
       * 备注点击
       * */
      remarkClick () {
        this.showKeyboard = this.showPoint = false
        if (!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) { // ios不需要
          setTimeout(function () {
            let el = document.getElementById('money-text')
            el.scrollIntoViewIfNeeded()
            el.scrollIntoView()
          }, 400)
        }
      },
//      /**
//       * 密码输入完成
//       * */
//      doneSettle () {
//        this.showSettle = false
//        if (this.password == '123456') {
//          this.$router.push({path: '/cashier/success'})
//        } else {
//          this.$router.push({path: '/cashier/fail'})
//        }
//      },
//      /**
//       * 修改密码
//       * */
//      modPwd (v) {
//        this.password = v
//      },
      /**
       * 金额输入完成
       * */
      doneMoney () {
        if (!this.showPoint) {
          if (!this.money) return
          this.showKeyboard = false
          this.showSettle = true
        } else {
          this.showPoint = false
          this.showKeyboard = true
        }
      },
      /**
       * 改变折扣选择
       * */
      toggleDiscount (idx) {
        let d
        if (idx == 'point') {
          d = this.pointObj
        } else {
          d = this.discountList[idx]
        }
        if (d.selected) {
          d.selected = false
          this.discount = this.$methods.numSub(this.discount, d.discount)
        } else {
          d.selected = true
          this.discount = this.$methods.numAdd(this.discount, d.discount)
        }
      },
      /**
       * 金额改变
       * */
      modNum (v) {
        if (this.showPoint) {
          if (v > this.points || v > this.$methods.numMulti(this.paid1, 100)) {
            return
          } else {
            this.pointObj.point = v
            this.pointObj.discount = this.$methods.numDiv(v, 100)
            this.pointObj = $.extend({}, this.pointObj)
          }
        } else {
          this.money = v
        }
      }
    },
    components: {
      payBoard
    }
  }
</script>
