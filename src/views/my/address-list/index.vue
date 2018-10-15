<template>
    <div>
      <head-bar title="联系人" :icon="icon" :rt="choose?'确定':''" :rtFn="modGroup"></head-bar>
      <div class="address-list-body"  :class="{'is-choose':choose}">
        <search :top="'44px'" style="position: static"></search>
        <scroller :height="'-88px'">
          <div class="address-list-box" v-for="item in list">
            <div class="address-list-title" @click="toggleS">
              <span></span>
              <p>{{item.name}}</p>
            </div>
            <div class="address-list-content">
              <div class="address-list-box" v-for="item1 in item.children">
                <div class="address-list-title" @click="toggleS">
                  <span></span>
                  <p>{{item1.name}}</p>
                </div>
                <div class="address-list-content">
                  <div class="clearM address-list-line" v-for="member1 in item1.memberList" @click="showDetail">
                    <span class="active"></span>
                    <img src="../../../assets/img/female-icon.png">
                    <div>
                      <p>{{member1.nick}}</p>
                      <p>{{member1.name}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="clearM address-list-line" v-for="member in item.memberList" @click="showDetail">
                <img src="../../../assets/img/female-icon.png">
                <div>
                  <p>{{member.nick}}</p>
                  <p>{{member.name}}</p>
                </div>
              </div>
            </div>
          </div>
        </scroller>
      </div>
      <transition name="slide">
        <router-view :detail="detail" v-dom-portal class="router-container"></router-view>
      </transition>
    </div>
</template>
<style lang="less" scoped>
  @import "../../../assets/css/common";
  .is-choose{
    .address-list-line,.address-list-title{
      position: relative;
      padding-left: 30px;
      >span{
        display: block;
      }
    }
  }
  .address-list-line,.address-list-title{
    >span{
      display: none;
      position: absolute;
      width: 15px;
      height: 15px;
      top:0;
      bottom:0;
      left:0;
      margin: auto;
      background: #FCAD57;
      border-radius: 3px;
      &.active{
        background:#FCAD57 url('../../../assets/img/check-white.png') no-repeat center ;
        background-size: 9px 6px;
      }
    }
  }
  .address-list-box{
    .address-list-content{
      display: none;
      >.address-list-line{
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
        padding-right: 15px;
        /*margin-left: 15px;*/
        border-bottom: 1px solid #f0f0f0;
      }
      padding-left: 15px;
    }
    .address-list-title{
      .common-line;
      padding-right: 35px;
      &.active{
        &:after{
          .transform(rotate(225deg));
        }
      }
      &:after{
        content: '';
        position: absolute;
        top:0;
        bottom:0;
        right: 15px;
        .border-arrow;
        margin: auto;
        .transform-origin(4.5px);
        .transform(rotate(45deg));
        .transition-3s;
      }
    }
  }
</style>
<script>
  import { Search } from 'vux'
  export default {
    props: ['choose'],
    data () {
      return {
        icon: '',
        detail: null,
        list: [
          {
            name: '默认分组',
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
            children: [
              {
                name: '朋友',
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
              },
              {
                name: '员工',
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
              }
            ]
          },
          {
            name: '公司',
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
            children: [
              {
                name: '朋友',
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
              },
              {
                name: '员工',
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
              }
            ]
          }
        ]
      }
    },
    mounted () {
      if (!this.choose) this.icon = 'contact-set.png'
    },
    methods: {
      showDetail (v) {
        if (this.choose) return
        this.detail = v
        this.$router.push({path: this.$route.path + '/detail'})
      },
      toggleS (e) {
        let tar = $(e.target).hasClass('address-list-title') ? $(e.target) : $(e.target).parent()
        if (tar.hasClass('active')) {
          tar.removeClass('active')
          tar.next().slideUp()
        } else {
          tar.addClass('active')
          tar.next().slideDown()
        }
      },
      modGroup () {
        if (this.choose) this.$router.go(-1)
        else this.$router.push({path: this.$route.path + '/group'})
      }
    },
    components: {
      Search
    }
  }
</script>
