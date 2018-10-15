<template>
    <div>
      <div class="app-head1">
        <span class="nav-left" @click="$router.go(-1)"></span>
        <div class="app-title1">收款记录</div>
        <div class="nav-right date-btn" @click="$router.push({path:($route.path + '/time')})"></div>
      </div>
      <div class="record-body yellow-bg">
        <p>今日全部收入</p>
        <h1>3800.00</h1>
        <h6>共1人 计3笔</h6>
      </div>
      <scrller class="record-list">
        <div class="record-item">
          <img src="../../assets/img/male-icon.png">
          <div class="border-bottom-1">
            <span>+1900</span>
            <p>王晓明</p>
            <p>今天 09:11</p>
          </div>
        </div>
        <div class="record-item">
          <img src="../../assets/img/male-icon.png">
          <div class="border-bottom-1">
            <span>+1900</span>
            <p>王晓明</p>
            <p>今天 09:11</p>
          </div>
        </div>
        <div class="record-item">
          <img src="../../assets/img/male-icon.png">
          <div class="border-bottom-1">
            <span>+1900</span>
            <p>王晓明</p>
            <p>今天 09:11</p>
          </div>
        </div>
      </scrller>
      <transition name="slide">
        <router-view  v-dom-portal class="router-container"></router-view>
      </transition>
    </div>
</template>
<style lang="less" scoped>
  .date-btn{
    width:19px;
    height: 19px;
    background: url('../../assets/img/date-btn1.png') no-repeat 0 2px;
    right: 15px!important;
  }
  .record-list{
    .record-item{
      >div{
        >p:nth-child(2){
          color: #788A96;
          font-size: 17px;
          line-height: 24px;
          margin: 0 100px 7px 0;
        }
        >p:last-child{
          color: #9DAEB9;
          font-size: 13px;
          line-height: 19px;
          margin-right: 100px;
        }
        >span{
          float: right;
          text-align: right;
          width: 100px;
          line-height: 50px;
          font-size: 20px;
          color: #FE9D32;
        }
        margin-left: 85px;
        height: 91px;
        padding: 20px 15px 20px 0;
      }
      >img{
        width: 50px;
        height: 50px;
        margin: 20px 20px 20px 15px;
        float: left;
      }
      height: 91px;
    }
    position: absolute;
    top:165px;
    left:0;
    right: 0;
    bottom: 0;
  }
  .record-body{
    >h1{
      color: #fff;
      font-size: 34px;
      line-height: 48px;
    }
    >h6{
      font-size: 14px;
      color: #fff;
      margin: 10px 0 15px 0;
      line-height: 20px;
    }
    >p{
      font-size: 13px;
      color: #FFE5CA;
      line-height: 19px;
      margin: 6px 0 3px 0;
    }
    padding:44px 15px 0;
    height: 165px;
  }
</style>
<script>
  export default {
    data () {
      return {}
    },
    mounted () {
    },
    methods: {},
    components: {}
  }
</script>
