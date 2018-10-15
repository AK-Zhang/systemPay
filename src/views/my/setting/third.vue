<template>
    <div>
      <head-bar title="第三方账号"></head-bar>
      <div class="about-third-body">
        <div class="show-line">
          <span>微信绑定</span>
          <div class="switch-toggle label" :class="{active: !weixin}" @click="toggleBind(0)">
            <div class="toggle-handle"></div>
          </div>
          <span v-if="weixin">{{weixin.name}}</span>
        </div>
        <div class="show-line">
          <span>QQ绑定</span>
          <div class="switch-toggle label" :class="{active: !qq}" @click="toggleBind(1)">
            <div class="toggle-handle"></div>
          </div>
          <span v-if="qq">{{qq.name}}</span>
        </div>
        <div class="show-line">
          <span>微博绑定</span>
          <div class="switch-toggle label" :class="{active: !weibo}" @click="toggleBind(2)">
            <div class="toggle-handle"></div>
          </div>
          <span v-if="weibo">{{weibo.name}}</span>
        </div>
      </div>
    </div>
</template>
<style lang="less" scoped>
  .about-third-body{
    >span:nth-child(3){
      float: right;
      font-size: 14px;
      color: #9DAEB9;
    }
    >div>div{
      float: right;
      margin: 15px 0 0 10px;
    }
  }
</style>
<script>
  export default {
    data () {
      return {
        weixin: {name: '好象君'},
        qq: null,
        weibo: null
      }
    },
    mounted () {
    },
    methods: {
      toggleBind (type) {
        if (type == 0) {
          if (this.weixin) {
            this.weixin = null
          } else {
            this.weixin = {name: '好象君'}
          }
        } else if (type == 1) {
          if (this.qq) {
            this.qq = null
          } else {
            this.qq = {name: '好象君'}
          }
        } else if (type == 2) {
          if (this.weibo) {
            this.weibo = null
          } else {
            this.weibo = {name: '好象君'}
          }
        }
      }
    },
    components: {}
  }
</script>
