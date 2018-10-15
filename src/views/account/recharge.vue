<template>
  <div>
    <div class="app-head white-bg">
      <span class="nav-left" @click="$router.go(-1)"></span>
      <div class="app-title">充值</div>
    </div>
    <div class="recharge-body">
      <p>充值金额</p>
      <div @click="showKeyboard=true">
        <span>¥</span>{{money}}<img src="../../assets/img/password-blink.gif">
      </div>
      <!--@click="$router.push({path:'account/choose-card'})" 选卡-->
      <div v-if="!showAddCard" :class="currentBankCard.type" @click="show1=!show1">
        <div class="backCardIcon" style="float:left;height:45px;margin: 5px 5px 0 0;">
          <img :src="currentBankCard.icon" style="width:35px;height:35px">
        </div>
        {{currentBankCard.bankName}}({{currentBankCard.bankCardTailNumber}})
        <span v-if="bankCard.length>1" class="right-arrow"></span>
      </div>
      <div v-if="showAddCard" class="add" @click="$router.push({path:$route.path.replace('/account/recharge','/account/no-card?type=withdraw')})">
        添加银行卡
      </div>
      <p style="display: none">单笔限额3万，单日限额9万</p>
      <div class="confirm-btn" @click="confirmSettle">确认充值</div>
    </div>
    <transition :name="trans">
      <router-view v-dom-portal @chooseCard="chooseCard" class="router-container"></router-view>
    </transition>
    <keyboard :initResult="money" v-model="showKeyboard" :canMin="true" :hideMask="true" :hasDec="true" @result="modNum"
              @done="confirmSettle"></keyboard>
    <pay-board v-model="showSettle" :selectCard="false" :paid="money" @hasPaid="hasPaid"></pay-board>
    <template>
      <div>
        <div v-transfer-dom>
          <popup v-model="show1">
            <!-- group already has a top border, so we need to hide header's bottom border-->
            <popup-header
              :left-text="'取消'"
              :right-text="'确定'"
              :title="'请选择银行卡'"
              :show-bottom-border="false"
              @on-click-left="show1 = false"
              @on-click-right="getCurrentBank"></popup-header>
            <group gutter="0" style="max-height: 200px;overflow-y:auto">
              <!--<radio :options="bankCardDemo" class="bankRadio">-->
                <!--<div><img src=""></div>-->
                <!--<div>123456</div>-->
              <!--</radio>-->
              <!--<popup-radio title="" :options="bankCardDemo" v-model="bankCardDemo">-->
                <!--<template slot-scope="props" slot="props" >&lt;!&ndash; use scope="props" when vue < 2.5.0 &ndash;&gt;-->
                  <!--<p>-->
                    <!--<img src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" class="vux-radio-icon"> {{ item.bankCardTailNumber }}-->
                    <!--<br>-->
                    <!--<span style="color:#666;">{{each-item.bankCardTailNumber}}</span>-->
                  <!--</p>-->
                <!--</template>-->
              <!--</popup-radio>-->
              <!--注释暂时-->
              <!--<popup-radio title="" :options="bankCardDemo" v-model="bankCardDemo">-->
                <!--<template slot-scope="props" slot="props" >&lt;!&ndash; use scope="props" when vue < 2.5.0 &ndash;&gt;-->
                  <!--<p>-->
                    <!--{{each-item}}-->
                    <!--<img src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" class="vux-radio-icon"> {{ item.bankCardTailNumber }}-->
                    <!--<br>-->
                    <!--<span style="color:#666;">{{each-item.bankCardTailNumber}}</span>-->
                  <!--</p>-->
                <!--</template>-->
              <!--</popup-radio>-->
              <!--<popup-radio title="" :options="item" v-model="bankCardDemo" v-for="(item,index) in bankCardDemo">-->
                <!--<template slot-scope="props" slot="props" >&lt;!&ndash; use scope="props" when vue < 2.5.0 &ndash;&gt;-->
                  <!--<p>-->
                    <!--<img src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" class="vux-radio-icon"> {{ item.bankCardTailNumber }}-->
                    <!--<br>-->
                    <!--<span style="color:#666;">{{each-item.bankCardTailNumber}}</span>-->
                  <!--</p>-->
                <!--</template>-->
              <!--</popup-radio>-->
            </group>
          </popup>
        </div>
      </div>
    </template>
  </div>
</template>
<style lang="less" scoped>
  .recharge-body {
    > div:nth-child(3) {
      height: 61px;
      line-height: 60px;
      margin-bottom: 5px;
      color: #788A96;
      font-size: 16px;
      border-bottom: 1px solid #f0f0f0;
    }
    > div:nth-child(2) {
      color: #788A96;
      font-size: 44px;
      height: 63px;
      line-height: 62px;
      border-bottom: 1px solid #f0f0f0;
      margin-top: 15px;
      img {
        height: 44px;
        position: relative;
        top: 5px;
        width: 2px;
      }
      span {
        font-size: 25px;
        margin-right: 5px;
      }
    }
    p {
      line-height: 20px;
      font-size: 14px;
      color: #9DAEB9;
    }
    padding: 30px 15px 0;
  }

  .backCardIcon {
    height: 45px;
    float: left;
    margin-right: 6px;
    padding-top: 5px;
    box-sizing: border-box;
  }
</style>
<script>
  import {apiService} from "@/utils/apiservice.js";
  import payBoard from '../../components/common/payboard.vue'
  import {PopupHeader, Popup, TransferDom, Group, Radio} from 'vux'
  import {PopupRadio} from 'vux'
  export default {
    data() {
      return {
        showAddCard:false,
        apiService: null,
        vue: null,
        money: null,
        smsCode: '',//输入的短信验证码
        signNo: '',//快捷签约号
        tradeNo: '',//交易流水号
        trans: 'slide',
        showKeyboard: false,
        showSettle: false,
        mobile: '',
        bankCard: [],
        currentBankCard: {},//当前银行卡
        show1: false,
        bankCardDemo: []
      }
    },
    directives: {
      TransferDom
    },
    beforeRouteUpdate(to, from, next) {
      if (to.path == '/account/recharge' || from.path == '/account/recharge') {
        this.trans = 'slide'
      } else {
        this.trans = ''
      }
      this.$nextTick(() => {
        next()
      })
    },
    mounted() {
      this.apiService = apiService;
      this.vue = this;
      apiService.checkRecharge(this, this.checkRechargeCallBack)

    },
    methods: {
      checkRechargeCallBack(obj) {
        if (obj.data.code == '00000') {
          var dataParmas = JSON.stringify({"encrptCardNo": ""})
          apiService.rechargeIndex(this, dataParmas, this.rechargeIndexCallback)
        } else {
          this.showAddCard=true
          //00007 未实名 实名模块走完后，需自动跳转到充值主页
          window.HMO_APP.$vux.toast.show({
            text: obj.data.msg
          })
          return
        }
      },
      getCurrentBank() {
        this.show1 = false;
      },
      rechargeIndexCallback(obj) {
        if (obj.data.code == "00000") {
          this.bankCard = obj.data.data.rechargeCardList;
          this.currentBankCard = this.bankCard[0]
          this.mobile = this.currentBankCard.bankcardTel  //手机号
          var  backlist = obj.data.data.rechargeCardList
          for(var i=0;i<3;i++){
            this.bankCardDemo.push(backlist[i].bankCardTailNumber)
          }

        }
      },
      hasPaid() {
      },
      apiServiceCallback(obj) {
        console.log(obj)
        if (obj.data.code == "00000") {
          this.$router.push({'path': '/account/success'})
        }
      },
      toggleP(e) {
        let tar = $(e.target)
        if (tar.hasClass('active')) {
          tar.removeClass('active').prev().attr('type', 'password')
        } else {
          tar.addClass('active').prev().attr('type', 'text')
        }
      },
      /**
       * 确认充值
       * */
      confirmSettle() {
        let _this = this
        if (this.money > 30000) {
          window.HMO_APP.$vux.toast.show({
            text: "单笔最高为30000"
          })
          this.money = ""
          return
        }
        if (this.money > 0) {
          this.showKeyboard = false
          this.$router.push({
            path: this.$route.path + '/identify/person',
            query: {
              mobile: this.mobile,
              money: this.money,
              bankCard: JSON.stringify(this.bankCard),
              forgetPassword: 2 //充值认证
            }
          })
        }
      },
      /**
       * 修改金额
       * */
      modNum(v) {
        this.money = v
      },
      chooseCard(item) {
        this.bankCard = item
      }
    },
    components: {
      payBoard,
      PopupHeader,
      Popup,
      Group,
      Radio,
      PopupRadio
    }
  }
</script>
