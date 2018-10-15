<template>
  <div class="gray-body">
    <head-bar title="意见反馈" rt="确定" :rtFn="saveIntro"></head-bar>
    <div class="intro-box">
      <textarea v-model="suggestContent"  rows="5" placeholder="请输入您的建议和意见~"></textarea>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .intro-box{
    textarea{
      width: 100%;
      font-size: 14px;
      resize: none;
      height: 100px;
    }
    line-height: 20px;
    background: #fff;
    padding: 15px;
    margin-top: 10px;
  }
</style>
<script>
  export default {
    data () {
      return {
        suggestContent: null
      }
    },
    mounted () {
    },
    methods: {
      saveIntro () {
        this.$router.go(-1)
      }
    },
    components: {}
  }
</script>
