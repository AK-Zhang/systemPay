<template>
    <div class="process-box">
      <div>
        <span class="process-ball active"></span>
        <span class="process-line active"></span>
        <span class="process-line" :class="{active:process>=2}"></span>
        <span class="process-ball" :class="{active:process>=2}"></span>
        <span class="process-line" :class="{active:process>=2}"></span>
        <span class="process-line" :class="{active:process>=3}"></span>
        <span class="process-ball" :class="{active:process>=3}"></span>
      </div>
    </div>
</template>
<style lang="less" scoped>
  .process-box{
    height:28px;
    margin-top: 31px;
    >div{
      height: 28px;
      width:128px;
      margin: 0 auto;
      position: relative;
      span{
        position: absolute;
        &:first-child{
          left:0;
          z-index: 7;
        }
        &:nth-child(2){
          left:16px;
          z-index: 6;
        }
        &:nth-child(3){
          left:36px;
          z-index: 6;
        }
        &:nth-child(4){
          left:56px;
          z-index: 7;
        }
        &:nth-child(5){
          left:72px;
          z-index: 6;
        }
        &:nth-child(6){
          left:92px;
          z-index: 6;
        }
        &:nth-child(7){
          left:112px;
          z-index: 7;
        }
      }
      .process-ball{
        width:16px;
        height:16px;
        border-radius: 50%;
        margin-top: 6px;
        background-color: #FFE5C9;
        &.active{
          box-shadow: 0 0 0 6px #FFF1E1;
          background-color: #FE9D32;
        }
      }
      .process-line{
        width: 20px;
        height: 2px;
        background-color: #FFF6EB;
        margin-top: 13px;
        &.active{
          background-color: #FFA746;
        }
      }
    }
  }
</style>
<script>
  export default {
    props: ['process'],
    data () {
      return {}
    },
    mounted () {
    },
    methods: {},
    components: {}
  }
</script>
