<template>
    <div>
      <div class="app-head white-bg">
        <span class="nav-left" @click="$router.go(-1)"></span>
        <div class="app-title">银行卡</div>
      </div>
      <div class="card-body">
        <div class="card-item">
          <div>
            <div :class="card.bankCode"><img :src="card.icon" style="width:100%;height:100%"></div>
          </div>
          <div class="clearM" :data-id="card.id">
            <p>{{card.bankName}}</p>
            <p>{{card.cardTypeName}}</p>
            <p>{{card.cardNoStart}}*********{{card.cardNoEnd}}</p>
          </div>
        </div>
        <!--<p style="margin:15px 0 10px ">持卡人姓名 <span>{{card.nick}}</span></p>-->
        <p style="margin-bottom: 20px">预留手机号 <span>{{card.mobile}}</span></p>
        <p style="font-size: 12px">如以上信息发生更变，请解绑后重新绑定</p>
        <div class="confirm-btn" @click="showConfirm=true">解除绑定</div>
      </div>
      <!--<confirm v-model="showConfirm" msg="您确认要解绑该银行卡吗？" @on-cancel="onCancel" @on-confirm="confirm"></confirm>-->
      <!--@confirmFun="deleteCard"-->
      <div v-show="showConfirm" >
        <div data-v-c23a71b2="" class="confirm-box">
          <p data-v-c23a71b2="">您确认要解绑该银行卡吗？</p>
          <div data-v-c23a71b2="" class="user-no-select" @click="deleteCard">确定</div>
          <div data-v-c23a71b2="" class="user-no-select" @click="cancelCard">取消</div>
        </div>
        <div data-v-c23a71b2="" class="mask">

        </div>
      </div>
    </div>
</template>
<style lang="less" scoped>
  .card-body{
    >p{
      >span{
        color: #788A96;
        margin-left: 20px;
      }
      padding-left: 15px;
      font-size: 15px;
      line-height: 21px;
      color: #9DAEB9;
    }
  }
  .card-item{
    >div:last-child{
      margin-left: 70px;
      >p:first-child{
        font-size: 16px;
        color: #788A96;
        line-height: 23px;
        margin: 18px 0 1px 0;
      }
      >p:nth-child(2){
        margin-bottom: 15px;
        line-height: 20px;
        color:#9DAEB9;
        font-size: 14px;
      }
      >p:nth-child(3){
        color: #DD0011;
        font-size: 18px;
        line-height: 27px;
      }
    }
    >div:first-child{
      >div{
        /*&.abc{*/
          /*background-image: url("../../assets/img/bank-abc.png");*/
        /*}*/
        /*&.icbc{*/
          /*background-image: url("../../assets/img/bank-icbc.png");*/
        /*}*/
        /*&.cbc{*/
          /*background-image: url("../../assets/img/bank-cbc.png");*/
        /*}*/
        /*&.bc{*/
          /*background-image: url("../../assets/img/bank-bc.png");*/
        /*}*/
        /*background: url('../../assets/img/bank-abc.png') no-repeat center;*/
        background-size: 50px 50px;
        width: 50px;
        height: 50px;
        margin: 15px 0 10px;
      }
      p{
        text-align: center;
        line-height: 21px;
        font-size: 15px;
        color: #864D4D;
        &.credit{
          color: #22483F;
        }
      }
      float: left;
      margin: 0 10px;
      width: 50px;
    }
    height: 120px;
    margin: 10px 15px 0;
  }
  //模态框
  .confirm-box {
    color: #788A96;
    font-size: 16px;
    background: #fff;
    border-radius: 10px;
    height: 200px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 15px;
    right: 15px;
    z-index: 10;
    margin: auto;
  }
  .confirm-box > p{
    line-height: 23px;
    margin-top: 64px;
    text-align: center;
    padding: 0 15px;
  }
  .confirm-box > div{
    height: 49px;
    line-height: 48px;
    width: 50%;
    position: absolute;
    bottom: 0;
    text-align: center;
    cursor: pointer;
    border-top: 1px solid #f0f0f0;
  }
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.27);
    z-index: 9;
    -webkit-transition: all .2s;
    transition: all .2s;
  }
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.27);
    z-index: 9;
    -webkit-transition: all .2s;
    transition: all .2s;
  }
</style>
<script>
 import { apiService } from "@/utils/apiservice.js";
  export default {
    data () {
      return {
        showConfirm: false,
      }
    },
    created(){
      this.card=JSON.parse(this.$route.query.card)
    },
    mounted () {
    },
    methods: {
      cancelCard(){
        this.showConfirm=false
      },
      deleteCard () {
        this.showConfirm=false
        let data="cardId="+this.card.cardId;
        apiService.unbind(this,data,this.unbindCallBack)
      },
      unbindCallBack(obj){
        window.location.reload()
        this.$router.push({'path': this.$route.path.replace('/account/card/detail', '/account/card')});
      }
    },
    components: {}
  }
</script>
