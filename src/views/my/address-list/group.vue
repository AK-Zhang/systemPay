<template>
    <div>
      <head-bar title="管理分组"></head-bar>
      <div class="address-group-body" :class="{'is-choose':choose}">
        <scroller height="-104px">
          <div class="address-group-box">
            <div class="link-line" v-for="item in groupList" @click="editGroup">
              {{item.name}} <img src="../../../assets/img/eidt-icon.png" style="margin-left: 10px">
            </div>
          </div>
          <div class="clearM address-list-line" v-for="item in memberList">
            <img src="../../../assets/img/female-icon.png">
            <div>
              <p>{{item.nick}}</p>
              <p>{{item.name}}</p>
            </div>
          </div>
        </scroller>
      </div>
      <div class="address-group-foot">
        <div  @click="addMember">
          <img src="../../../assets/img/add-icon.png">
          成员
        </div>
        <div  @click="addGroup(null)">
          <img src="../../../assets/img/new-group-icon.png">
          分组
        </div>
      </div>
      <transition name="slide">
        <router-view :group="group" v-dom-portal class="router-container"></router-view>
      </transition>
    </div>
</template>
<style lang="less" scoped>
  .address-list-line{
    >img{
      float: left;
      width: 40px;
      height: 40px;
      margin-top: 10px;
    }
    >div{
      >p:first-child{
        color: #788A96;
        font-size: 14px;
        line-height: 20px;
        margin: 10px 0 3px;
      }
      >p:nth-child(2){
        color: #9DAEB9;
        font-size: 13px;
        line-height: 19px;
      }
      margin: 0 45px 0 53px;
    }
    height: 60px;
    padding:0 15px;
    /*margin-left: 15px;*/
  }
  .address-group-foot{
    >div{
      img{
        vertical-align: middle;
      }
      &:first-child{
        border-right: 1px solid #f0f0f0;
      }
      color: #788A96;
      font-size: 16px;
      width: 50%;
      height: 59px;
      line-height: 59px;
      text-align: center;
      float: left;
    }
    position: absolute;
    bottom:0;
    left: 0;
    right:0;
    height: 60px;
    border-top: 1px solid #f0f0f0;
  }
  .address-group-body{
    color: #788A96;
    font-size: 16px;
    &.is-choose{
      .link-line{
        &.active:before{
          content: '';
          position: absolute;
          width: 17px;
          height: 17px;
          right:15px;
          top:0;
          bottom:0;
          margin: auto;
          background: url('../../../assets/img/group-choose.png');
        }
        &:after{
          display: none;
        }
      }
    }
    .add-line{
      height: 61px;
      line-height: 60px;
      border-bottom: 1px solid #f0f0f0;
      margin-left: 15px;
      padding-left: 31px;
      background: url('../../../assets/img/group-add.png') no-repeat 0 center;
    }
  }
</style>
<script>
  export default {
    props: ['choose'],
    data () {
      return {
        group: null,
        groupList: [
          {
            name: '默认分组'
          },
          {
            name: '朋友'
          },
          {
            name: '员工'
          },
          {
            name: '客户'
          },
          {
            name: '其他'
          }
        ],
        memberList: [
          {
            name: '萧施予',
            nick: '简简单单'
          },
          {
            name: '萧施予',
            nick: '简简单单'
          }
        ],
        icon: '',

      }
    },
    mounted () {
      if (!this.choose) this.icon = 'member-add.png'
    },
    methods: {
      editGroup () {
        this.$router.push({path: this.$route.path + '/group'})
      },
      addGroup (item) {
        this.group = item
        if (this.choose) {
          this.$router.go(-1)
        } else this.$router.push({path: this.$route.path + '/detail'})
      },
      addMember () {
        if (!this.choose) this.$router.push({path: this.$route.path + '/import'})
      }
    },
    components: {}
  }
</script>
