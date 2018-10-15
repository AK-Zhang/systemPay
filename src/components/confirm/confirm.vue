<template>
    <div v-if="value">
      <div class="confirm-box">
        <p>{{msg}}</p>
        <div class="user-no-select" @click="confirm">确定</div>
        <div class="user-no-select" @click="cansel">取消</div>
      </div>
      <div class="mask"></div>
    </div>
</template>
<style lang="less" scoped>
  .confirm-box{
    >div:nth-child(3){
      right: 0;
      border-left:1px solid #f0f0f0;
    }
    >div:nth-child(2){
      left:0;
    }
    >div{
      height:49px;
      line-height: 48px;
      width: 50%;
      position: absolute;
      bottom: 0;
      text-align: center;
      cursor: pointer;
      border-top:1px solid #f0f0f0;
    }
    >p{
      line-height: 23px;
      margin-top: 64px;
      text-align: center;
      padding: 0 15px;
    }
    color: #788A96;
    font-size: 16px;
    background: #fff;
    border-radius: 10px;
    height: 200px;
    position: absolute;
    top: 0;
    bottom:0;
    left:15px;
    right:15px;
    z-index: 10;
    margin: auto;
  }
</style>
<script>
  export default {
    props: [
      'value',
      'confrimFun',
      'canselFun',
      'msg'
    ],
    data () {
      return {}
    },
    mounted () {
    },
    methods: {
      confirm () {
        this.confirmFun && this.confirmFun()
        this.$emit('input', false)
      },
      cansel () {
        this.canselFun && this.canselFun()
        this.$emit('input', false)
      }
    },
    components: {}
  }
</script>
