<template>
    <div>
      <div class="app-head white-bg">
        <span class="nav-left" @click="$router.go(-1)"></span>
        <div class="app-title">选择银行卡</div>
      </div>
      <div class="bank-body">
        <scroller>
          <div @click="selectCard(item)" v-for="item in bankList" class="bank-item border-bottom-1" :key="item.id">
            <!-- <div :class="item.type"></div> -->
            <div class="backicon"><img :src="item.icon" alt="" style="width:100%;height:100%"></div>
            <span>{{item.bankName}}({{item.cardNoEnd}})</span>
            <span class="right-arrow"></span>
          </div>
        </scroller>
        <!--<p v-if="isPhone" class="bank-footer">请使用电脑浏览器进行充值</p>-->
      </div>
    </div>
</template>
<style lang="less" scoped>
  .bank-footer{
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
  }
  .bank-body{
    padding-left: 15px;
  }
  .bank-item{
    >div{
      float: left;
      width: 40px;
      height: 40px;
      margin: 15px 10px 0 0 ;
      border-radius: 2px;
      // background: url('../../assets/img/bank-abc.png') no-repeat center;
      background-size: 26px 26px;
      box-shadow: 1px 1px 1px rgba(178, 178, 178, 0.15);
    }
    >span{
      margin-top: 34px;
    }
    height:81px;
    line-height: 80px;
    padding-right: 15px;
  }
</style>
<script>
  import { apiService } from "@/utils/apiservice.js";
  export default {
    data () {
      return {
        isPhone: !!navigator.userAgent.match(/Mobile/i),
        bankList: []
      }
    },
    mounted () {
       //获取绑定银行卡
      this.getBankList();

    },
    methods: {
      //获取绑定银行卡
      getBankList(){
        var data=JSON.stringify({"jrId":""})
        apiService.getQueryList(this,data,this.getBankListCallBack)
      },
      getBankListCallBack(obj){
       if(obj.status==200){
           if(obj.data.code=="00000"){
              this.bankList=obj.data.data.cardList
         }
       }

      },
      selectCard (item) {
        if (this.$route.path.indexOf('recharge') !== -1) {
          this.$emit('chooseCard', item)
          this.$router.go(-1)
        } else {
          this.$router.push({path: '/account/recharge', query: {item: JSON.stringify(item)}})
        }
      }
    },
    components: {}
  }
</script>
