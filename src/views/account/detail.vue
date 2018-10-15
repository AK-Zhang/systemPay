<template>
  <div>
    <div class="headerbox">
      <div class="app-head white-bg">
        <span class="nav-left" @click="back"></span>
        <div class="app-title">资金明细</div>
      </div>
      <div class="account-detail-filter-box clearfix">
        <div class="filter-btn" :class="{active:showMask}" @click="filterClick">筛选</div>
        <!-- <label for="search-input" class="search-btn" @click="searchClick">搜索</label> -->
        <div class="filter-content">
          <p>筛选</p>
          <div class="flex-container">
            <span v-for="(item,index) in flexItemList" class="flex-item-1" :class="currentIndex==index?'active':''"
                  :key="item.id" @click="felxActive(item,index)">{{item}}</span>
          </div>
          <!--<div class="flex-containerBtn flex-container" style="margin: 0 15px">-->
               <!--<span v-for="(item,index) in statusItemList" class="flex-item-1 statusBtn" :class="currentIndexBtn==index?'activeBtn':''"-->
                     <!--:key="item.id" @click="felxStatusActive(item,index)">{{item}}</span>-->
          <!--</div>-->
          <div class="filter-confirm" @click="filterClickConfirm">确认</div>
        </div>
      </div>
      <div class="account-detail-date">
        <div class="date-btn" @click="$router.push({path:($route.path + '/time')})"></div>
        <div>
          <!-- <p>本月</p>
          <p>收入 ¥9892.00 支出 ¥800.00</p> -->
        </div>
      </div>
    </div>
    <div style="height:133px;width:100%"></div>
    <div class="account-detail-body" id="account-detail-body">
      <!-- <scroller> -->

      <div class="account-detail-content">


        <div v-for="item in records" :key="item.id" style="overflow:auto">
          <div class="account-detail-item" v-if="item.amountIO=='I'">
            <img src="../../assets/img/male-icon.png">
            <span class="plus">{{item.amount}}</span>
            <div>
              <p class="single-line">{{item.ioDesc}}</p>
              <p>{{item.transTime|fomatTime}}</p>
            </div>
          </div>
          <div class="account-detail-item" v-if="item.amountIO=='O'">
            <img src="../../assets/img/female-icon.png">
            <span class="minus">-{{item.amount}}</span>
            <div>
              <p>{{item.ioDesc}}</p>
              <p>{{item.transTime|fomatTime}}</p>
            </div>
          </div>
          <div class="border-bottom-1" style="margin-left: 85px;"></div>
        </div>
      </div>
      <!-- </scroller> -->
    </div>
    <div class="mask" v-if="showMask" @click="maskClick">
    </div>
    <search v-model="showSearch" placeholder="输入账单相关信息"></search>
    <transition name="slide">
      <router-view v-dom-portal @timeConfirm="timeConfirm" class="router-container"></router-view>
    </transition>

    <!-- 加载更多 -->
    <!-- <div class="loadmore-icon">加载更多<i class="fa fa-cog fa-spin"></i></div> -->
    <div class="loading" v-show="showlaoding">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw margin-bottom"></i>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .headerbox {
    height: 133px;
    width: 100%;
    position: fixed
  }

  .account-detail-body {
    height: 630px;
    overflow-y: scroll
  }

  .mask {
    top:272px;
   // top: 320px;
  }

  .account-detail-item {
    > img {
      float: left;
      width: 50px;
      height: 50px;
    }
    > span {
      font-size: 20px;
      line-height: 50px;
      height: 50px;
      width: 120px;
      text-align: right;
      &.plus {
        color: #FE9D32;
      }
      &.minus {
        color: #5A4B41;
      }
      float: right;
    }
    > div {
      margin: 0 120px 0 70px;
      > p:first-child {
        line-height: 24px;
        margin-bottom: 8px;
        color: #788A96;
        font-size: 17px;
      }
      > p:last-child {
        line-height: 18px;
        color: #9DAEB9;
        font-size: 13px;
      }
    }
    margin: 20px 15px;
    height: 50px;
  }

  .account-detail-date {
    > div:last-child {
      > p:first-child {
        line-height: 20px;
        font-size: 14px;
        color: #788A96;
        margin-bottom: 2px;
      }
      > p:last-child {
        line-height: 17px;
        font-size: 12px;
        color: #9DAEB9;
      }
      margin-right: 49px;
    }
    .date-btn {
      width: 19px;
      height: 19px;
      margin-top: 12px;
      float: right;
      background: url('../../assets/img/calendar-icon.png') no-repeat;
    }
    height: 49px;
    padding: 5px 15px;
    background-color: #f9f9f9;
  }

  .account-detail-filter-box {
    .filter-content {
      > div:nth-child(4) {
        //margin: 0 15px;
        // height: 35px;
        > div {
          border: 1px solid #f0f0f0;
          border-radius: 2px;
          height: 35px;
          width: 140px;
          padding-left: 11px;
          position: relative;
          color: #657784;
          font-size: 14px;
          span {
            position: absolute;
            line-height: 33px;
          }
          input {
            width: 100%;
            height: 33px;
            line-height: 23px;
            padding: 5px 0 5px 16px;
          }
        }
        > div:first-child {
          float: left;
        }
        > div:nth-child(2) {
          float: right;
        }
        > span {
          display: block;
          margin: 17px auto;
          height: 1px;
          width: 18px;
          background-color: #f0f0f0;
        }
        /*margin-bottom: 40px;*/
      }
      p {
        margin: 20px 15px 10px;
        color: #788A96;
        font-size: 16px;
        line-height: 23px;
      }
      > div:nth-child(2) {
        span {
          color: #9DAEB9;
          height: 35px;
          line-height: 35px;
          text-align: center;
          border-radius: 2px;
          background: rgba(250, 250, 251, 1);
          &:not(:first-child) {
            margin-left: 8px
          }
          &.active {
            background-color: #FCAD57;
            color: #fff;
          }
        }
        margin: 0 15px;
      }
      .filter-confirm {
        height: 49px;
        line-height: 49px;
        text-align: center;
        background-color: #FCAD57;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        margin-top: 20px;
      }
      position: absolute;
      top: 40px;
      left: 0;
      width: 100%;
      height: 190px;
      background-color: #fff;
      display: none;
      z-index: 10;
    }
    position: relative;
    line-height: 20px;
    height: 40px;
    padding: 10px 15px;
    font-size: 14px;
    color: #788A96;
    .filter-btn {
      &.active {
        color: #FCAD57;
        background-image: url("../../assets/img/filter-icon-active.png");
      }
      float: left;
      padding-right: 18px;
      background: url("../../assets/img/filter-icon.png") no-repeat right center;
    }
    .search-btn {
      float: right;
      padding-left: 18px;
      background: url("../../assets/img/search-icon.png") no-repeat 0 center;
    }
  }

  .gray-bg {
    height: 100%;
  }
  .statusBtn{
    border-radius: 2px;
    background: #fafafb;
    color: #9DAEB9;
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin-top: 15px;
  }
  .activeBtn{
    background-color: #FCAD57;
    color: #ffffff;
  }
  flex-containerBtn span:not(:first-child){
    margin-left: 8px;
  }
</style>
<script>
  import {apiService} from "@/utils/apiservice.js";
  import search from '../../components/common/search.vue'
  import {config} from '@/utils/config'

  export default {
    data() {
      return {
        showSearch: false,
        showMask: false,
        value: 'true',
        pageSize: '10',//默认10条
        amountIO: 'I',//默认A全部
        timeStamp: '',//分页查询，首次为空
        records: [],//交易记录
        flexItemList: [ '充值', '提现'],
        statusItemList:['全部','已完成','失败','进行中'],
        lowMoney: '',
        upMoney: '',
        showDiv: true,
        currentIndex: 0,
        currentIndexBtn:'0',
        startTime: '',
        endTime: '',
        showlaoding: true,
        firstFilterClick: true, //首次筛选设置为false
        bankId:'',
        startTimeStamp:'',
        endTimeStamp:'',
      }
    },
    created(){
      this.bankId=this.$router.query.bankId
    },
    mounted() {
      var data=new Date();
      data.setDate(1);
      data.setHours(0);
      data.setSeconds(0);
      data.setMinutes(0);
      this.startTime=data.getTime()
      var endTime=new Date().getTime()
      this.endTime=endTime
      window.addEventListener('touchmove', e => e.preventDefault())
      let _this = this;
      //获取交易信息
      this.getRecords(this.amountIO, this.pageSize, this.timeStamp, this.startTime, this.endTime)
      var scrollDiv = document.getElementById('account-detail-body');
      scrollDiv.addEventListener('scroll', function () {
        if (scrollDiv.scrollTop + 630 >= $(".account-detail-content").height()) {
          if (_this.firstFilterClick) {
            _this.getData()
          }
        }
      });
    },
    methods: {
      back(){
        window.location.reload()
        window.location.replace(config.domainPersonal+'/#/account/index')
      },
      //滑动到底部加载
      getData() {
        this.getRecords(this.amountIO, this.pageSize, this.timeStamp, this.startTime, this.endTime);
      },
      timeConfirm(start, end) {
        this.records = [];
        this.startTime = start.start;
        this.endTime = start.end;
        this.getRecords(this.amountIO, this.pageSize, this.timeStamp, this.startTime, this.endTime);
      },
      felxStatusActive (item, index){
        this.currentIndexBtn = index
        if (item == "全部") {
          this.status = '0'
        } else if (item == "已完成") {
          this.status = '1'
        } else if (item == "失败") {
          this.status = '2'
        }else if (item == "进行中") {
          this.status = '3'
        }
      },
      felxActive(item, index) {
        this.currentIndex = index
        if (item == "充值") {
          this.amountIO = 'I'
        } else if (item == "提现") {
          this.amountIO = 'O'
        }
      },
      getRecords(amountIO, pageSize, timeStamp, startTime, endTime) {
        var data = {
          "amountIO": amountIO,
          "pageSize": pageSize,
          "timeStamp": timeStamp,
          "startTimeStamp": startTime,
          "endTimeStamp": endTime
        }
        apiService.records(this, data, this.recordsCallback)
      },
      recordsCallback(obj) {
        if (obj.data.code == "00000") {
          this.firstFilterClick = true
          this.records = this.records.concat(obj.data.data.records);
          this.timeStamp = obj.data.data.timeStamp
        }
      },
      searchClick() {
        this.showSearch = true
        this.$nextTick(() => {
          $('#search-input').focus()
        })
      },
      filterClickConfirm() {
        this.filterClick()
        this.firstFilterClick = false;
        this.records = [];
        this.getRecords(this.amountIO, this.pageSize, this.timeStamp, this.startTime, this.endTime);
      },
      filterClick() {

        if (this.showMask) {
          this.showMask = false
          $('.filter-content').slideUp('fast')

        } else {
          $('.filter-content').slideDown('fast')
          this.showMask = true
        }

      },
      maskClick() {
        this.filterClick()
      }
    },
    components: {
      search
    }
  }
</script>
