<template>
    <div>
      <head-bar title="我的地址"></head-bar>
      <div v-if="addressList[0]" class="address-body">
        <scroller style="height:100%;">
          <div class="address-content clearfix clearM" v-for="item in addressList" @click="modAddress(item)">
            <div class="clearfix">
              <p class="single-line">{{item.name}}</p>
              <p>{{item.phone}}</p>
            </div>
            <div>
              {{item.address}}{{item.detail}}
            </div>
            <span></span>
          </div>
        </scroller>
      </div>
      <div v-else class="address-no-box">
        <img src="../../../assets/img/address-lg.png">
        <p>暂无地址</p>
      </div>
      <button class="confirm-bottom-btn" @click="addAddress">新增地址</button>
      <transition name="slide">
        <router-view :address="address" v-dom-portal class="router-container"></router-view>
      </transition>
    </div>
</template>
<style lang="less" scoped>
  .address-body{
    .address-content{
      &:after{
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        top:0;
        bottom:0;
        margin: auto;
        right: 15px;
        background: url('../../../assets/img/can-edit.png') no-repeat;
      }
      >div:nth-child(2){
        line-height: 20px;
        color:#9DAEB9;
        font-size: 14px;
        margin: 10px 0 16px;
      }
      >div:first-child{
        p{
          float: left;
          color: #788A96;
          font-size: 16px;
        }
        >p:last-child{
          margin-left: 20px;
        }
        line-height: 22px;
        margin-top: 18px;
      }
      margin-left: 15px;
      border-bottom: 1px solid #f0f0f0;
      padding-right: 83px;
      position: relative;
    }
    position: absolute;
    top:44px;
    bottom:153px;
    left: 0;
    right: 0;
  }
  .address-no-box{
    text-align: center;
    img{
      width: 47px;
      height: 47px;
      margin: 191px 0 20px;
    }
    p{
      color: #9DAEB9;
      font-size: 14px;
      line-height: 20px;
    }
  }
</style>
<script>
  export default {
    data () {
      return {
        address: null,
        addressList: [{
          name: '李二狗',
          phone: 13641278888,
          address: '北京市朝阳区',
          detail: '三元桥曙光西里时间国际8号楼北座1502',
        },{
          name: '李二狗',
          phone: 13641278888,
          address: '北京市朝阳区',
          detail: '三元桥曙光西里时间国际8号楼北座1502',
        },{
          name: '李二狗',
          phone: 13641278888,
          address: '北京市朝阳区',
          detail: '三元桥曙光西里时间国际8号楼北座1502',
        },{
          name: '李二狗',
          phone: 13641278888,
          address: '北京市朝阳区',
          detail: '三元桥曙光西里时间国际8号楼北座1502',
        },{
          name: '李二狗',
          phone: 13641278888,
          address: '北京市朝阳区',
          detail: '三元桥曙光西里时间国际8号楼北座1502',
        },{
          name: '李二狗',
          phone: 13641278888,
          address: '北京市朝阳区',
          detail: '三元桥曙光西里时间国际8号楼北座1502',
        },{
          name: '李二狗',
          phone: 13641278888,
          address: '北京市朝阳区',
          detail: '三元桥曙光西里时间国际8号楼北座1502',
        },{
          name: '李二狗',
          phone: 13641278888,
          address: '北京市朝阳区',
          detail: '三元桥曙光西里时间国际8号楼北座1502',
        },{
          name: '李二狗',
          phone: 13641278888,
          address: '北京市朝阳区',
          detail: '三元桥曙光西里时间国际8号楼北座1502',
        },{
          name: '李二狗',
          phone: 13641278888,
          address: '北京市朝阳区',
          detail: '三元桥曙光西里时间国际8号楼北座1502',
        },{
          name: '李二狗',
          phone: 13641278888,
          address: '北京市朝阳区',
          detail: '三元桥曙光西里时间国际8号楼北座1502',
        },{
          name: '李二狗',
          phone: 13641278888,
          address: '北京市朝阳区',
          detail: '三元桥曙光西里时间国际8号楼北座1502',
        },{
          name: '李二狗',
          phone: 13641278888,
          address: '北京市朝阳区',
          detail: '三元桥曙光西里时间国际8号楼北座1502',
        },]
      }
    },
    mounted () {
    },
    methods: {
      addAddress () {
        this.address = null
        this.$router.push({path: this.$route.path + '/edit'})
      },
      modAddress (v) {
        this.address = v
        this.$router.push({path: this.$route.path + '/edit'})
      }
    },
    components: {}
  }
</script>
