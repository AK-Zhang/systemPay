<template>
    <div>
      <head-bar title="管理分组"></head-bar>
      <div class="group-detail-body">
        <scroller height="-44px">
          <box-input title="分组名称" placeholder="请输入分组名称" v-model="name"></box-input>
          <!--<div class="parent-group-box clearfix">-->
            <!--<p>上级分组</p>-->
            <!--<div @click="$router.push({path: $route.path + '/group'})">-->
              <!--默认分组-->
            <!--</div>-->
          <!--</div>-->
          <div class="group-member-box clearfix">
            <p>选择成员</p>
            <div>
              <div>
                <img src="../../../assets/img/female-icon.png">
                <p class="single-line">景天</p>
              </div>
              <div>
                <img src="../../../assets/img/female-icon.png">
                <p class="single-line">景天</p>
              </div>
              <div>
                <img src="../../../assets/img/female-icon.png">
                <p class="single-line">景天</p>
              </div>
              <div>
                <img src="../../../assets/img/female-icon.png">
                <p class="single-line">景天</p>
              </div>
              <div>
                <img src="../../../assets/img/female-icon.png">
                <p class="single-line">景天</p>
              </div>
              <div>
                <img src="../../../assets/img/female-icon.png">
                <p class="single-line">景天</p>
              </div>
              <div>
                <img src="../../../assets/img/female-icon.png">
                <p class="single-line">景天</p>
              </div>
              <div @click="$router.push({path: $route.path + '/member'})">
                <img src="../../../assets/img/group-member-add.png">
              </div>
            </div>
          </div>
          <button class="confirm-btn">确认</button>
        </scroller>
      </div>
      <transition name="slide">
        <router-view :choose="true" :group="group" v-dom-portal class="router-container"></router-view>
      </transition>
    </div>
</template>
<style lang="less" scoped>
  .group-member-box{
    padding-left: 15px;
    >div{
      >div{
        >img{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-bottom: 6px;
        }
        >p{
          color: #9DAEB9;
          font-size: 13px;
          line-height: 19px;
        }
        float: left;
        width: 50px;
        height:75px;
        text-align: center;
        margin:0 16px 12px 0;
      }
    }
    >p{
      color: #788A96;
      font-size: 14px;
      line-height: 20px;
      margin: 26px 0 15px;
    }
  }
  /*.parent-group-box{*/
    /*color: #788A96;*/
    /*font-size: 14px;*/
    /*padding-left: 15px;*/
    /*>p:first-child{*/
      /*line-height: 20px;*/
      /*margin: 30px 0 15px;*/
    /*}*/
    /*>div{*/
      /*&:after{*/
        /*content: '';*/
        /*position: absolute;*/
        /*width: 8px;*/
        /*height: 5px;*/
        /*margin: auto;*/
        /*top:0;*/
        /*bottom:0;*/
        /*right: 10px;*/
        /*background: url('../../../assets/img/choose-toggle.png') no-repeat;*/
      /*}*/
      /*position: relative;*/
      /*height: 25px;*/
      /*line-height: 25px;*/
      /*padding: 0 25px 0 10px;*/
      /*background: #eee;*/
      /*border-radius: 3px;*/
      /*float: left;*/
    /*}*/
  /*}*/
</style>
<script>
  export default {
    props: ['group'],
    data () {
      return {
        name: ''
      }
    },
    mounted () {
    },
    methods: {},
    components: {}
  }
</script>
