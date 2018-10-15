<template>
  <div class="gray-body">
    <div class="app-head white-bg">
      <span class="nav-left" @click="back"></span>
      <div class="app-title">银行卡</div>
    </div>
    <div class="card-body">
      <!-- <div class="card-item" v-for="item in cardList" @click="(card = item) && ($router.push({path:$route.path+'/detail'}))"> -->
      <div class="card-item" v-for="item in cardList" v-if="cardList.length>0"  @click="unbindCard(item.cardId,item)">
        <div>
          <!-- <div :class="item.bankCode"></div> -->
          <img :src="item.icon" style="margin-top:10px;width:45px;height:45px">
          <p v-if="item.cardTypeName" :class="item.cardTypeName=='信用卡'?'credit':''">{{item.cardTypeName.slice(0,1)}}</p>
        </div>
        <div class="clearM">
          <p>{{item.bankName}}</p>
          <p>{{item.cardTypeName}}</p>
          <p>{{item.cardNoStart}}*********{{item.cardNoEnd}}</p>
        </div>
      </div>
      <div class="confirm-btn" @click="$router.push({path:$route.path+'/add'})">添加银行卡</div>
    </div>
      <transition name="slide">
        <router-view v-dom-portal  class="router-container"></router-view>
      </transition>
  </div>
</template>
<style lang="less" scoped>
  .card-item {
    > div:last-child {
      margin-left: 70px;
      > p:first-child {
        font-size: 16px;
        color: #788A96;
        line-height: 23px;
        margin: 18px 0 1px 0;
      }
      > p:nth-child(2) {
        margin-bottom: 15px;
        line-height: 20px;
        color: #9DAEB9;
        font-size: 14px;
      }
      > p:nth-child(3) {
        color: #DD0011;
        font-size: 18px;
        line-height: 27px;
      }
    }
    > div:first-child {
      > div {
        background-size: 50px 50px;
        width: 50px;
        height: 50px;
        margin: 15px 0 10px;
      }
      p {
        text-align: center;
        line-height: 21px;
        font-size: 15px;
        color: #864D4D;
        &.credit {
          color: #22483F;
        }
      }
      float: left;
      margin: 0 10px;
      width: 50px;
    }
    height: 120px;
    background: #fff;
    margin: 10px 15px 0;
  }
</style>
<script>
  import {apiService} from "@/utils/apiservice.js";
  import {config} from '@/utils/config'
  export default {
    data() {
      return {
        cardList: [
          {
            name: '工商银行',
            type: 'icbc',
            cType: '储蓄卡',
            num: '**** **** **** 6868',
            nick: '萧娴娴',
            phone: '13641272349',
            id: '11111111'
          }
        ],
        card: null
      }
    },
    beforeCreate(){

    },
    mounted() {
      var data = JSON.stringify({"jrId": ""})
      apiService.getQueryList(this, data, this.getQueryListCallback)
    },
    methods: {
      back(){
        window.location.reload()
        window.location.replace(config.domainPersonal+'/#/account/index')
      },
      getQueryListCallback(obj) {
        let _this=this
        if(obj.data.code=='00000'){
          if(obj.data.data.cardList.length>0){
            _this.cardList = obj.data.data.cardList
          }else{
            this.$router.push({'path': this.$route.path.replace('/account/card', '/account/no-card')});
          }
        }
      },
      unbindCard(cardId,item){
        this.$router.push({path:'/account/card/detail',query:{cardId:cardId,card:JSON.stringify(item)}})
      }
    },
    components: {}
  }
</script>
