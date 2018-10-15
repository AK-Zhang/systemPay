<template>
    <div class="gray-body">
      <head-bar title="联系人信息"></head-bar>
      <scroller height="-44px">
        <div class="contact-detail-body">
          <div class="contact-detail-header white-bg clearM">
            <img src="../../../assets/img/female-icon.png">
            <p>
              <img src="../../../assets/img/female.png">
              <span>李美丽</span>
            </p>
            <p>越努力越幸运</p>
            <div class="contact-detail-btn-box">
              <button>转账</button>
              <button>留言</button>
            </div>
            <div>
              <div class="contact-detail-line">
                <span>ID</span>
                <div>15627633676</div>
              </div>
              <div class="contact-detail-line">
                <span>昵称</span>
                <div>简简单单</div>
              </div>
              <div class="contact-detail-line">
                <span>姓名</span>
                <div>萧小小</div>
              </div>
              <div class="contact-detail-line">
                <span>性别</span>
                <div>女</div>
              </div>
              <div v-show="showDetails">
                <div class="contact-detail-line">
                  <span>标签</span>
                  <div>
                    <span class="tag meishu">美术</span>
                  </div>
                </div>
                <div class="contact-detail-line">
                  <span>电话</span>
                  <div>13641279898</div>
                </div>
                <div class="contact-detail-line">
                  <span>籍贯</span>
                  <div>北京市通州区永顺路</div>
                </div>
                <div class="contact-detail-line">
                  <span>常住</span>
                  <div>北京市通州区永顺路</div>
                </div>
                <div class="border-line"></div>
                <div class="contact-detail-line">
                  <span>身份证</span>
                  <div>212361617137652575</div>
                </div>
                <div class="contact-detail-line">
                  <span>银行卡</span>
                  <div>6425618763873264828</div>
                </div>
                <div class="border-line"></div>
                <div class="contact-detail-line">
                  <span>来源</span>
                  <div>添加/IDxxx邀请/支付添加</div>
                </div>
                <div class="contact-detail-line">
                  <span>分组</span>
                  <div>设计部</div>
                </div>
              </div>
              <div class="contact-detail-toggle" @click="showDetails=!showDetails">
                {{showDetails?'收起':'显示更多'}}
              </div>
            </div>
          </div>
          <div class="contact-detail-remark white-bg">
            <div v-if="!remark&&!des" class="link-line" @click="$router.push({path: $route.path + '/details'})">
              备注他的信息
            </div>
            <div v-if="remark" class="link-line">
              <span>备注名</span>
              <div>{{remark}}</div>
            </div>
            <div v-if="des" class="link-line">
              <span>描述</span>
              <div>{{des}}</div>
            </div>
          </div>
        </div>
      </scroller>
      <transition name="slide">
        <router-view :remark="remark" :des="des" @saveInfo="saveInfo" v-dom-portal class="router-container"></router-view>
      </transition>
    </div>
</template>
<style lang="less" scoped>
  .contact-detail-body{
    .contact-detail-remark{
      margin: 10px 0 20px;
      >div{
        line-height: 49px;
        height: 49px;
        color: #788A96;
        font-size: 14px;
        >span:first-child{
          float: left;
          width: 65px;
          color: #9DAEB9;
        }
        >div{
          margin-left: 70px;
        }
      }
    }
    .border-line{
      height: 1px;
      background: #f5f5f5;
      margin: 21px 0;
    }
    .contact-detail-toggle{
      height: 51px;
      line-height: 50px;
      border-top:1px solid #f5f5f5;
      color: #788A96;
      font-size: 14px;
      text-align: center;
    }
    .contact-detail-line{
      line-height: 20px;
      margin-bottom: 15px;
      font-size: 14px;
      .tag{
        &.meishu{
          border-color: #FFBB5F;
          color: #D6813E;
        }
        width: 40px;
        height: 18px;
        line-height: 16px;
        text-align: center;
        border: 1px solid #fff;
        font-size: 12px;
        border-radius: 3px;
        display: inline-block;
        margin-right: 10px;
      }
      >span:first-child{
        float: left;
        width: 70px;
        color: #9DAEB9;
      }
      >div{
        margin-left: 75px;
        color: #788A96;
      }
    }
    .contact-detail-btn-box{
      padding: 0 15px;
      margin-bottom: 31px;
      button:first-child{
        color: #fff;
        background: #FCAD57;
        margin-right: 6%;
      }
      button:last-child{
        color: #FCAD57;
      }
      button{
        border-radius: 5px;
        width: 46%;
        height: 49px;
        font-size: 16px;
        border:1px solid #FCAD57;
      }
    }
    .contact-detail-header{
      padding: 0 15px;
      >img{
        width: 60px;
        height: 60px;
        margin: 30px auto 5px;
        display: block;
      }
      >p{
        font-size: 14px;
        line-height: 20px;
        text-align: center;
      }
      >p:nth-of-type(1){
        color: #788A96;
      }
      >p:nth-of-type(2){
        color: #9DAEB9;
        margin: 6px 0 24px;
      }
    }
  }
</style>
<script>
  export default {
    data () {
      return {
        showDetails: false,
        remark: null,
        des: null
      }
    },
    mounted () {
    },
    methods: {
      saveInfo (obj) {
        if (obj.remark) this.remark = obj.remark
        if (obj.des) this.des = obj.des
      }
    },
    components: {}
  }
</script>
