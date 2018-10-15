<template>
    <div>
      <head-bar title="消息提示"></head-bar>
      <div class="msg-body">
        <img src="../../../assets/img/female-icon.png">
        <p>
          <img src="../../../assets/img/female.png">
          <span>诗和远方</span>
        </p>
        <p>对方将您添加到通讯录</p>
      </div>
    </div>
</template>
<style lang="less" scoped>
  .msg-body{
    text-align: center;
    font-size: 14px;
    >img{
      width: 60px;
      height: 60px;
      margin: 113px 0 5px;
    }
    >p:last-child{
      color: #788A96;
      margin: 16px 0;
    }
    >p{
      line-height: 20px;
    }
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
